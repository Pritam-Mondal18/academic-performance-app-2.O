import React from "react";
import "./Contact.css";

const Contact = ({ darkMode }) => {
  return (
    <div className={`contact-container ${darkMode ? "dark" : "light"}`}>
      <h2 className="contact-title">Contact</h2>
      <p className="contact-text">
        Have feedback or questions? Reach out via{" "}
        <a href="mailto:example@email.com" className="contact-link">
          email
        </a>
        .
      </p>
    </div>
  );
};

export default Contact;
