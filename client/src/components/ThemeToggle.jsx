import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <Sun size={17} aria-hidden="true" />
      <span className={`toggle-track ${isDark ? "is-dark" : ""}`}>
        <span className="toggle-thumb" />
      </span>
      <Moon size={15} aria-hidden="true" />
    </button>
  );
}