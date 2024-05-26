import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import { BlogProvider } from "./context/BlogContext";
import FirebaseLogin from "./Components2/Auth/Login/index";
import FirebaseRegister from "./Components2/Auth/Register/index";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Router>
      <BlogProvider>
        <div className="container">
          <Header username={username} handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog isLoggedIn={isLoggedIn} />} />
            <Route
              path="/blog/:id"
              element={<Blog isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="/login"
              element={
                <FirebaseLogin
                  setUsername={setUsername}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route path="/register" element={<FirebaseRegister />} />
          </Routes>
          <Footer />
        </div>
      </BlogProvider>
    </Router>
  );
}

export default App;
