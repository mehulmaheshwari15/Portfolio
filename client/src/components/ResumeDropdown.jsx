import { useEffect, useRef, useState } from "react";
import "./ResumeDropdown.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

const FORMATS = [
  {
    id: "pdf",
    label: "Download PDF",
    ext: ".pdf",
    endpoint: `${API_BASE}/api/resume/pdf`,
    filename: "Resume.pdf",
  },
  {
    id: "docx",
    label: "Download Word (.docx)",
    ext: ".docx",
    endpoint: `${API_BASE}/api/resume/docx`,
    filename: "Resume.docx",
  },
];

export default function ResumeDropdown({ variant = "hero" }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(null); 
  const [error, setError] = useState(null);

  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);


  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusable = [
          ...menuRef.current.querySelectorAll("button:not([disabled])"),
        ];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);


  useEffect(() => {
    if (open && menuRef.current) {
      const first = menuRef.current.querySelector("button:not([disabled])");
      first?.focus();
    }
  }, [open]);


  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(t);
  }, [error]);


  async function handleDownload(format) {
    if (loading) return;
    setError(null);
    setLoading(format.id);
    setOpen(false);
    triggerRef.current?.focus();

    try {
      const response = await fetch(format.endpoint);
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || `Server error ${response.status}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = format.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Could not connect to the server. Please try again later."
          : `Download failed: ${err.message}`
      );
    } finally {
      setLoading(null);
    }
  }

 
  const triggerClass =
    variant === "navbar"
      ? "rdrop-trigger rdrop-trigger--navbar button button-outline button-small"
      : "rdrop-trigger rdrop-trigger--hero home-button home-button-primary";

  return (
    <div
      className={`rdrop-wrap rdrop-wrap--${variant}`}
      ref={containerRef}
    >
    
      <button
        ref={triggerRef}
        type="button"
        className={triggerClass}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="rdrop-menu"
        onClick={() => setOpen((v) => !v)}
        disabled={!!loading}
      >

        <svg
          className="rdrop-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v12m-5-5 5 5 5-5" />
          <path d="M5 16v4h14v-4" />
        </svg>

        {loading ? "Downloading…" : "Resume"}


        <svg
          className={`rdrop-chevron${open ? " rdrop-chevron--up" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

  
      {open && (
        <ul
          id="rdrop-menu"
          ref={menuRef}
          className="rdrop-menu"
          role="menu"
          aria-label="Choose resume format"
        >
          {FORMATS.map((fmt) => (
            <li key={fmt.id} role="none">
              <button
                type="button"
                role="menuitem"
                className="rdrop-item"
                onClick={() => handleDownload(fmt)}
              >
                <span className="rdrop-item-icon" aria-hidden="true">
                  {fmt.id === "pdf" ? (
                 
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="9" y1="13" x2="15" y2="13" />
                      <line x1="9" y1="17" x2="15" y2="17" />
                      <polyline points="9 9 9 9" />
                    </svg>
                  ) : (
              
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M8 13h2l1 4 1-4h2l1 4 1-4h2" />
                    </svg>
                  )}
                </span>
                <span className="rdrop-item-text">
                  <span className="rdrop-item-label">{fmt.label}</span>
                  <span className="rdrop-item-ext">{fmt.ext}</span>
                </span>
           
                <svg
                  className="rdrop-item-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v12m-5-5 5 5 5-5" />
                  <path d="M5 20h14" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}


      {error && (
        <div className="rdrop-error" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
          <button
            type="button"
            className="rdrop-error-close"
            aria-label="Dismiss error"
            onClick={() => setError(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
