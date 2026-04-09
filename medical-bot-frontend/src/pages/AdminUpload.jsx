import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../services/api";

/* ─── helpers ─────────────────────────────────────────────────────────────── */
function fmtSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
function fmtDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/* ─── component ───────────────────────────────────────────────────────────── */
export default function AdminUpload() {
  const [files, setFiles] = useState([]); // existing files on server
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [queue, setQueue] = useState([]); // pending local files to upload
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', msg }
  const [deleting, setDeleting] = useState(null); // filename being deleted
  const inputRef = useRef(null);
  const dragCounter = useRef(0);

  /* ── load file list ─────────────────────────────────────────────────────── */
  const loadFiles = useCallback(async () => {
    setLoadingFiles(true);
    try {
      const res = await api.listFiles();
      setFiles(res.files || []);
    } catch (e) {
      showToast("error", e.message);
    } finally {
      setLoadingFiles(false);
    }
  }, []);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  /* ── toast helper ───────────────────────────────────────────────────────── */
  function showToast(type, msg) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 5000);
  }

  /* ── drag & drop ────────────────────────────────────────────────────────── */
  function handleDragEnter(e) {
    e.preventDefault();
    dragCounter.current += 1;
    setDragging(true);
  }
  function handleDragLeave(e) {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setDragging(false);
  }
  function handleDrop(e) {
    e.preventDefault();
    dragCounter.current = 0;
    setDragging(false);
    addToQueue(Array.from(e.dataTransfer.files));
  }
  function handleFileInput(e) {
    addToQueue(Array.from(e.target.files));
    e.target.value = "";
  }
  function addToQueue(incoming) {
    const pdfs = incoming.filter((f) => f.type === "application/pdf");
    if (!pdfs.length) {
      showToast("error", "Only PDF files are accepted.");
      return;
    }
    setQueue((prev) => [
      ...prev,
      ...pdfs.filter((f) => !prev.find((p) => p.name === f.name)),
    ]);
  }
  function removeFromQueue(name) {
    setQueue((prev) => prev.filter((f) => f.name !== name));
  }

  /* ── upload ─────────────────────────────────────────────────────────────── */
  async function handleUpload() {
    if (!queue.length) return;
    setUploading(true);
    setProgress(0);
    try {
      const res = await api.uploadPdf(queue, setProgress);
      showToast(
        "success",
        res.message || `${queue.length} file(s) uploaded & indexed ✓`
      );
      setQueue([]);
      await loadFiles();
    } catch (e) {
      showToast("error", e.message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  /* ── delete ─────────────────────────────────────────────────────────────── */
  async function handleDelete(filename) {
    if (!window.confirm(`Delete "${filename}" from the knowledge base?`)) return;
    setDeleting(filename);
    try {
      await api.deletePdf(filename);
      showToast("success", `"${filename}" deleted.`);
      await loadFiles();
    } catch (e) {
      showToast("error", e.message);
    } finally {
      setDeleting(null);
    }
  }

  /* ─── render ─────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{`
        /* ── reset / base ───────────────────────────────── */
        .au-root {
          min-height: 100vh;
          background: #0d0f14;
          color: #e2e8f0;
          font-family: 'Inter', system-ui, sans-serif;
          padding: 2rem 1rem;
          box-sizing: border-box;
        }
        .au-card {
          max-width: 780px;
          margin: 0 auto;
          background: #161a23;
          border: 1px solid #1e2535;
          border-radius: 18px;
          padding: 2.5rem 2.5rem 2rem;
          box-shadow: 0 8px 48px rgba(0,0,0,.55);
        }

        /* ── header ─────────────────────────────────────── */
        .au-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .au-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem;
          flex-shrink: 0;
          box-shadow: 0 4px 20px rgba(99,102,241,.4);
        }
        .au-title { font-size: 1.5rem; font-weight: 700; letter-spacing: -.02em; }
        .au-subtitle { font-size: .85rem; color: #64748b; margin-top: .15rem; }

        /* ── drop zone ──────────────────────────────────── */
        .au-drop {
          border: 2px dashed #2a3145;
          border-radius: 14px;
          padding: 2.5rem 1rem;
          text-align: center;
          cursor: pointer;
          transition: border-color .2s, background .2s;
          background: transparent;
        }
        .au-drop.active {
          border-color: #6366f1;
          background: rgba(99,102,241,.07);
        }
        .au-drop-icon { font-size: 2.4rem; margin-bottom: .5rem; }
        .au-drop-main { font-size: 1rem; font-weight: 600; color: #c7d0e0; }
        .au-drop-sub  { font-size: .8rem; color: #64748b; margin-top: .25rem; }
        .au-choose-btn {
          display: inline-block;
          margin-top: 1rem;
          padding: .45rem 1.25rem;
          border-radius: 8px;
          background: rgba(99,102,241,.15);
          border: 1px solid #6366f1;
          color: #818cf8;
          font-size: .85rem;
          font-weight: 600;
          cursor: pointer;
          transition: background .2s;
        }
        .au-choose-btn:hover { background: rgba(99,102,241,.3); }

        /* ── queue list ─────────────────────────────────── */
        .au-queue { margin-top: 1.25rem; display: flex; flex-direction: column; gap: .5rem; }
        .au-queue-item {
          display: flex; align-items: center; gap: .75rem;
          background: #1c2030;
          border: 1px solid #232b3e;
          border-radius: 10px;
          padding: .65rem .9rem;
        }
        .au-queue-name { flex: 1; font-size: .85rem; color: #c7d0e0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .au-queue-size { font-size: .75rem; color: #64748b; white-space: nowrap; }
        .au-q-remove {
          background: none; border: none; cursor: pointer;
          color: #475569; font-size: 1rem; line-height: 1;
          transition: color .15s;
        }
        .au-q-remove:hover { color: #ef4444; }

        /* ── progress bar ───────────────────────────────── */
        .au-progress-wrap { margin-top: 1rem; }
        .au-progress-bar {
          height: 6px; border-radius: 99px;
          background: #1e2535;
          overflow: hidden;
        }
        .au-progress-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg,#6366f1,#8b5cf6);
          transition: width .25s;
        }
        .au-progress-label {
          font-size: .75rem; color: #64748b;
          text-align: right; margin-top: .3rem;
        }

        /* ── upload button ──────────────────────────────── */
        .au-upload-btn {
          margin-top: 1.25rem;
          width: 100%;
          padding: .8rem;
          border: none;
          border-radius: 11px;
          background: linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: opacity .2s, transform .15s;
          box-shadow: 0 4px 20px rgba(99,102,241,.35);
        }
        .au-upload-btn:hover:not(:disabled) { opacity: .9; transform: translateY(-1px); }
        .au-upload-btn:disabled { opacity: .45; cursor: not-allowed; }

        /* ── divider ────────────────────────────────────── */
        .au-divider {
          display: flex; align-items: center; gap: 1rem;
          margin: 2rem 0 1.25rem;
        }
        .au-divider::before, .au-divider::after {
          content: ''; flex: 1; height: 1px; background: #1e2535;
        }
        .au-divider span { font-size: .75rem; color: #475569; white-space: nowrap; }

        /* ── file list ──────────────────────────────────── */
        .au-file-list { display: flex; flex-direction: column; gap: .6rem; }
        .au-file-item {
          display: flex; align-items: center; gap: .9rem;
          background: #1c2030;
          border: 1px solid #232b3e;
          border-radius: 11px;
          padding: .75rem 1rem;
          transition: border-color .15s;
        }
        .au-file-item:hover { border-color: #2d3a52; }
        .au-file-pdf { font-size: 1.4rem; flex-shrink: 0; }
        .au-file-meta { flex: 1; min-width: 0; }
        .au-file-name { font-size: .875rem; font-weight: 600; color: #c7d0e0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .au-file-info { font-size: .75rem; color: #475569; margin-top: .1rem; }
        .au-del-btn {
          background: none; border: none;
          padding: .3rem .55rem; border-radius: 7px;
          color: #475569; cursor: pointer; font-size: .9rem;
          transition: background .15s, color .15s;
          flex-shrink: 0;
        }
        .au-del-btn:hover:not(:disabled) { background: rgba(239,68,68,.12); color: #ef4444; }
        .au-del-btn:disabled { opacity: .4; cursor: not-allowed; }

        /* ── empty / loading states ─────────────────────── */
        .au-empty {
          text-align: center; padding: 2.5rem 0;
          color: #475569; font-size: .875rem;
        }
        .au-empty-icon { font-size: 2.5rem; margin-bottom: .5rem; }
        .au-spinner {
          display: inline-block;
          width: 18px; height: 18px;
          border: 2px solid rgba(99,102,241,.25);
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: au-spin .7s linear infinite;
          vertical-align: middle;
          margin-right: .5rem;
        }
        @keyframes au-spin { to { transform: rotate(360deg); } }

        /* ── toast ──────────────────────────────────────── */
        .au-toast {
          position: fixed; bottom: 1.5rem; right: 1.5rem;
          max-width: 360px;
          padding: .85rem 1.2rem;
          border-radius: 12px;
          font-size: .875rem;
          font-weight: 500;
          box-shadow: 0 8px 32px rgba(0,0,0,.4);
          animation: au-slide-in .25s ease;
          z-index: 9999;
        }
        .au-toast.success { background: #14322a; border: 1px solid #16a34a; color: #4ade80; }
        .au-toast.error   { background: #3b1212; border: 1px solid #dc2626; color: #f87171; }
        @keyframes au-slide-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .au-card { padding: 1.5rem 1rem; }
        }
      `}</style>

      <div className="au-root">
        <div className="au-card">

          {/* Header */}
          <div className="au-header">
            <div className="au-icon-wrap">📄</div>
            <div>
              <div className="au-title">Knowledge Base</div>
              <div className="au-subtitle">Upload PDFs to power the medical AI assistant</div>
            </div>
          </div>

          {/* Drop Zone */}
          <div
            className={`au-drop${dragging ? " active" : ""}`}
            onDragEnter={handleDragEnter}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <div className="au-drop-icon">{dragging ? "📂" : "📥"}</div>
            <div className="au-drop-main">
              {dragging ? "Drop your PDFs here" : "Drag & drop PDFs here"}
            </div>
            <div className="au-drop-sub">Only .pdf files · max 50 MB each</div>
            <span className="au-choose-btn" onClick={(e) => e.stopPropagation()}>
              <label style={{ cursor: "pointer" }} onClick={() => inputRef.current?.click()}>
                Browse files
              </label>
            </span>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            multiple
            style={{ display: "none" }}
            onChange={handleFileInput}
          />

          {/* Upload queue */}
          {queue.length > 0 && (
            <div className="au-queue">
              {queue.map((f) => (
                <div className="au-queue-item" key={f.name}>
                  <span style={{ fontSize: "1.1rem" }}>📄</span>
                  <span className="au-queue-name">{f.name}</span>
                  <span className="au-queue-size">{fmtSize(f.size)}</span>
                  <button
                    className="au-q-remove"
                    onClick={() => removeFromQueue(f.name)}
                    disabled={uploading}
                    title="Remove"
                  >✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Progress */}
          {uploading && (
            <div className="au-progress-wrap">
              <div className="au-progress-bar">
                <div className="au-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="au-progress-label">{progress}% uploaded</div>
            </div>
          )}

          {/* Upload button */}
          <button
            className="au-upload-btn"
            onClick={handleUpload}
            disabled={!queue.length || uploading}
          >
            {uploading
              ? <><span className="au-spinner" />Uploading & indexing…</>
              : queue.length
                ? `Upload ${queue.length} file${queue.length > 1 ? "s" : ""} & rebuild index`
                : "Select files to upload"
            }
          </button>

          {/* Divider */}
          <div className="au-divider">
            <span>📚 Current Knowledge Base ({files.length} file{files.length !== 1 ? "s" : ""})</span>
          </div>

          {/* Existing files list */}
          {loadingFiles ? (
            <div className="au-empty">
              <span className="au-spinner" /> Loading files…
            </div>
          ) : files.length === 0 ? (
            <div className="au-empty">
              <div className="au-empty-icon">🗂️</div>
              <div>No PDFs in the knowledge base yet.</div>
              <div style={{ marginTop: ".25rem", fontSize: ".75rem" }}>
                Upload one above to get started.
              </div>
            </div>
          ) : (
            <div className="au-file-list">
              {files.map((f) => (
                <div className="au-file-item" key={f.name}>
                  <span className="au-file-pdf">📄</span>
                  <div className="au-file-meta">
                    <div className="au-file-name" title={f.name}>{f.name}</div>
                    <div className="au-file-info">
                      {fmtSize(f.size)} · uploaded {fmtDate(f.uploadedAt)}
                    </div>
                  </div>
                  <button
                    className="au-del-btn"
                    onClick={() => handleDelete(f.name)}
                    disabled={deleting === f.name}
                    title="Delete this file"
                  >
                    {deleting === f.name
                      ? <span className="au-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
                      : "🗑️"
                    }
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`au-toast ${toast.type}`}>
          {toast.type === "success" ? "✅ " : "❌ "}{toast.msg}
        </div>
      )}
    </>
  );
}
