import React from "react";
import "./DashboardPage.css";

export default function DashboardPage({ setCurrentPage }) {
  const devices = [
    { id: "Pi 01", location: "Entrance", status: "online", ping: "just now" },
    { id: "Pi 02", location: "Hallway", status: "online", ping: "just now" },
    { id: "Pi 03", location: "Common Room", status: "alert", ping: "ALERT ACTIVE" },
    { id: "Pi 04", location: "Dining Area", status: "online", ping: "just now" },
  ];

  const logs = [
    { time: "4:32 PM", room: "Common Room", type: "Crying", status: "Resolved" },
    { time: "2:15 PM", room: "Hallway", type: "Screaming", status: "Resolved" },
    { time: "11:03 AM", room: "Entrance", type: "Crying", status: "Resolved" },
  ];

  return (
    <div className="page-layout">
      <div className="topbar">
        <div className="brand">🛡️ SafeSpace</div>

        <div className="topbar-right">
          <div className="nav-links">
            <button className="nav-link-btn" onClick={() => setCurrentPage("dashboard")}>
              Home
            </button>
            <button className="nav-link-btn" onClick={() => setCurrentPage("map")}>
              Device Map
            </button>
            <button className="nav-link-btn" onClick={() => setCurrentPage("resources")}>
              Resources
            </button>
            <button className="nav-link-btn" onClick={() => setCurrentPage("history")}>
              History
            </button>
          </div>

          <span>Staff: Jane D.</span>
          <button className="topbar-btn" onClick={() => setCurrentPage("login")}>
            Logout
          </button>
        </div>
      </div>

      <div className="content-wrap">
        <div className="dashboard-stats">
          <div className="stat-card alert-stat">
            <h3>🔴 1 ACTIVE ALERT</h3>
            <p>Immediate action needed</p>
          </div>
          <div className="stat-card online-stat">
            <h3>🟢 3 DEVICES ONLINE</h3>
            <p>All other systems normal</p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="card dashboard-card">
            <h2 className="section-title">ACTIVE ALERTS</h2>

            <div className="active-alert-box">
              <div className="alert-header-line">
                <h3>🔴 Common Room — Pi 03</h3>
                <span className="alert-badge">Live</span>
              </div>

              <p className="alert-main-text">Crying, sobbing · 82% confidence</p>
              <p className="muted">4:32 PM · 2 mins ago</p>

              <div className="resources-block">
                <h4>QUICK RESOURCES</h4>
                <div className="resource-buttons">
                  <button>📞 BC Crisis Line</button>
                  <button>📋 De-escalation Guide</button>
                  <button>💬 Text Support</button>
                  <button>🏥 Medical Contact</button>
                </div>
              </div>

              <div className="alert-actions">
                <button className="ack-btn">Acknowledge</button>
                <button className="resolve-btn">Mark Resolved</button>
              </div>
            </div>
          </div>

          <div className="card dashboard-card">
            <h2 className="section-title">DEVICE STATUS</h2>
            <div className="device-status-list">
              {devices.map((device, index) => (
                <div
                  key={index}
                  className={`device-row ${device.status === "alert" ? "device-alert" : ""}`}
                >
                  <div>
                    <span className="device-dot">
                      {device.status === "alert" ? "🔴" : "🟢"}
                    </span>{" "}
                    {device.id} · {device.location}
                  </div>
                  <div className="muted">
                    {device.status === "alert" ? device.ping : `Last ping: ${device.ping}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card dashboard-card full-width">
            <h2 className="section-title">TODAY'S LOG</h2>
            <div className="log-list">
              {logs.map((log, index) => (
                <div key={index} className="log-row">
                  <span>{log.time}</span>
                  <span>{log.room}</span>
                  <span>{log.type}</span>
                  <span>{log.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}