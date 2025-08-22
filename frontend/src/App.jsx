import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardMain from "./components/DashboardMain";
import ScorePredictionForm from "./components/ScorePredictionForm";

function App() {
  const [predictedScore, setPredictedScore] = useState(0);

  // This handler calls the backend via ScorePredictionForm and sets score in app state
  const handlePredict = () => {
    // Your logic here, or lifted from ScorePredictionForm
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <DashboardMain
        score={predictedScore}
        onPredict={handlePredict} // Wire button to start prediction
      />
      <ScorePredictionForm
        onPrediction={(score) => setPredictedScore(score)} // Pass score from form
      />
    </div>
  );
}

export default App;
