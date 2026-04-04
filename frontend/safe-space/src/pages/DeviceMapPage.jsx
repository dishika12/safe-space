import React from "react";
import "../styles/DeviceMapPage.css";

export default function DeviceMapPage({ devices, activeAlert }) {
  return (
    <div className="page-container">
      <div className="section-card">
        <h2>SafeSpace · Shelter Floor Plan</h2>
        <div className="map-grid">
          {devices.map((device) => (
            <div
              key={device.id}
              className={`room-tile ${device.status === "alert" ? "alert-room" : ""}`}
            >
              <div className="room-status">
                {device.status === "alert" ? "🔴" : "🟢"} {device.id}
              </div>
              <div className="room-name">{device.area}</div>
              <div className="room-ping">
                {device.status === "alert" ? "ALERT ACTIVE" : `Last ping: ${device.lastPing}`}
              </div>
            </div>
          ))}
        </div>

        <div className="map-detail-box">
          <strong>Current alert:</strong> {activeAlert.location} · {activeAlert.deviceId} · {activeAlert.distressType}
        </div>
      </div>
    </div>
  );
}