import React from "react";
import "./Footer.css";

const Footer = ({ darkMode }) => {
  return (
    <footer className={`footer ${darkMode ? "dark" : "light"}`}>
      © {new Date().getFullYear()} Score Predictor | Built with ❤️
    </footer>
  );
};

export default Footer;
