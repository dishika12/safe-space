import React from "react";
import "./LoginPage.css";

export default function LoginPage({ setCurrentPage }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage("dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        <div className="login-brand">
          <div className="login-logo">🛡️</div>
          <div>
            <h1>SafeSpace</h1>
            <p>Shelter Staff Dashboard</p>
          </div>
        </div>

        <div className="login-box">
          <h2>Staff Access Portal</h2>
          <p>Secure login for authorized shelter staff only.</p>

          <form onSubmit={handleSubmit} className="login-form">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Sign In</button>
          </form>

          <span className="login-note">
            Safety · Privacy · Real-time Shelter Support
          </span>
        </div>
      </div>
    </div>
  );
}