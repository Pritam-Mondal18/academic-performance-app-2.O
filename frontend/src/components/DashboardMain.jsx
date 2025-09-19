// import React from "react";
// import GaugeCard from "./GaugeCard";
// import "./DashboardMain.css";

// const DashboardMain = ({ score = 0, darkMode }) => {
//   return (
//     <div className="dashboard-main">
//       {/* Banner */}
//       <img src="/student_ban.jpg" alt="Student Banner" className="banner-img" />

//       {/* Title Card */}
//       <div className={`title-card ${darkMode ? "dark" : "light"}`}>
//         <h1>🎓 Academic Performance Predictor</h1>
//         <div className="subtitle">
//           Modern assistant-style UI to predict exam scores and suggest an
//           effective path forward.
//         </div>
//       </div>

//       {/* Gauge + Upload */}
//       <div className="content-row">
//         <GaugeCard value={score} maxValue={100} darkMode={darkMode} />

//         <div className={`upload-card ${darkMode ? "dark" : "light"}`}>
//           <div className="upload-box">
//             <div className="upload-title">Drag and drop file here</div>
//             <div className="upload-sub">Limit 200MB per file – CSV</div>
//           </div>
//           <button className="upload-btn">Browse files</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardMain;

import React from "react";
import GaugeCard from "./GaugeCard";
import "./DashboardMain.css";

const DashboardMain = ({ score = 0, darkMode }) => {
  return (
    <div className="dashboard-main">
      {/* Banner */}
      <img src="/student_ban.jpg" alt="Student Banner" className="banner-img" />

      {/* Title Card */}
      <div className={`title-card ${darkMode ? "dark" : "light"}`}>
        <h1>🎓 Academic Performance Predictor</h1>
        <div className="subtitle">
          Modern assistant-style UI to predict exam scores and suggest an
          effective path forward.
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
