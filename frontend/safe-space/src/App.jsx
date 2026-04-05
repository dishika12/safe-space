import React, { useState } from "react";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DeviceMapPage from "./pages/DeviceMapPage";
import ResourcesPage from "./pages/ResourcesPage";
import HistoryInsightsPage from "./pages/HistoryInsightsPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("login");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage setCurrentPage={setCurrentPage} />;
      case "map":
        return <DeviceMapPage setCurrentPage={setCurrentPage} />;
      case "resources":
        return <ResourcesPage setCurrentPage={setCurrentPage} />;
      case "history":
        return <HistoryInsightsPage setCurrentPage={setCurrentPage} />;
      default:
        return <LoginPage setCurrentPage={setCurrentPage} />;
    }
  };

  return <div className="app-root">{renderPage()}</div>;
}