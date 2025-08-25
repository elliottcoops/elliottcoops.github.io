import { useState } from 'react';
import './nav.css';

export function Nav({ title, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pages = ["Home", "Experience", "Projects"];

  const handleClick = (page) => {
    setCurrentPage(page);    // Update App's state
    setMenuOpen(false);      // Close menu on mobile
  };

  return (
    <nav className="nav">
      <div className="logo">
        {title}
      </div>

      {/* Hamburger button */}
      <div
        className={`nav-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
      <div className={`nav-right ${menuOpen ? "active" : ""}`}>
        {pages.map((page) => (
          <a
            key={page}
            onClick={() => handleClick(page)}
            className={title === page ? "active" : ""}
          >
            {page}
          </a>
        ))}
      </div>
    </nav>
  );
}
