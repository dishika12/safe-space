import React from "react";
import "./HistoryInsightsPage.css";

export default function HistoryInsightsPage({ setCurrentPage }) {
  const alertHistory = [
    { date: "Apr 4", time: "4:32 PM", room: "Common Room", type: "Crying", status: "Resolved" },
    { date: "Apr 4", time: "2:15 PM", room: "Hallway", type: "Screaming", status: "Resolved" },
    { date: "Apr 3", time: "8:47 PM", room: "Dining Area", type: "Crying", status: "Resolved" },
    { date: "Apr 3", time: "11:03 AM", room: "Entrance", type: "Distress Call", status: "Resolved" },
    { date: "Apr 2", time: "9:18 PM", room: "Common Room", type: "Crying", status: "Resolved" },
  ];

  return (
    <div className="history-page">
      <aside className="history-sidebar">
        <div className="history-logo">
          <div className="history-logo-icon">🛡️</div>
          <div>
            <h2>SafeSpace</h2>
            <p>Shelter Dashboard</p>
          </div>
        </div>

        <nav className="history-nav">
          <button className="history-nav-item" onClick={() => setCurrentPage("dashboard")}>
            Dashboard
          </button>
          <button className="history-nav-item" onClick={() => setCurrentPage("map")}>
            Device Map
          </button>
          <button className="history-nav-item" onClick={() => setCurrentPage("resources")}>
            Resources
          </button>
          <button className="history-nav-item active">
            History & Insights
          </button>
          <button className="history-nav-item" onClick={() => setCurrentPage("login")}>
            Logout
          </button>
        </nav>

        <div className="history-sidebar-footer">
          <button className="history-nav-item small">Account</button>
          <button className="history-nav-item small">Help</button>
        </div>
      </aside>

      <main className="history-main">
        <header className="history-topbar">
          <div className="history-user">
            <div className="history-avatar">JD</div>
            <div>
              <h3>Jane Doe</h3>
              <p>Shelter Administrator</p>
            </div>
          </div>

          <div className="history-top-actions">
            <button className="history-icon-btn">🔔</button>
            <button className="history-icon-btn">💬</button>
            <div className="history-search">
              <span>🔎</span>
              <input type="text" placeholder="Search alerts..." />
            </div>
          </div>
        </header>

        <section className="history-header-row">
          <h1>Alert History & Insights</h1>
          <button className="history-detail-btn">View Details ▾</button>
        </section>

        <section className="history-chart-card">
          <div className="history-chart-top">
            <h2>Alert Trend Overview</h2>
            <div className="history-chart-controls">
              <span className="legend-item purple-dot">Distress Alerts</span>
              <span className="legend-item orange-dot">Resolved Cases</span>
              <span className="sort-text">Sort By <strong>Week ▾</strong></span>
            </div>
          </div>

          <div className="fake-chart">
            <div className="chart-grid-line"></div>
            <div className="chart-grid-line"></div>
            <div className="chart-grid-line"></div>
            <div className="chart-grid-line"></div>
            <div className="chart-grid-line"></div>

            <div className="chart-line purple-line"></div>
            <div className="chart-line orange-line"></div>

            <div className="chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </section>

        <section className="history-cards-row">
          <div className="insight-card purple-card">
            <h3>Most Active Location</h3>
            <div className="big-value">Common Room</div>
            <p>8 alerts this week</p>
          </div>

          <div className="insight-card dark-card">
            <div className="card-head">
              <h3>Key Insights</h3>
              <span>View Details ▾</span>
            </div>
            <div className="mini-insight-list">
              <div className="mini-insight-item">
                <strong>Most Common Distress</strong>
                <p>Crying, sobbing · 65%</p>
              </div>
              <div className="mini-insight-item">
                <strong>Peak Time</strong>
                <p>9 PM – 11 PM</p>
              </div>
              <div className="mini-insight-item">
                <strong>Fastest Response</strong>
                <p>1 min 12 sec avg.</p>
              </div>
            </div>
          </div>

          <div className="insight-card orange-card">
            <div className="card-head">
              <h3>Weekly Summary</h3>
              <span>View Details ▾</span>
            </div>
            <div className="summary-box">
              <p><strong>Total Alerts:</strong> 14</p>
              <p><strong>Resolved:</strong> 13</p>
              <p><strong>Pending Review:</strong> 1</p>
              <p><strong>Devices Online:</strong> 4/4</p>
            </div>
          </div>
        </section>

        <section className="history-table-card">
          <div className="table-header">
            <h2>Recent Alert Log</h2>
            <button>Export Report</button>
          </div>

          <div className="history-table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Room</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {alertHistory.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.room}</td>
                    <td>{item.type}</td>
                    <td>
                      <span className="status-pill">{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}