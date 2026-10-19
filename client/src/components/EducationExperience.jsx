import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Certifications from "./Certifications";
import "./EducationExperience.css";

const timelineItems = [
  {
    id: 1,
    type: "EDUCATION",
    period: "2024 — 2028",
    title: "B.Tech in Computer Science & Engineering",
    organization: "JK Lakshmipat University",
    location: "Jaipur, India",
    subtitle: "Cyber Security Specialization",
    description:
      "Currently pursuing Computer Science and Engineering, building a foundation in software development, computing fundamentals, and cybersecurity.",
    details: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Object-Oriented Programming",
      "Machine Learning Fundamentals",
    ],
    icon: "education",
  },
  {
    id: 2,
    type: "INTERNSHIP EXPERIENCE",
    period: "2026 · 45 DAYS",
    title: "Remote Sensing & GIS Intern",
    organization: "Indian Space Academy (ISA)",
    location: "Practice School-I",
    subtitle: "Environmental Monitoring Project",
    description:
      "Completed a 45-day internship involving remote sensing, GIS, and environmental monitoring under external and faculty supervision.",
    details: [
      "Mapped drought severity in Barmer, Rajasthan, using MODIS NDVI and Google Earth Engine (2015–2023).",
      "Analyzed Delhi's urban heat islands using Landsat-8, NDVI, NDBI, and land surface temperature.",
      "Developed satellite-data workflows from raw imagery to classified thematic maps.",
    ],
    tools: [
      "Python",
      "Google Earth Engine",
      "QGIS",
      "MODIS NDVI",
      "Landsat-8",
    ],
    results: [
      "Barmer mean VCI (2023): 0.339",
      "Delhi mean land surface temperature: 34.13°C",
    ],
    icon: "experience",
  },
];

function TimelineIcon({ type }) {
  if (type === "education") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="23"
        height="23"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m2 10 10-6 10 6-10 6-10-6Z" />
        <path d="M6 12.5V17c3.5 2.7 8.5 2.7 12 0v-4.5" />
        <path d="M22 10v6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="23"
      height="23"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
    </svg>
  );
}

function TimelineCard({ item, reduceMotion }) {
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => setFlipped((current) => !current);

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggleFlip();
    }
  };

  return (
    <motion.div
      className="ee-card-wrapper"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.55 }}
    >
      <div className="ee-timeline-marker" aria-hidden="true">
        <span>{String(item.id).padStart(2, "0")}</span>
      </div>

      <div className="ee-card-container">
        <button
          type="button"
          className={`ee-flip-card ${flipped ? "is-flipped" : ""}`}
          onClick={toggleFlip}
          onKeyDown={handleKeyDown}
          aria-expanded={flipped}
          aria-label={`${flipped ? "Show front of" : "Show details for"} ${item.title}`}
        >
          <span className="ee-card-inner">
            <span className="ee-card-face ee-card-front">
              <span className="ee-card-topline">
                <span className="ee-card-icon">
                  <TimelineIcon type={item.icon} />
                </span>
                <span className="ee-card-type">{item.type}</span>
              </span>

              <span className="ee-card-period">{item.period}</span>

              <span className="ee-card-title">{item.title}</span>

              <span className="ee-card-organization">
                {item.organization}
              </span>

              <span className="ee-card-subtitle">{item.subtitle}</span>

              <span className="ee-card-location">{item.location}</span>

              <span className="ee-card-hint">
                {flipped ? "Click to return" : "Click to explore"} ↗
              </span>
            </span>

            <span className="ee-card-face ee-card-back">
              <span className="ee-back-heading">{item.title}</span>

              <span className="ee-back-description">
                {item.description}
              </span>

              <span className="ee-back-subheading">
                {item.icon === "education"
                  ? "Relevant Coursework"
                  : "Key Contributions"}
              </span>

              <span className="ee-detail-list">
                {item.details.map((detail) => (
                  <span className="ee-detail-item" key={detail}>
                    <span className="ee-detail-dot" />
                    <span>{detail}</span>
                  </span>
                ))}
              </span>

              {item.tools && (
                <>
                  <span className="ee-back-subheading">
                    Tools & Technologies
                  </span>
                  <span className="ee-tag-list">
                    {item.tools.map((tool) => (
                      <span className="ee-tag" key={tool}>
                        {tool}
                      </span>
                    ))}
                  </span>
                </>
              )}

              {item.results && (
                <span className="ee-results">
                  {item.results.map((result) => (
                    <span key={result}>{result}</span>
                  ))}
                </span>
              )}

              <span className="ee-card-hint">↩ Back to overview</span>
            </span>
          </span>
        </button>
      </div>
    </motion.div>
  );
}

export default function EducationExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="ee-section" id="career">
      <div id="education-experience" className="section-anchor" aria-hidden="true" />
      <div className="ee-container">
        <motion.div
          className="ee-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          <span className="ee-eyebrow">EDUCATION & EXPERIENCE</span>
          <h2>Where I've learned and grown.</h2>
          <p>
            My academic journey and practical experience are shaping the
            engineer I aspire to become.
          </p>
        </motion.div>

        <div className="ee-timeline">
          {timelineItems.map((item) => (
            <TimelineCard
              key={item.id}
              item={item}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <Certifications />
      </div>
    </section>
  );
}
