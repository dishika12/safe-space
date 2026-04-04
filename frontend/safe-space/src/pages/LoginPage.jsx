import React from "react";
import "../styles/LoginPage.css";

export default function LoginPage({ onLogin }) {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">🛡️ SafeSpace</div>
        <div className="login-subtitle">Staff Access Portal</div>

        <label>Username</label>
        <input type="text" placeholder="Enter username" />

        <label>Password</label>
        <input type="password" placeholder="Enter password" />

        <button className="primary-btn" onClick={onLogin}>
          Sign In
        </button>

        <p className="login-note">Secure · Private · For Authorized Staff Only</p>
      </div>
    </div>
  );
}