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

      <div
        style={{
          background: "#232642",
          borderRadius: "20px",
          padding: "2rem",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ color: "#FFF" }}>🎓Academic Performance Predictor</h1>
        <div
          className="subtitle"
          style={{ color: "#b3b5c6", fontSize: "1.1rem" }}
        >
          Modern assistant-style UI to predict exam scores and suggest an
          effective path forward.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "2.5rem",
          alignItems: "flex-start",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <GaugeCard value={score} maxValue={100} />

        <div
          className="upload-card card"
          style={{
            background: "#232642",
            borderRadius: "20px",
            padding: "2rem",
            minWidth: "260px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="upload-box">
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
              Drag and drop file here
            </div>
            <div
              style={{
                fontSize: "0.97rem",
                color: "#b3b5c6",
                margin: "0.5rem 0",
              }}
            >
              Limit 200MB per file – CSV
            </div>
          </div>
          <button
            className="upload-btn"
            style={{
              background: "linear-gradient(90deg, #5a69f7 35%, #7c3aed 100%)",
              color: "#fff",
              padding: "0.7rem 2rem",
              border: "none",
              borderRadius: "16px",
              fontWeight: 700,
            }}
          >
            Browse files
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
