// src/Components2/Auth/Login/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../../firebase/auth"; // Import Firebase login function
import SignUp from "../SignUp/index"; // Import the SignUp component
import "./Login.css";

function Login({ setUsername, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state
    try {
      await doSignInWithEmailAndPassword(email, password); // Login user with Firebase authentication
      setUsername(email); // Set username in context or state
      setIsLoggedIn(true); // Set login state
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      setError(error.message); // Handle login error
    }
  };

  return (
    <div className="auth-container">
      <SignUp /> {/* Include the SignUp component first */}
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form-group">
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Display error message */}
        </form>
      </div>
    </div>
  );
}

export default Login;
