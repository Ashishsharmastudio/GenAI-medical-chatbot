import { Router } from "express";
import path from "path";
import multer from "multer";

import auth from "../middleware/auth.js";
import { status, listFiles, deleteFile } from "../controllers/adminController.js";
import { buildIndex } from "../services/ragService.js";

const router = Router();

// Resolve the data directory relative to this file
const DATA_DIR = path.join(
  path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")),
  "../data"
);

// ── Multer storage ──────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, DATA_DIR),
  filename: (_req, file, cb) => cb(null, file.originalname),
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB per file
});

// ── Routes ──────────────────────────────────────────────────────────────────

// GET /api/admin/status
router.get("/status", auth, status);

// GET /api/admin/list-files  — list all PDFs currently in the data folder
router.get("/list-files", auth, listFiles);

// DELETE /api/admin/delete-file/:filename — remove a specific PDF
router.delete("/delete-file/:filename", auth, deleteFile);

// POST /api/admin/upload-pdf — upload one or more PDFs and rebuild the index
router.post(
  "/upload-pdf",
  auth,
  upload.array("pdf", 20), // up to 20 files per request
  async (req, res, next) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No PDF files received" });
      }

      // Rebuild the vector index with all current PDFs
      await buildIndex(DATA_DIR);

      res.json({
        success: true,
        files: req.files.map((f) => ({
          name: f.filename,
          size: f.size,
        })),
        message: `${req.files.length} file(s) uploaded and index rebuilt.`,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
