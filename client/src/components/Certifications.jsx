import { useEffect, useState } from "react";
import "./Certifications.css";

const certificates = [
  {
    id: 1,
    title: "Database Management Systems",
    issuer: "Infosys Springboard",
    type: "Database",
    file: "/certificates/infosys-dbms.png",
  },
  {
    id: 2,
    title: "Red Hat System Administration I (RH124 - RHA)",
    issuer: "Red Hat",
    type: "Linux & System Administration",
    file: "/certificates/red-hat-linux.png",
  },
  {
    id: 3,
    title: "Pre Security Path",
    issuer: "TryHackMe",
    type: "Cybersecurity",
    file: "/certificates/tryhackme-pre-security.png",
  },
];

export default function Certifications() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    if (!selectedCertificate) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSelectedCertificate(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCertificate]);

  function isPdf(file) {
    return file.toLowerCase().split("?")[0].endsWith(".pdf");
  }

  return (
    <div className="certifications-section" id="certifications">
      <div className="certifications-container">
        <div className="certifications-heading">
          <span className="certifications-eyebrow">
            CERTIFICATIONS & ACHIEVEMENTS
          </span>

          <h2>
            Learning & <span>Credentials.</span>
          </h2>

          <p>
            A collection of certifications reflecting my learning
            in databases, Linux administration, and cybersecurity.
          </p>
        </div>

        <div className="certifications-grid">
          {certificates.map((certificate) => (
            <button
              className="certificate-card"
              key={certificate.id}
              type="button"
              onClick={() => setSelectedCertificate(certificate)}
              aria-label={`View ${certificate.title} certificate`}
            >
              <div className="certificate-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M12 3 14.8 8.7 21 9.6 16.5 14 17.6 20.2 12 17.2 6.4 20.2 7.5 14 3 9.6 9.2 8.7 12 3Z" />
                </svg>
              </div>

              <span className="certificate-type">{certificate.type}</span>

              <h3>{certificate.title}</h3>

              <p className="certificate-issuer">{certificate.issuer}</p>

              <span className="certificate-view">
                View Certificate <span aria-hidden="true">↗</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedCertificate && (
        <div
          className="certificate-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedCertificate(null);
            }
          }}
        >
          <div
            className="certificate-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedCertificate.title}
          >
            <div className="certificate-modal-header">
              <div>
                <span className="certifications-eyebrow">
                  CERTIFICATE PREVIEW
                </span>
                <h3>{selectedCertificate.title}</h3>
                <p>{selectedCertificate.issuer}</p>
              </div>

              <button
                type="button"
                className="certificate-close"
                onClick={() => setSelectedCertificate(null)}
                aria-label="Close certificate preview"
              >
                ×
              </button>
            </div>

            <div className="certificate-preview">
              {isPdf(selectedCertificate.file) ? (
                <iframe
                  src={selectedCertificate.file}
                  title={selectedCertificate.title}
                  className="certificate-pdf"
                />
              ) : (
                <img
                  src={selectedCertificate.file}
                  alt={`${selectedCertificate.title} certificate`}
                  className="certificate-image"
                />
              )}
            </div>

            <div className="certificate-modal-footer">
              <a
                href={selectedCertificate.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in New Tab ↗
              </a>

              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
