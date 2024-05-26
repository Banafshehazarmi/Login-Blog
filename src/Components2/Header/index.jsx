// src/Components2/Header/index.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext"; // Import useAuth hook to check authentication status
import { doSignOut } from "../../firebase/auth"; // Import Firebase sign-out function

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth(); // Retrieve user authentication status from context

  const handleLogout = async () => {
    try {
      await doSignOut(); // Sign out user using Firebase
      navigate("/login"); // Redirect to login page after successful sign-out
    } catch (error) {
      console.error("Error signing out:", error.message);
      // Handle sign-out error (e.g., display error message to user)
    }
  };

  return (
    <nav className="flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200">
      {userLoggedIn ? (
        <>
          <button
            onClick={handleLogout}
            className="text-sm text-blue-600 underline"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className="text-sm text-blue-600 underline" to={"/login"}>
            Login
          </Link>
          <Link className="text-sm text-blue-600 underline" to={"/register"}>
            Register New Account
          </Link>
        </>
      )}
    </nav>
  );
};

export default Header;
