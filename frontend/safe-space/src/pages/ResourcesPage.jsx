import React from "react";
import "./ResourcesPage.css";

export default function ResourcesPage({ setCurrentPage }) {
  const resources = [
    { title: "BC Crisis Line", detail: "1-800-784-2433 · Available 24/7" },
    { title: "De-escalation Protocol", detail: "Step-by-step guide for staff" },
    { title: "Crisis Text Line", detail: "Text HOME to 741741" },
    { title: "Medical Contact", detail: "Emergency and urgent support contacts" },
    { title: "Internal Shelter Intake Process", detail: "Staff-only procedural guide" },
  ];

  return (
    <div className="resource-page-wrap">
      <aside className="resource-sidebar">
        <div className="resource-brand">
          <div className="sidebar-logo">🛡️</div>
          <div>
            <h2>SafeSpace</h2>
            <p>Staff Dashboard</p>
          </div>
        </div>

        <div className="resource-nav">
          <button onClick={() => setCurrentPage("dashboard")}>Dashboard</button>
          <button onClick={() => setCurrentPage("map")}>Device Map</button>
          <button className="active" onClick={() => setCurrentPage("resources")}>
            Resources
          </button>
          <button onClick={() => setCurrentPage("history")}>History & Insights</button>
          <button onClick={() => setCurrentPage("login")}>Logout</button>
        </div>
      </aside>

      <main className="resource-main">
        <div className="resource-header">
          <h1>Resources & Protocols</h1>
          <div className="resource-filters">
            <button>All</button>
            <button>Crisis</button>
            <button>Medical</button>
            <button>De-escalation</button>
            <button>CWI</button>
          </div>
        </div>

        <div className="resource-list-card">
          {resources.map((item, index) => (
            <div className="resource-row-card" key={index}>
              <div className="resource-icon-badge">📘</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}