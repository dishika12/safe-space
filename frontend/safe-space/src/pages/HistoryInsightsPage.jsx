import React from "react";
import "./HistoryInsightsPage.css";

export default function HistoryInsightsPage({ setCurrentPage }) {
  const historyRows = [
    { date: "Apr 4", room: "Common Rm", type: "Crying", status: "✅" },
    { date: "Apr 4", room: "Hallway", type: "Scream", status: "✅" },
    { date: "Apr 3", room: "Dining", type: "Crying", status: "✅" },
    { date: "Apr 2", room: "Entrance", type: "Crying", status: "✅" },
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
          <button className="topbar-btn" onClick={() => setCurrentPage("login")}>
            Logout
          </button>
        </div>
      </div>

      <div className="content-wrap">
        <div className="card">
          <h2 className="section-title">Alert History — Last 7 Days</h2>

          <div className="insight-grid">
            <div className="insight-box">
              <h3>📊 Most Active Location</h3>
              <p>Common Room · 8 alerts this week</p>
            </div>

            <div className="insight-box">
              <h3>📊 Most Common Distress Type</h3>
              <p>Crying, sobbing · 65%</p>
            </div>

            <div className="insight-box">
              <h3>📊 Peak Time</h3>
              <p>9 PM – 11 PM</p>
            </div>
          </div>

          <div className="history-table-wrap">
            <table className="history-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>ROOM</th>
                  <th>TYPE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {historyRows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.room}</td>
                    <td>{row.type}</td>
                    <td>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}