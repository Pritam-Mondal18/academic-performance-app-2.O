import React, { useEffect, useState } from "react";
import GaugeCard from "./GaugeCard";
import "./DashboardMain.css";

const DashboardMain = ({ score = 0, darkMode }) => {
  // animated text state
  const fullText =
    "Shaping Modern Kids with Future-Ready Educational Solutions";
  const [typed, setTyped] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = deleting ? 50 : 100;
    const timer = setTimeout(() => {
      if (!deleting && index < fullText.length) {
        setTyped(fullText.slice(0, index + 1));
        setIndex(index + 1);
      } else if (deleting && index > 0) {
        setTyped(fullText.slice(0, index - 1));
        setIndex(index - 1);
      } else if (!deleting && index === fullText.length) {
        // pause before delete
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && index === 0) {
        // start typing again
        setDeleting(false);
      }
    }, typeSpeed);
    return () => clearTimeout(timer);
  }, [index, deleting, fullText]);

  return (
    <div className="dashboard-main">
      {/* Banner */}
      <img src="/student_ban.jpg" alt="Student Banner" className="banner-img" />

      {/* Title Card */}
      <div className={`title-card ${darkMode ? "dark" : "light"}`}>
        <h1>
          🎓 <span className="edu">Academic</span>{" "}
          <span className="sphere">Performance Predictor</span>
        </h1>
        <div className="subtitle">
          <span className="typed">{typed}</span>
        </div>
      </div>

      {/* Gauge + Upload */}
      <div className="content-row">
        <div className="content-item">
          <GaugeCard value={score} maxValue={100} darkMode={darkMode} />
        </div>

        <div
          className={`upload-card content-item ${darkMode ? "dark" : "light"}`}
        >
          <div className="upload-box">
            <div className="upload-title">Drag and drop file here</div>
            <div className="upload-sub">Limit 200MB per file – CSV</div>
          </div>
          <button className="upload-btn">Browse files</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
