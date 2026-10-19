import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import ResumeDropdown from "./ResumeDropdown";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "career", label: "Career" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 130;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="site-header">
      <nav className="navbar page-container" aria-label="Main navigation">
        <a className="brand-mark" href="#home" aria-label="Mehul Maheshwari home">
          <img
            src="/logo-dark.png"
            alt="Mehul Maheshwari"
            className="brand-logo brand-logo-dark"
          />
          <img
            src="/logo-light.png"
            alt="Mehul Maheshwari"
            className="brand-logo brand-logo-light"
          />
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <div className={`nav-content ${menuOpen ? "nav-content-open" : ""}`}>
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                href={`#${item.id}`}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <ResumeDropdown variant="navbar" />
          </div>
        </div>
      </nav>
    </header>
  );
}