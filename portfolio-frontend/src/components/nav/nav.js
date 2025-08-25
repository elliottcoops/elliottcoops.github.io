import { useState } from 'react';
import './nav.css';

export function Nav({ title, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pages = ["Home", "Experience", "Projects"];

  const handleClick = (page) => {
    setCurrentPage(page); // now scrolls to section
    setMenuOpen(false);
  };

  return (
    <nav className="nav">
      <div className="logo">{title}</div>

      <div
        className={`nav-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

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
