// import React, { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import DashboardMain from "./components/DashboardMain";
// import ScorePredictionForm from "./components/ScorePredictionForm";

// function App() {
//   const [predictedScore, setPredictedScore] = useState(0);

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: "#181c2c" }}>
//       <Sidebar />
//       <main
//         style={{
//           flex: 1,
//           padding: "2rem 2.5rem",
//           display: "flex",
//           flexDirection: "column",
//           gap: "2rem",
//         }}
//       >
//         <DashboardMain score={predictedScore} />
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <ScorePredictionForm onPrediction={setPredictedScore} />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import DashboardMain from "./components/DashboardMain";
import ScorePredictionForm from "./components/ScorePredictionForm";

function App() {
  const [predictedScore, setPredictedScore] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={darkMode ? "dark-mode" : "light-mode"}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          background: darkMode ? "#1f2233" : "#f5f5f5",
          color: darkMode ? "#fff" : "#222",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <h1 style={{ margin: 0, fontWeight: 800 }}>📊 Score Predictor</h1>
        <nav>
          <ul
            style={{
              display: "flex",
              gap: "2rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            background: darkMode ? "#fff" : "#222",
            color: darkMode ? "#222" : "#fff",
            fontWeight: 600,
          }}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      {/* ROUTES */}
      <main style={{ flex: 1, padding: "2rem" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <DashboardMain score={predictedScore} />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ScorePredictionForm onPrediction={setPredictedScore} />
                </div>
              </>
            }
          />
          <Route
            path="/about"
            element={
              <div>
                <h2>About</h2>
                <p style={{ maxWidth: "700px", lineHeight: 1.6 }}>
                  This Academic Performance Predictor leverages behavioral
                  patterns and lifestyle factors to estimate student exam
                  scores.
                  <br />
                  Built with React (frontend) + FastAPI & ML (backend).
                </p>
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div>
                <h2>Contact</h2>
                <p>
                  Have feedback or questions? Reach out via{" "}
                  <a href="mailto:example@email.com">email</a>.
                </p>
              </div>
            }
          />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          background: darkMode ? "#1f2233" : "#f5f5f5",
          color: darkMode ? "#fff" : "#222",
          padding: "1rem",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        © {new Date().getFullYear()} Score Predictor | Built with ❤️
      </footer>
    </div>
  );
}

export default App;
