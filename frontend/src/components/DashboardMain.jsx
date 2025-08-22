import React from "react";
import GaugeCard from "./GaugeCard";

const DashboardMain = ({ score = 0 }) => {
  return (
    <div>
      <nav
        style={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontWeight: 900, fontSize: "2.2rem", color: "#FFF" }}>
          Dashboard
        </h2>
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li style={{ color: "#d1d5ef", cursor: "pointer" }}>Home</li>
          <li style={{ color: "#d1d5ef", cursor: "pointer" }}>About</li>
          <li style={{ color: "#d1d5ef", cursor: "pointer" }}>Contact</li>
        </ul>
      </nav>

      <div className="card" style={{ marginBottom: "2rem" }}>
        <h1>Academic Performance Predictor</h1>
        <div className="subtitle">
          Modern assistant-style UI to predict exam scores and suggest an
          effective path forward.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
          width: "100%",
          alignItems: "stretch",
          marginBottom: "2rem",
        }}
      >
        <GaugeCard value={score} maxValue={100} />

        <div
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="tag-list">
            <span className="tag">Tag 1</span>
            <span className="tag">Tag 2</span>
            <span className="tag">Tag 3</span>
            <span className="tag">Tag 4</span>
            <span className="tag">Tag 5</span>
            <span className="tag">Tag 6</span>
            <span className="tag">Tag 7</span>
          </div>
        </div>
        <div className="upload-card card">
          <div className="upload-box">
            <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              Drag and drop file here
            </div>
            <div
              style={{
                fontSize: "0.97rem",
                color: "#b3b5c6",
                margin: "0.2rem 0 0.7rem 0",
              }}
            >
              Limit 200MB per file – CSV
            </div>
          </div>
          <button className="upload-btn">Browse files</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
