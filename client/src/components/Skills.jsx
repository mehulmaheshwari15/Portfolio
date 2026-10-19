import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./Skills.css";

const skillGroups = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend",
    subtitle: "Interfaces & user experience",
    skills: [
      {
        name: "React.js",
        level: "Comfortable",
        description: "Building reusable components and interactive interfaces.",
      },
      {
        name: "Next.js",
        level: "Practicing",
        description: "Building web applications with React and Next.js.",
      },
      {
        name: "JavaScript",
        level: "Comfortable",
        description: "Working with application logic and browser interactions.",
      },
    ],
    additional: ["TypeScript", "HTML", "CSS", "Redux Toolkit"],
  },
  {
    id: "backend",
    number: "02",
    title: "Backend",
    subtitle: "Logic, servers & APIs",
    skills: [
      {
        name: "Python",
        level: "Comfortable",
        description: "Writing scripts, application logic, and backend code.",
      },
      {
        name: "Node.js",
        level: "Practicing",
        description: "Running JavaScript on the server.",
      },
      {
        name: "Express.js",
        level: "Practicing",
        description: "Building server routes and REST APIs.",
      },
    ],
    additional: [
      "REST APIs",
      "Microservices",
      "C++",
      "MongoDB",
      "MySQL",
      "Redis",
      "Firebase",
    ],
  },
  {
    id: "tools",
    number: "03",
    title: "Tools & Technologies",
    subtitle: "AI frameworks & cloud",
    skills: [
      {
        name: "LangChain",
        level: "Practicing",
        description: "Building applications with language models.",
      },
      {
        name: "LangGraph",
        level: "Practicing",
        description: "Creating workflows with connected AI agents.",
      },
      {
        name: "AWS",
        level: "Practicing",
        description: "Working with cloud services such as EC2 and S3.",
      },
    ],
    additional: [
      "EC2",
      "S3",
      "Boto3",
      "CloudWatch",
      "Amazon SNS",
      "Docker",
      "Git",
      "GitHub",
      "Pandas",
      "QGIS",
      "Google Earth Engine",
    ],
  },
];

function SkillCircle({ skill, index, reduceMotion }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const radius = 31;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      className="skill-item"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        delay: reduceMotion ? 0 : index * 0.12,
      }}
    >
      <button
        type="button"
        className="skill-circle-button"
        aria-label={`${skill.name}: ${skill.level}. ${skill.description}`}
        aria-expanded={showTooltip}
        onClick={() => setShowTooltip((visible) => !visible)}
        onBlur={() => setShowTooltip(false)}
      >
        <svg
          className="skill-circle"
          viewBox="0 0 76 76"
          aria-hidden="true"
        >
          <circle
            className="skill-circle-track"
            cx="38"
            cy="38"
            r={radius}
            fill="none"
            strokeWidth="1.5"
          />

          <motion.circle
            className="skill-circle-progress"
            cx="38"
            cy="38"
            r={radius}
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{
              strokeDashoffset: circumference,
              rotate: -90,
            }}
            whileInView={{
              strokeDashoffset: 0,
              rotate: -90,
            }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 1.1,
              delay: reduceMotion ? 0 : index * 0.12,
              ease: "easeOut",
            }}
          />

          <circle
            className="skill-circle-center"
            cx="38"
            cy="38"
            r="3"
          />
        </svg>

        <span className="skill-circle-name">{skill.name}</span>
      </button>

      <div
        className={`skill-tooltip ${showTooltip ? "is-visible" : ""}`}
        role="tooltip"
      >
        <strong>{skill.name}</strong>
        <span className="skill-tooltip-level">{skill.level}</span>
        <span>{skill.description}</span>
      </div>
    </motion.div>
  );
}

function SkillGroup({ group, reduceMotion }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      className="skill-group"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.55 }}
    >
      <div className="skill-group-heading">
        <span className="skill-group-number">{group.number}</span>

        <div>
          <h3>{group.title}</h3>
          <p>{group.subtitle}</p>
        </div>
      </div>

      <div className="skill-circles">
        {group.skills.map((skill, index) => (
          <SkillCircle
            key={skill.name}
            skill={skill}
            index={index}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>

      <div className="skill-group-footer">
        <button
          type="button"
          className={`skill-more-button ${
            isExpanded ? "is-expanded" : ""
          }`}
          aria-expanded={isExpanded}
          aria-controls={`extra-skills-${group.id}`}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          <span className="skill-more-ring" aria-hidden="true">
            <span className="skill-more-plus">
              {isExpanded ? "−" : "+"}
            </span>
          </span>

          <span className="skill-more-label">
            {isExpanded ? "Show less" : "Explore more"}
          </span>

          <span className="skill-more-arrow" aria-hidden="true">
            ↗
          </span>
        </button>
      </div>

      <motion.div
        id={`extra-skills-${group.id}`}
        className="additional-skills"
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.35,
          ease: "easeInOut",
        }}
        aria-hidden={!isExpanded}
        inert={!isExpanded ? "" : undefined}
      >
        <div className="additional-skills-inner">
          {group.additional.map((skill, index) => (
            <motion.span
              key={skill}
              className="additional-skill"
              initial={false}
              animate={{
                opacity: isExpanded ? 1 : 0,
                y: isExpanded ? 0 : 8,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.22,
                delay: reduceMotion ? 0 : isExpanded ? index * 0.035 : 0,
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <motion.div
          className="skills-intro"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.55 }}
        >
          <span className="skills-eyebrow">WHAT I WORK WITH</span>

          <h2>
            Skills & <span>Technologies</span>
          </h2>

          <p>
            Tools and technologies I use to build, experiment, and keep learning.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <SkillGroup
              key={group.id}
              group={group}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <p className="skills-hint">
          Select a skill to explore its description and proficiency level.
        </p>
      </div>
    </section>
  );
}
