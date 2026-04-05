import React from "react";
import "./DashboardPage.css";

export default function DashboardPage({ setCurrentPage }) {
  const logs = [
    { time: "4:32 PM", room: "Common Room", type: "Crying", status: "Resolved" },
    { time: "2:15 PM", room: "Hallway", type: "Screaming", status: "Resolved" },
    { time: "11:03 AM", room: "Entrance", type: "Crying", status: "Resolved" },
  ];

  const deviceStatus = [
    { id: "Pi 01", room: "Entrance", status: "Online" },
    { id: "Pi 02", room: "Hallway", status: "Online" },
    { id: "Pi 03", room: "Common Room", status: "Alert Active" },
    { id: "Pi 04", room: "Dining Area", status: "Online" },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">🛡️</div>
          <div>
            <h2>SafeSpace</h2>
            <p>Staff Dashboard</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="sidebar-link active" onClick={() => setCurrentPage("dashboard")}>
            Dashboard
          </button>
          <button className="sidebar-link" onClick={() => setCurrentPage("map")}>
            Device Map
          </button>
          <button className="sidebar-link" onClick={() => setCurrentPage("resources")}>
            Resources
          </button>
          <button className="sidebar-link" onClick={() => setCurrentPage("history")}>
            History & Insights
          </button>
          <button className="sidebar-link" onClick={() => setCurrentPage("login")}>
            Logout
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link">Account</button>
          <button className="sidebar-link">Help</button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <div className="profile-avatar">JD</div>
            <div>
              <h3>Jane Doe</h3>
              <p>Administrator</p>
            </div>
          </div>

          <div className="topbar-right">
            <div className="search-box">
              <span>🔎</span>
              <input type="text" placeholder="Search here..." />
            </div>
          </div>
        </header>

        <section className="dashboard-header-row">
          <h1>Dashboard</h1>
          <button className="view-details-btn">View Details</button>
        </section>

        {/* <section className="overview-card large-card">
          <div className="section-row">
            <h2>Alert Overview</h2>
            <span className="muted-tag">Today</span>
          </div>

          <div className="overview-chart-mock">
            <div className="chart-line purple-line"></div>
            <div className="chart-line orange-line"></div>
            <div className="chart-line dark-line"></div>
          </div>
        </section> */}

        <section className="bottom-grid">
          <div className="info-card purple-card">
            <h3>Active Alerts</h3>
            <div className="big-number">1</div>
            <p>Common Room · Pi 03</p>
            <span>Crying, sobbing · 82% confidence</span>
          </div>

          <div className="info-card dark-card">
            <div className="section-row">
              <h3>Device Status</h3>
              <span>Live</span>
            </div>

            <div className="device-list">
              {deviceStatus.map((device, index) => (
                <div key={index} className="device-item">
                  <div>
                    <strong>{device.id}</strong>
                    <p>{device.room}</p>
                  </div>
                  <span
                    className={
                      device.status === "Alert Active"
                        ? "status-pill red"
                        : "status-pill green"
                    }
                  >
                    {device.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="info-card orange-card">
            <div className="section-row">
              <h3>Quick Resources</h3>
              <span>Now</span>
            </div>

            <div className="resource-mini-box">
              <p>📞 BC Crisis Line</p>
              <p>📋 De-escalation Guide</p>
              <p>💬 Text Support</p>
              <p>🏥 Medical Contact</p>
            </div>

            <button className="action-line">Open Response Resources ➜</button>
          </div>
        </section>

        <section className="logs-card">
          <div className="section-row">
            <h2>Today's Log</h2>
            <span className="muted-tag">Recent activity</span>
          </div>

          <div className="logs-table">
            {logs.map((log, index) => (
              <div className="log-row" key={index}>
                <span>{log.time}</span>
                <span>{log.room}</span>
                <span>{log.type}</span>
                <span>{log.status}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}