import { Droplet, Menu, Moon, Sun, X } from "../../Icons.jsx";
import { NAV_LINKS } from "../../data/navigation.js";

export default function DashboardHeader({
  theme,
  onToggleTheme,
  activeSection,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onNavigate,
}) {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <span className="brand-mark">
            <Droplet size={16} strokeWidth={2.5} />
          </span>
          Blood Donation Tracker
        </div>

        <nav className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`nav-link ${activeSection === link.id ? "active" : ""}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="topbar-actions">
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>

          <button
            className="mobile-menu-btn"
            onClick={onToggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`mobile-nav-link ${
              activeSection === link.id ? "active" : ""
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
