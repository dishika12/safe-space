import React from "react";
import "../styles/AlertHistoryPage.css";

export default function AlertHistoryPage({ alerts }) {
  return (
    <div className="page-container">
      <div className="metric-row">
        <div className="metric-card">
          <div className="metric-label">Total alerts this week</div>
          <div className="metric-value">12</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Most active location</div>
          <div className="metric-value">Common Room</div>
        </div>
      </div>

      <div className="section-card">
        <div className="history-header">
          <h2>Alert History — Last 7 Days</h2>
          <div className="history-filters">
            <select>
              <option>All Locations</option>
            </select>
            <select>
              <option>All Alert Types</option>
            </select>
            <select>
              <option>This Week</option>
            </select>
          </div>
        </div>

        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Location</th>
                <th>Device</th>
                <th>Alert Type</th>
                <th>Confidence</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id}>
                  <td>{alert.time}</td>
                  <td>{alert.location}</td>
                  <td>{alert.deviceId}</td>
                  <td>{alert.distressType}</td>
                  <td>{alert.confidence}%</td>
                  <td>
                    <span className={`badge badge-${alert.severity}`}>{alert.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}