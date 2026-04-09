// routes/userRoutes.js — per-user PDF management (available to ALL logged-in users)
import { Router } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";

import auth from "../middleware/auth.js";
import { buildIndex } from "../services/ragService.js";

const router = Router();

// Base data directory (medical-bot-backend/data)
const BASE_DATA_DIR = path.join(
  path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")),
  "../data"
);

// Resolve per-user directory: data/<userId>/
function userDir(userId) {
  return path.join(BASE_DATA_DIR, String(userId));
}

// Ensure user's folder exists
function ensureUserDir(userId) {
  const dir = userDir(userId);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

// ── Multer — destination is determined per-request from auth token ──────────
const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    try {
      const dir = ensureUserDir(req.user.id);
      cb(null, dir);
    } catch (e) {
      cb(e);
    }
  },
  filename: (_req, file, cb) => cb(null, file.originalname),
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"), false);
  },
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB per file
});

// ── GET /api/user/files — list this user's PDFs ─────────────────────────────
router.get("/files", auth, (req, res) => {
  try {
    const dir = userDir(req.user.id);
    if (!fs.existsSync(dir)) return res.json({ files: [] });

    const files = fs
      .readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith(".pdf"))
      .map((name) => {
        const stat = fs.statSync(path.join(dir, name));
        return { name, size: stat.size, uploadedAt: stat.mtime.toISOString() };
      });

    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: "Could not list files", detail: err.message });
  }
});

// ── POST /api/user/upload — upload PDFs + rebuild user-scoped index ──────────
router.post(
  "/upload",
  auth,
  upload.array("pdf", 20),
  async (req, res, next) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No PDF files received" });
      }

      const dir = userDir(req.user.id);
      await buildIndex(dir); // index only this user's folder

      res.json({
        success: true,
        files: req.files.map((f) => ({ name: f.filename, size: f.size })),
        message: `${req.files.length} file(s) uploaded and indexed.`,
      });
    } catch (err) {
      next(err);
    }
  }
);

// ── DELETE /api/user/files/:filename — delete one PDF ────────────────────────
router.delete("/files/:filename", auth, (req, res) => {
  try {
    const safe = path.basename(req.params.filename);
    if (!safe.toLowerCase().endsWith(".pdf")) {
      return res.status(400).json({ error: "Only PDF files can be deleted" });
    }

    const target = path.join(userDir(req.user.id), safe);
    if (!fs.existsSync(target)) {
      return res.status(404).json({ error: "File not found" });
    }

    fs.unlinkSync(target);
    res.json({ success: true, deleted: safe });
  } catch (err) {
    res.status(500).json({ error: "Could not delete file", detail: err.message });
  }
});

// ── DELETE /api/user/cleanup — delete ALL user files on logout ───────────────
router.delete("/cleanup", auth, (req, res) => {
  try {
    const dir = userDir(req.user.id);
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
    res.json({ success: true, message: "User data cleaned up." });
  } catch (err) {
    res.status(500).json({ error: "Cleanup failed", detail: err.message });
  }
});

export default router;
