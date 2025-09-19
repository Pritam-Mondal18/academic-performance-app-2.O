import React from "react";
import "./About.css";

const About = ({ darkMode }) => {
  return (
    <div className={`about-container ${darkMode ? "dark" : "light"}`}>
      <h2 className="about-title">About</h2>
      <p className="about-text">
        At Edusphere, we believe that every student has the potential to excel —
        all they need is the right guidance. Our Academic Result Predictor is
        designed to help students not only estimate their performance but also
        identify strengths and weaknesses across subjects.
        <br />
        <br />
        Using data-driven insights and smart analysis, Edusphere empowers
        learners to:
        <ul>
          <li>Understand their academic standing in advance.</li>
          <li>Pinpoint areas that need improvement.</li>
          <li>Receive personalized guidance to boost performance.</li>
        </ul>
        Our mission is simple: to make learning smarter, more focused, and
        result-oriented. With Edusphere, students can prepare with confidence,
        improve continuously, and take one step closer to achieving their
        academic goals.
      </p>
    </div>
  );
};

export default About;
