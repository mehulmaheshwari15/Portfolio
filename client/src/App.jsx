import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import EducationExperience from "./components/EducationExperience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <div className="portfolio-shell">
      {/* Existing navigation header */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        {/* Sections ordered: Home -> About -> Education & Experience -> Skills -> Projects */}
        <Home />
        <About />
        <EducationExperience />
        <Skills />
        <Projects />
        <ContactForm />
      </main>
    </div>
  );
}