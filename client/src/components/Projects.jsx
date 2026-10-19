import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import "./Projects.css";

const GITHUB_PROFILE = "https://github.com/mehulmaheshwari15";

const projects = [
  {
    id: "foolai",
    number: "01",
    name: "FoolAI",
    category: "AI & WEB",
    shortDescription:
      "An intelligent assistant for conversations and web search.",
    description:
      "FoolAI is a full-stack conversational assistant that blends natural-language chat with real-time web-search capabilities. Users can ask questions in plain language and receive answers enriched by live search results, making it suitable for research, quick lookups, and exploratory conversations. The backend orchestrates multi-step reasoning using LangGraph, a graph-based agent framework, which routes each query through a pipeline of tools — search, summarise, and respond — while maintaining conversation context across turns. The frontend delivers a clean, responsive chat interface built with React, and all conversation history is persisted in MongoDB so sessions can be resumed at any time.",
    technologies: ["React", "Node.js", "LangGraph", "MongoDB"],
    image: "/projects/foolai.png",
    github: GITHUB_PROFILE,
  },
  {
    id: "aws-automation",
    number: "02",
    name: "AWS EC2 Automation",
    category: "CLOUD & AUTOMATION",
    shortDescription:
      "Automating cloud infrastructure tasks with Python and AWS.",
    description:
      "A Python-based cloud automation project that programmatically manages AWS EC2 instances through the Boto3 SDK. Key features include launching, stopping, and terminating instances on demand, querying real-time instance metadata, setting up CloudWatch alarms for CPU and network thresholds, and sending SNS notifications when alarms trigger. The project demonstrates infrastructure-as-code principles by encoding common operational tasks — that would otherwise require manual console interaction — into reusable Python scripts, making it practical for scheduled automation, cost-saving workflows, and basic DevOps learning.",
    technologies: ["Python", "Boto3", "AWS EC2", "CloudWatch"],
    image: "/projects/aws-automation.png",
    github: GITHUB_PROFILE,
  },
  {
    id: "diabetes-prediction",
    number: "03",
    name: "Diabetes Prediction",
    category: "MACHINE LEARNING",
    shortDescription:
      "Exploring diabetes risk prediction with machine learning.",
    description:
      "A supervised machine-learning project that analyses health diagnostic measurements — such as glucose concentration, BMI, blood pressure, and age — to predict the likelihood of diabetes in a patient. The pipeline covers the full data science workflow: exploratory data analysis with Pandas, feature engineering and scaling, class-imbalance handling, and model training and evaluation using Scikit-learn classifiers. Multiple algorithms are compared through cross-validation, and the final model is selected based on accuracy, precision, and recall. The project highlights how structured health data can be used to build interpretable predictive models that support early risk identification.",
    technologies: ["Python", "Pandas", "Scikit-learn"],
    image: "/projects/diabetes-prediction.png",
    github: GITHUB_PROFILE,
  },
  {
    id: "environmental-monitoring",
    number: "04",
    name: "Environmental Monitoring",
    category: "GIS & REMOTE SENSING",
    shortDescription:
      "Studying drought and land surface temperature with satellite data.",
    description:
      "An environmental monitoring study that uses satellite remote-sensing data to analyse vegetation health, drought severity, and land surface temperature across two regions of India: Barmer, Rajasthan and the Delhi NCR. MODIS satellite imagery is processed in Google Earth Engine to compute spectral indices — including NDVI for vegetation cover and LST for surface temperature — which are then visualised and interpreted in QGIS. The project demonstrates how freely available geospatial data and open-source GIS tools can be combined to track environmental changes and support research into climate and land-use impacts.",
    technologies: ["Python", "QGIS", "Google Earth Engine", "MODIS"],
    image: "/projects/gis-monitoring.png",
    github: GITHUB_PROFILE,
  },
];

