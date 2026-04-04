import React from "react";
import "../styles/ResourcesPage.css";

export default function ResourcesPage({ resources }) {
  return (
    <div className="page-container">
      <div className="section-card">
        <div className="resource-header">
          <h2>Resources & Protocols</h2>
          <div className="resource-filters">
            <button>All</button>
            <button>Crisis</button>
            <button>Medical</button>
            <button>De-escalation</button>
            <button>CWI</button>
          </div>
        </div>

        <div className="resource-grid">
          {resources.map((resource, index) => (
            <div key={index} className="resource-card">
              <div className="resource-category">{resource.category}</div>
              <div className="resource-title">{resource.title}</div>
              <div className="resource-details">{resource.details}</div>
              <button className="resource-open-btn">{resource.action}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}