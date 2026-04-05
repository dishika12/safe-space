import React from "react";
import "./DeviceMapPage.css";

export default function DeviceMapPage({ setCurrentPage }) {
  return (
    <div className="page-shell">
      <aside className="page-sidebar">
        <div className="page-sidebar-brand">
          <div className="sidebar-logo">🛡️</div>
          <div>
            <h2>SafeSpace</h2>
            <p>Staff Dashboard</p>
          </div>
        </div>

        <div className="page-sidebar-links">
          <button onClick={() => setCurrentPage("dashboard")}>Dashboard</button>
          <button className="active" onClick={() => setCurrentPage("map")}>Device Map</button>
          <button onClick={() => setCurrentPage("resources")}>Resources</button>
          <button onClick={() => setCurrentPage("history")}>History & Insights</button>
          <button onClick={() => setCurrentPage("login")}>Logout</button>
        </div>
      </aside>

      <main className="page-main">
        <div className="page-title-row">
          <h1>Device Map</h1>
          <span>Shelter Floor Plan</span>
        </div>

        <div className="map-card">
          <div className="map-grid">
            <div className="room-box online">
              <h3>Pi 01</h3>
              <p>Entrance</p>
            </div>
            <div className="room-box online">
              <h3>Pi 02</h3>
              <p>Hallway</p>
            </div>
            <div className="room-box alert">
              <h3>Pi 03</h3>
              <p>Common Room</p>
              <span>ALERT ACTIVE</span>
            </div>
            <div className="room-box online">
              <h3>Pi 04</h3>
              <p>Dining Area</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}