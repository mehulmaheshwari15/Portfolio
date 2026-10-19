import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import ResumeDropdown from "./ResumeDropdown";
import "./Home.css";

const roles = [
  "Aspiring AI Engineer",
  "Full-Stack Developer",
  "Computer Science Student",
  "Aspiring Cybersecurity Professional",
];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(roles[roleIndex]);
      const timer = setTimeout(() => {
        setRoleIndex((previous) => (previous + 1) % roles.length);
      }, 3000);
      return () => clearTimeout(timer);
    }

    const currentRole = roles[roleIndex];
    let delay = deleting ? 35 : 75;

    if (!deleting && displayedText === currentRole) {
      delay = 1400;
    } else if (deleting && displayedText === "") {
      delay = 350;
    }

    const timer = setTimeout(() => {
      if (!deleting && displayedText === currentRole) {
        setDeleting(true);
      } else if (deleting && displayedText === "") {
        setDeleting(false);
        setRoleIndex((previous) => (previous + 1) % roles.length);
      } else if (deleting) {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      } else {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayedText, deleting, roleIndex, shouldReduceMotion]);

  return (
    <section id="home" className="home-section">
      <div className="home-container">
        <motion.div
          className="home-content"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          <motion.p
            className="home-eyebrow"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 },
              },
            }}
          >
            COMPUTER SCIENCE ENGINEERING
          </motion.p>

          <motion.h1
            className="home-name"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7 },
              },
            }}
          >
            Mehul <span>Maheshwari.</span>
          </motion.h1>

          <motion.div
            className="home-role"
            aria-label={roles[roleIndex]}
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 },
              },
            }}
          >
            <span className="home-role-prefix">I'm an </span>
            <span aria-hidden="true">
              {displayedText}
              <span className="home-cursor">|</span>
            </span>
          </motion.div>

          <motion.h2
            className="home-headline"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 },
              },
            }}
          >
            Driven by curiosity.
            <br />
            <span>Motivated to make a difference.</span>
          </motion.h2>

          <motion.p
            className="home-description"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 },
              },
            }}
          >
            Exploring new ideas, developing my technical skills, and building
            practical projects as I grow into an engineer.
          </motion.p>

          <motion.div
            className="home-actions"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 },
              },
            }}
          >
            <ResumeDropdown variant="hero" />

            <a className="home-button home-button-secondary" href="#projects">
              View My Work
              <span aria-hidden="true">↗</span>
            </a>
          </motion.div>

          <motion.div
            className="home-bottom-note"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.8 },
              },
            }}
          >
            <span className="home-note-line" />
            <span>LEARN · BUILD · GROW</span>
            <span className="home-note-line" />
          </motion.div>
        </motion.div>
      </div>

      <a className="home-scroll-indicator" href="#about">
        <span>SCROLL TO EXPLORE</span>
        <span className="home-scroll-line" />
      </a>
    </section>
  );
}
