// services/ragService.js
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"; // PDF.js for Node (text extraction)
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"; // model: text-embedding-004 (768-dim)
import { GoogleGenAI } from "@google/genai"; // Gemini text generation

import { getIndex } from "./pineconeService.js";
import { system_prompt } from "../config/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log("[ragService] __dirname:", __dirname);

const CHUNK_SIZE = 500;
const CHUNK_OVERLAP = 50;

// rough safety cap for context size (characters, not tokens)
// keep prompt lean; adjust if you switch models
const CONTEXT_CHAR_BUDGET = 7000;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
console.log("[ragService] Gemini AI initialized");

// -------- helpers --------
function chunkText(text, size = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
  const out = [];
  const step = Math.max(1, size - overlap);
  for (let i = 0; i < text.length; i += step) {
    out.push(text.slice(i, i + size));
  }
  return out;
}

function normalizeId(base, idx) {
  // avoid accidental double spaces in IDs like "Medical_book -1002"
  return `${base.replace(/\s+/g, " ").trim()}-${idx}`;
}

async function extractPdfText(fullPath) {
  const data = new Uint8Array(fs.readFileSync(fullPath));
  const loadingTask = pdfjs.getDocument({ data });
  const pdf = await loadingTask.promise;

  let all = "";
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent(); // pdf.js text API
    const pageText = content.items
      .map((it) => (typeof it.str === "string" ? it.str : ""))
      .join(" ");
    all += pageText + "\n";
  }
  return all.replace(/\r/g, "").trim();
}

// -------- pipeline --------
export async function loadAndChunk(folderPath, userId = null) {
  console.log("[loadAndChunk] Starting. Input folderPath:", folderPath);

  const docs = [];
  const files = fs
    .readdirSync(folderPath)
    .filter((f) => f.toLowerCase().endsWith(".pdf"));

  console.log("[loadAndChunk] PDF files found:", files);
  if (!files.length) {
    console.warn(`[loadAndChunk] No PDFs found in ${folderPath}`);
    return docs;
  }

  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    console.log("[loadAndChunk] Processing:", file, "→", fullPath);

    if (!fs.existsSync(fullPath)) {
      console.warn(`[loadAndChunk] Skipped missing file: ${fullPath}`);
      continue;
    }

    try {
      const text = await extractPdfText(fullPath);
      if (!text) {
        console.warn(
          `[loadAndChunk] No extractable text in "${file}". (Likely scanned/protected — add OCR fallback if needed.)`
        );
        continue;
      }

      console.log(
        `[loadAndChunk] Extracted text length from "${file}": ${text.length}`
      );

      const chunks = chunkText(text);
      const base = path.basename(file, ".pdf");
      chunks.forEach((chunkText, idx) => {
        // prefix chunk ID with userId so different users never collide
        const rawId = normalizeId(base, idx);
        const id = userId ? `u_${userId}_${rawId}` : rawId;
        docs.push({
          id,
          text: chunkText,
          metadata: {
            source: file,
            text: chunkText,
            ...(userId ? { userId: String(userId) } : {}),
          },
        });
        if (idx < 3 || idx === chunks.length - 1) {
          console.log(
            `[loadAndChunk] Created chunk ID: ${id}, length: ${chunkText.length}`
          );
        }
      });
    } catch (err) {
      console.error(`[loadAndChunk] Error parsing "${file}":`, err);
    }
  }

  console.log("[loadAndChunk] Completed. Total docs:", docs.length);
  return docs;
}

export async function buildIndex(dataDir, userId = null) {
  console.log("[buildIndex] Starting with dataDir:", dataDir);
  const folderPath = path.isAbsolute(dataDir)
    ? dataDir
    : path.join(__dirname, dataDir);
  console.log("[buildIndex] Resolved folderPath:", folderPath);

  const docs = await loadAndChunk(folderPath, userId);
  if (!docs.length) {
    console.warn(`[buildIndex] No PDF chunks found in ${folderPath}`);
    return;
  }

  console.log(`[buildIndex] Generating embeddings for ${docs.length} docs...`);

  const embedder = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-embedding-001",
    taskType: "SEMANTIC_SIMILARITY",
  });

  // Batch embed to respect API limits
  const texts = docs.map((d) => d.text);
  const vectors = [];
  const BATCH = 64;
  for (let i = 0; i < texts.length; i += BATCH) {
    const batch = texts.slice(i, i + BATCH);
    const embeds = await embedder.embedDocuments(batch);
    vectors.push(...embeds);
    console.log(
      `[buildIndex] Embedded ${Math.min(i + BATCH, texts.length)}/${
        texts.length
      }`
    );
  }

  const index = await getIndex();
  console.log("[buildIndex] Pinecone index ready.");

  const UPSERT_BATCH = 100;
  for (let i = 0; i < docs.length; i += UPSERT_BATCH) {
    const sliceDocs = docs.slice(i, i + UPSERT_BATCH);
    const sliceVecs = vectors.slice(i, i + UPSERT_BATCH);

    const records = sliceDocs.map((d, j) => ({
      id: d.id,
      values: sliceVecs[j],
      metadata: d.metadata,
    }));

    await index.upsert(records);
    console.log(
      `[buildIndex] Upserted ${Math.min(i + UPSERT_BATCH, docs.length)}/${
        docs.length
      }`
    );
  }

  console.log(`✅ [buildIndex] Indexed ${docs.length} chunks.`);
}

// queryRag — scopes results to the caller's own PDFs when userId is provided
export async function queryRag(question, k = 8, userId = null) {
  console.log("[queryRag] Question:", question, "| userId:", userId);

  const embedder = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-embedding-001",
    taskType: "SEMANTIC_SIMILARITY",
  });

  const qvec = await embedder.embedQuery(question);
  const index = await getIndex();

  // Scope to this user's chunks if they have uploaded any PDFs
  const pineconeFilter = userId
    ? { userId: { $eq: String(userId) } }
    : undefined;

  const { matches = [] } = await index.query({
    vector: qvec,
    topK: k,
    includeMetadata: true,
    includeValues: false,
    filter: pineconeFilter,
  });
  console.log(`[queryRag] Retrieved ${matches.length} matches.`);

  // Build context with a simple character budget to avoid overlong prompts
  let context = "";
  for (const m of matches) {
    const snippet = `Source: ${m.metadata?.source}\n${
      m.metadata?.text ?? ""
    }\n\n`;
    if (context.length + snippet.length > CONTEXT_CHAR_BUDGET) break;
    context += snippet;
  }

  const contents = [system_prompt, `${context}\n\nQuestion: ${question}`];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
  });

  return typeof response.text === "function"
    ? await response.text()
    : response.text;
}
