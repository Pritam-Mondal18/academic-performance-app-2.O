import React from "react";
import Sidebar from "./components/Sidebar";
import DashboardMain from "./components/DashboardMain";

function App() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <DashboardMain />
    </div>
  );
}

export default App;
