import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardMain from "./components/DashboardMain";
import ScorePredictionForm from "./components/ScorePredictionForm";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [predictedScore, setPredictedScore] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={darkMode ? "dark-mode" : "light-mode"}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />

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

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
