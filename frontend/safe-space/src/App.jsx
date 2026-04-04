import React, { useState } from "react";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard";
import DeviceMapPage from "./pages/DeviceMapPage";
import ResourcesPage from "./pages/ResourcesPage";
import AlertHistoryPage from "./pages/AlertHistoryPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const alerts = [
    {
      id: 1,
      deviceId: "Pi 03",
      location: "Common Room",
      distressType: "Crying, sobbing",
      confidence: 82,
      time: "4:32 PM",
      ago: "2 mins ago",
      status: "Active",
      severity: "high",
    },
    {
      id: 2,
      deviceId: "Pi 02",
      location: "Hallway",
      distressType: "Screaming",
      confidence: 91,
      time: "2:15 PM",
      ago: "Resolved",
      status: "Resolved",
      severity: "medium",
    },
    {
      id: 3,
      deviceId: "Pi 01",
      location: "Entrance",
      distressType: "Crying",
      confidence: 75,
      time: "11:03 AM",
      ago: "Resolved",
      status: "Resolved",
      severity: "low",
    },
  ];

  const devices = [
    { id: "Pi 01", area: "Entrance", status: "online", lastPing: "just now" },
    { id: "Pi 02", area: "Hallway", status: "online", lastPing: "just now" },
    { id: "Pi 03", area: "Common Room", status: "alert", lastPing: "ALERT ACTIVE" },
    { id: "Pi 04", area: "Dining Area", status: "online", lastPing: "just now" },
  ];

  const resources = [
    {
      category: "Crisis",
      title: "BC Crisis Line",
      details: "1-800-784-2433 · Available 24/7",
      action: "Call now",
    },
    {
      category: "De-escalation",
      title: "De-escalation Protocol",
      details: "Step-by-step guide for shelter staff",
      action: "Open guide",
    },
    {
      category: "Crisis",
      title: "Crisis Text Line",
      details: "Text HOME to 741741",
      action: "View steps",
    },
    {
      category: "Medical",
      title: "BC Mental Health Services",
      details: "Emergency and community mental health support",
      action: "Open contact",
    },
    {
      category: "CWI",
      title: "CWI Intake Process",
      details: "Internal shelter process document",
      action: "Open doc",
    },
  ];

  const logs = [
    "4:32 PM · Common Room · Crying · Resolved",
    "2:15 PM · Hallway · Screaming · Resolved",
    "11:03 AM · Entrance · Crying · Resolved",
  ];

  const activeAlert = alerts[0];

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <DashboardPage
            alerts={alerts}
            devices={devices}
            logs={logs}
            activeAlert={activeAlert}
          />
        );
      case "map":
        return <DeviceMapPage devices={devices} activeAlert={activeAlert} />;
      case "resources":
        return <ResourcesPage resources={resources} />;
      case "history":
        return <AlertHistoryPage alerts={alerts} />;
      default:
        return (
          <DashboardPage
            alerts={alerts}
            devices={devices}
            logs={logs}
            activeAlert={activeAlert}
          />
        );
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">🛡️ SafeSpace</div>

        <button
          className={currentPage === "dashboard" ? "nav-link active" : "nav-link"}
          onClick={() => setCurrentPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={currentPage === "map" ? "nav-link active" : "nav-link"}
          onClick={() => setCurrentPage("map")}
        >
          Shelter Map
        </button>

        <button
          className={currentPage === "resources" ? "nav-link active" : "nav-link"}
          onClick={() => setCurrentPage("resources")}
        >
          Resources
        </button>

        <button
          className={currentPage === "history" ? "nav-link active" : "nav-link"}
          onClick={() => setCurrentPage("history")}
        >
          Alert History
        </button>
      </aside>

      <main className="main-shell">
        <header className="topbar">
          <div>SafeSpace Staff Dashboard</div>
          <div className="topbar-right">
            <span>Staff: Jane D.</span>
            <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
              Logout
            </button>
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
}

export default App;