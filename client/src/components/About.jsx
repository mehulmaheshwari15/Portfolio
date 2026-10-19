import { motion, useReducedMotion } from "framer-motion";
import "./About.css";

const baseContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const baseItemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function InfoCard({ icon, label, title, details, description, variants }) {
  return (
    <motion.article className="about-card" variants={variants}>
      <div className="about-card-icon" aria-hidden="true">
        {icon}
      </div>

      <div className="about-card-content">
        <p className="about-card-label">{label}</p>
        <h3>{title}</h3>

        {details && <p className="about-card-details">{details}</p>}

        <p className="about-card-description">{description}</p>
      </div>
    </motion.article>
  );
}

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion
    ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
    : baseContainerVariants;

  const itemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : baseItemVariants;

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div
          className="about-intro"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="about-copy" variants={containerVariants}>
            <motion.h2 variants={itemVariants}>
              A little about my journey.
            </motion.h2>

            <motion.div
              className="about-heading-line"
              variants={itemVariants}
            />

            <motion.p variants={itemVariants}>
              I'm a Computer Science Engineering student interested in
              artificial intelligence, software development, and cybersecurity.
              I enjoy exploring new concepts, learning through practical
              projects, and understanding how technology can address real-world
              problems.
            </motion.p>

            <motion.p variants={itemVariants}>
              My focus is on strengthening my technical foundation, building
              useful solutions, and growing towards a career in AI engineering.
            </motion.p>
          </motion.div>

          <motion.aside
            className="about-motto"
            variants={itemVariants}
            aria-label="Learn, build, grow"
          >
            <span>LEARN</span>
            <span>BUILD</span>
            <span>GROW</span>
            <div className="about-motto-line" />
          </motion.aside>
        </motion.div>

        <motion.div
          className="about-info-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <InfoCard
            variants={itemVariants}
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            }
            label="LOCATION"
            title="India"
            description="Exploring opportunities and building my future, wherever it takes me."
          />

          <InfoCard
            variants={itemVariants}
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="m2 9 10-5 10 5-10 5L2 9Z" />
                <path d="M6 11v5c4 3 8 3 12 0v-5" />
                <path d="M22 9v6" />
              </svg>
            }
            label="CURRENT STATUS"
            title="B.Tech Student"
            details="Third year · Computer Science Engineering"
            description="Building skills, working on projects, and preparing for what's next."
          />
        </motion.div>
      </div>
    </section>
  );
}
