// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ username, handleLogout }) {
  return (
    <div className="header">
      <Link to="/" className="header-link">
        Home
      </Link>
      <Link to="/blog" className="header-link">
        Blog
      </Link>

      {username ? (
        <div className="user-info">
          <p className="welcome-message">Welcome, {username}!</p>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login" className="header-link">
          Login
        </Link>
      )}
    </div>
  );
}

export default Header;
