import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardMain from "./components/DashboardMain";
import ScorePredictionForm from "./components/ScorePredictionForm";

function App() {
  const [predictedScore, setPredictedScore] = useState(0);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#181c2c" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "2rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <DashboardMain score={predictedScore} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ScorePredictionForm onPrediction={setPredictedScore} />
        </div>
      </main>
    </div>
  );
}

export default App;
