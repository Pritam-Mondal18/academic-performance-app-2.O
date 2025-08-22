import React from "react";

const DashboardMain = () => {
  return (
    <main className="main">
      <nav>
        <h2>Dashboard</h2>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>

      <div className="card">
        <h1>Academic Performance Predictor</h1>
        <div className="subtitle">
          Modern assistant-style UI to predict exam scores and suggest an
          effective path forward.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1.4rem",
          flexWrap: "wrap",
          marginBottom: "2.5rem",
        }}
      >
        <div className="gauge-card">
          <span className="gauge-label">
            <span className="gauge-value">78</span>
            <span
              style={{ fontSize: "1.2rem", fontWeight: 600, color: "#fff" }}
            >
              {" "}
              /100
            </span>
          </span>
          <div className="gauge-desc">Your Score</div>
        </div>
        <div className="card" style={{ minWidth: 150 }}>
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
        <div className="upload-card card" style={{ minWidth: 210 }}>
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
      <button className="predict-btn">Predict Exam Score</button>
    </main>
  );
};

export default DashboardMain;
