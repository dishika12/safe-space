import React from "react";
import "./DeviceMapPage.css";

export default function DeviceMapPage({ setCurrentPage }) {
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
          <h2 className="section-title">🛡️ SafeSpace · Shelter Floor Plan</h2>
          <p className="muted map-subtext">
            Click any room to open its device details, alert state, and response resources.
          </p>

          <div className="floor-plan">
            <div className="device-box online">
              <h3>🟢 Pi01</h3>
              <p>Entrance</p>
            </div>

            <div className="device-box online">
              <h3>🟢 Pi02</h3>
              <p>Hallway</p>
            </div>

            <div className="device-box alert pulse">
              <h3>🔴 Pi03</h3>
              <p>Common Room</p>
              <span className="alert-arrow">↑ ALERT</span>
            </div>

            <div className="device-box online">
              <h3>🟢 Pi04</h3>
              <p>Dining Area</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}