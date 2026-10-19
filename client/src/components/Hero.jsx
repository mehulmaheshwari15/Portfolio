import { motion } from "framer-motion";
import { ArrowDown, ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import PortraitPlaceholder from "./PortraitPlaceholder";

const roles = [
  "Aspiring AI Engineer",
  "Full-Stack Developer",
  "Computer Science Student",
  "Aspiring Cybersecurity Professional"
];

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let delay = deleting ? 38 : 75;

    if (!deleting && text === currentRole) delay = 1500;
    if (deleting && text === "") {
      setDeleting(false);
      setRoleIndex((index) => (index + 1) % roles.length);
      return;
    }

    const timer = window.setTimeout(() => {
      if (!deleting && text === currentRole) {
        setDeleting(true);
      } else {
        setText(currentRole.substring(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [text, deleting, roleIndex]);

  return (
    <span className="typewriter" aria-label={roles[roleIndex]}>
      <span aria-hidden="true">{text}</span><span className="typewriter-caret" aria-hidden="true" />
    </span>
  );
}

export default function Hero() {
  return (
    <>
      <section className="hero page-container" id="home">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="eyebrow">HELLO, I'M</p>
          <h1>Mehul<br />Maheshwari<span className="gold-period">.</span></h1>
          <p className="designation">Computer Science Engineering Student</p>

          <div className="role-block">
            <p className="role-current"><TypewriterRole /></p>
            <p className="role-list">
              <span>AI Engineer</span><i />
              <span>Full-Stack Developer</span><i />
              <span>Cybersecurity</span>
            </p>
          </div>

          <h2 className="hero-headline">Driven by curiosity. Motivated to make a difference.</h2>
          <p className="hero-description">
            Exploring new ideas, developing my technical skills, and building
            practical projects as I grow into an engineer.
          </p>

          <div className="hero-buttons">
            <a className="button button-primary" href={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/resume/pdf`}>
              Download Resume <ArrowDownToLine size={17} />
            </a>
            <a className="button button-outline" href="#projects">
              View My Work <ArrowUpRight size={17} />
            </a>
          </div>
        </motion.div>

        <PortraitPlaceholder />

        <a className="scroll-cue" href="#about">
          <span className="scroll-line" />
          <span className="scroll-circle"><ArrowDown size={17} /></span>
          <span className="scroll-line" />
          <span className="scroll-label">SCROLL TO EXPLORE</span>
        </a>
      </section>

      <section className="next-section" id="about">
        <div className="page-container next-section-inner">
          <p className="eyebrow">ABOUT ME <span className="eyebrow-line" /></p>
          <h2>More about my journey.</h2>
          <p>This section will be developed in the next stage.</p>
        </div>
      </section>

      <div className="section-anchor" id="projects" aria-hidden="true" />
      <div className="section-anchor" id="contact" aria-hidden="true" />
    </>
  );
}