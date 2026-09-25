import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/navigation.js";

export default function useScrollNavigation() {
  const [activeSection, setActiveSection] = useState("summary");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);

      const sections = NAV_LINKS.map((link) =>
        document.getElementById(link.id),
      );
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id, onNavigate) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onNavigate?.();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { activeSection, showBackToTop, scrollToSection, scrollToTop };
}
