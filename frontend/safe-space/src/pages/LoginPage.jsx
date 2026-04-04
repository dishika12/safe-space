import React from "react";
import "./LoginPage.css";

export default function LoginPage({ setCurrentPage }) {
  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentPage("dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">🛡️</div>
        <h1 className="login-title">SafeSpace</h1>
        <p className="login-subtitle">Staff Access Portal</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input type="text" placeholder="Username" className="login-input" />
          <input type="password" placeholder="Password" className="login-input" />
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <p className="login-footer">
          Secure · Private · For Authorized Staff Only
        </p>
      </div>
    </div>
  );
}