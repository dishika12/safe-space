import React from "react";
import "../styles/DashboardPage.css";

export default function DashboardPage({ alerts, devices, logs, activeAlert }) {
  return (
    <div className="page-container">
      <div className="metric-row">
        <div className="metric-card">
          <div className="metric-label">Active Alerts</div>
          <div className="metric-value">🔴 1 ACTIVE ALERT</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Devices Online</div>
          <div className="metric-value">🟢 3 DEVICES ONLINE</div>
        </div>
      </div>

      <div className="grid-3">
        <section className="section-card">
          <h2>Active Alerts</h2>
          {alerts.map((alert) => (
            <div key={alert.id} className="alert-card">
              <div className="alert-top">
                <div>
                  <div className="alert-location">
                    {alert.status === "Active" ? "🔴" : "🟢"} {alert.location} — {alert.deviceId}
                  </div>
                  <div className="alert-meta">
                    {alert.distressType} · {alert.confidence}% confidence
                  </div>
                  <div className="alert-meta">
                    {alert.time} · {alert.ago}
                  </div>
                </div>
                <span className={`badge badge-${alert.severity}`}>
                  {alert.status}
                </span>
              </div>

              {alert.status === "Active" && (
                <>
                  <div className="resource-strip-title">Quick Resources</div>
                  <div className="quick-resources">
                    <span>📞 BC Crisis Line</span>
                    <span>📋 De-escalation Guide</span>
                    <span>💬 Text Support</span>
                    <span>🏥 Medical Contact</span>
                  </div>
                  <div className="alert-actions">
                    <button className="outline-btn">Acknowledge</button>
                    <button className="solid-btn">Mark Resolved</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </section>

        <section className="section-card">
          <h2>Alert Details</h2>
          <div className="detail-row"><strong>Device:</strong> {activeAlert.deviceId}</div>
          <div className="detail-row"><strong>Location:</strong> {activeAlert.location}</div>
          <div className="detail-row"><strong>Alert Type:</strong> {activeAlert.distressType}</div>
          <div className="detail-row"><strong>Time:</strong> {activeAlert.time}</div>
          <div className="detail-row"><strong>Confidence:</strong> {activeAlert.confidence}%</div>
          <div className="detail-row"><strong>Status:</strong> {activeAlert.status}</div>
          <div className="detail-row">
            <strong>Recommended next step:</strong> Calmly assess the area and open the de-escalation guide.
          </div>
        </section>

        <section className="section-card">
          <h2>Immediate Staff Resources</h2>
          <div className="resource-list">
            <button className="resource-btn">📋 Open De-escalation Protocol</button>
            <button className="resource-btn">📞 Call BC Crisis Line</button>
            <button className="resource-btn">🏥 View Medical Contact</button>
            <button className="resource-btn">👩‍💼 Call Supervisor</button>
          </div>
        </section>
      </div>

      <div className="grid-2 dashboard-bottom">
        <section className="section-card">
          <h2>Device Status</h2>
          <div className="device-list">
            {devices.map((device) => (
              <div key={device.id} className="device-row">
                <span>
                  {device.status === "alert" ? "🔴" : "🟢"} {device.id} · {device.area}
                </span>
                <span>{device.lastPing}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section-card">
          <h2>Today's Log</h2>
          <div className="log-list">
            {logs.map((log, index) => (
              <div key={index} className="log-item">
                {log}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}