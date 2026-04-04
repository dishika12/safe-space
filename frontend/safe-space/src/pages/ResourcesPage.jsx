import React from "react";
import "./ResourcesPage.css";

export default function ResourcesPage({ setCurrentPage }) {
  const resources = [
    {
      icon: "📞",
      title: "BC Crisis Line",
      desc: "1-800-784-2433 · Available 24/7",
    },
    {
      icon: "📋",
      title: "De-escalation Protocol",
      desc: "Step-by-step guide for staff response",
    },
    {
      icon: "💬",
      title: "Crisis Text Line",
      desc: "Text HOME to 741741",
    },
    {
      icon: "🏥",
      title: "BC Mental Health Services",
      desc: "burnaby-hospital.ca",
    },
    {
      icon: "📖",
      title: "CWI Intake Process",
      desc: "Internal shelter document",
    },
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
          <h2 className="section-title">Resources & Protocols</h2>

          <div className="filter-row">
            <button>All</button>
            <button>Crisis</button>
            <button>Medical</button>
            <button>De-escalation</button>
            <button>CWI</button>
          </div>

          <div className="resource-library">
            {resources.map((resource, index) => (
              <div key={index} className="resource-item">
                <div className="resource-icon">{resource.icon}</div>
                <div>
                  <h3>{resource.title}</h3>
                  <p>{resource.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}