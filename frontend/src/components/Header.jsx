import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className={`header ${darkMode ? "dark" : "light"}`}>
      <h1 className="logo">📊 Score Predictor</h1>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <button className="mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  );
};

export default Header;