function ProjectSlide({
  project,
  count,
  direction,
  onOpen,
  onNext,
  onPrev,
  reduceMotion,
}) {
  const imageX = useMotionValue(0);
  const imageY = useMotionValue(0);
  const smoothImageX = useSpring(imageX, {
    stiffness: 150,
    damping: 22,
  });
  const smoothImageY = useSpring(imageY, {
    stiffness: 150,
    damping: 22,
  });

  function handlePointerMove(event) {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    imageX.set(relativeX * 5);
    imageY.set(relativeY * -5);
  }

  function resetPointer() {
    imageX.set(0);
    imageY.set(0);
  }

  const slideVariants = {
    enter: (dir) => ({
      x: reduceMotion ? 0 : dir > 0 ? 120 : dir < 0 ? -120 : 0,
      rotateY: reduceMotion ? 0 : dir > 0 ? -22 : dir < 0 ? 22 : 0,
      scale: reduceMotion ? 1 : 0.9,
      opacity: 0,
    }),
    center: {
      x: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0.01 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      x: reduceMotion ? 0 : dir > 0 ? -120 : 120,
      rotateY: reduceMotion ? 0 : dir > 0 ? 22 : -22,
      scale: reduceMotion ? 1 : 0.9,
      opacity: 0,
      transition: {
        duration: reduceMotion ? 0.01 : 0.38,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.article
      className="project-slide"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      drag={reduceMotion ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(_event, { offset, velocity }) => {
        const swipe = Math.abs(offset.x) * velocity.x;
        if (swipe < -100 || offset.x < -60) {
          onNext();
        } else if (swipe > 100 || offset.x > 60) {
          onPrev();
        }
      }}
    >
      <div className="project-visual-column">
        <motion.button
          type="button"
          className="project-image-button"
          onClick={() => onOpen(project)}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
          aria-label={`View details for ${project.name}`}
          style={{
            rotateX: smoothImageY,
            rotateY: smoothImageX,
          }}
        >
          <div className="project-image-glow" />

          <img
            className="project-image"
            src={project.image}
            alt={`${project.name} project preview`}
            draggable="false"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              if (event.currentTarget.nextElementSibling) {
                event.currentTarget.nextElementSibling.style.display = "grid";
              }
            }}
          />

          <div className="project-image-fallback" aria-hidden="true">
            <span>{project.number}</span>
            <strong>{project.name}</strong>
            <small>PROJECT PREVIEW</small>
          </div>

          <span className="project-image-action">
            <span>Explore project</span>
            <ArrowUpRight size={19} />
          </span>
          <span className="project-image-corner" />
        </motion.button>
      </div>

      <div className="project-copy">
        <span className="project-category">{project.category}</span>
        <span className="project-number">{project.number} / 0{count}</span>

        <h3>{project.name}</h3>
        <p>{project.shortDescription}</p>

        <div className="project-actions">
          <button
            type="button"
            className="project-details-link"
            onClick={() => onOpen(project)}
          >
            Discover more <ArrowUpRight size={17} />
          </button>

          <a
            className="project-github-link"
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            <Github size={17} />
            GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();

      if (event.key === "Tab") {
        const dialog = document.querySelector(".project-modal");
        if (!dialog) return;

        const focusable = dialog.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="project-modal-header">
              <div className="project-modal-header-meta">
                <span className="project-modal-number">{project.number}</span>
                <span className="project-category project-modal-category">
                  {project.category}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                className="project-modal-close"
                onClick={onClose}
                aria-label="Close project details"
              >
                <X size={20} />
              </button>
            </div>

            {/* Title */}
            <div className="project-modal-title-block">
              <h3 id="project-modal-title">{project.name}</h3>
            </div>

            {/* Scrollable body */}
            <div className="project-modal-body">
              <p className="project-modal-description">
                {project.description}
              </p>

              <div className="project-modal-section">
                <h4>Technology stack</h4>
                <div className="project-tech-list">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>

              <a
                className="project-modal-github"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={19} />
                <span>View on GitHub</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const reduceMotion = useReducedMotion();

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setActiveIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return projects.length - 1;
      if (next >= projects.length) return 0;
      return next;
    });
  };

  const goToProject = (targetIndex) => {
    if (targetIndex === activeIndex) return;
    setDirection(targetIndex > activeIndex ? 1 : -1);
    setActiveIndex(targetIndex);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      paginate(-1);
    } else if (event.key === "ArrowRight") {
      paginate(1);
    }
  };

  return (
    <section className="projects-section" id="projects">
      <header className="projects-heading">
        <span className="projects-eyebrow">A FEW THINGS I'VE BUILT</span>
        <h2>
          Selected <span>Projects.</span>
        </h2>
        <p>
          Ideas, experiments, and projects shaped by curiosity.
        </p>
      </header>

      <div className="projects-scroll-track">
        <div className="projects-stage">
          <div className="projects-stage-topline">
            <div className="projects-topline-left">
              <span>SELECTED WORK</span>
              <div
                className="projects-dots"
                role="tablist"
                aria-label="Project selection"
              >
                {projects.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    role="tab"
                    aria-selected={activeIndex === index}
                    className={`projects-dot ${
                      index === activeIndex ? "active" : ""
                    }`}
                    onClick={() => goToProject(index)}
                    aria-label={`Go to project ${index + 1}: ${project.name}`}
                  >
                    <span className="projects-dot-inner" />
                  </button>
                ))}
              </div>
            </div>

            <div className="projects-stage-nav">
              <button
                type="button"
                className="projects-nav-arrow"
                onClick={() => paginate(-1)}
                aria-label="Previous project"
              >
                ←
              </button>
              <span className="projects-counter">
                {String(activeIndex + 1).padStart(2, "0")}{" "}
                <span className="projects-count-divider">/</span>{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                className="projects-nav-arrow"
                onClick={() => paginate(1)}
                aria-label="Next project"
              >
                →
              </button>
            </div>
          </div>

          <div
            className="projects-slides"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="Projects showcase. Use left and right arrow keys or navigation buttons to switch projects."
          >
            <AnimatePresence mode="wait" custom={direction}>
              <ProjectSlide
                key={projects[activeIndex].id}
                project={projects[activeIndex]}
                count={projects.length}
                direction={direction}
                onOpen={setSelectedProject}
                onNext={() => paginate(1)}
                onPrev={() => paginate(-1)}
                reduceMotion={reduceMotion}
              />
            </AnimatePresence>
          </div>

          <div className="projects-stage-bottom">
            <div className="projects-progress-labels">
              <span>{projects[activeIndex]?.name}</span>
              <div className="projects-bottom-nav">
                <button
                  type="button"
                  className="projects-link-nav"
                  onClick={() => paginate(-1)}
                >
                  ← Previous
                </button>
                <span className="projects-link-separator">•</span>
                <button
                  type="button"
                  className="projects-link-nav"
                  onClick={() => paginate(1)}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
