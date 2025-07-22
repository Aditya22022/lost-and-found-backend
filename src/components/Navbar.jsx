import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // Check if user is logged in (token exists in localStorage)
  const isLoggedIn = !!localStorage.getItem("token");

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    // White navbar with soft shadow (Option 1)
    <nav className="navbar navbar-expand-lg shadow-sm" >
      <div className="container">
        {/* Brand/Logo with blue color */}
        <Link className="navbar-brand" to="/">
          {/*link is to route path (/)in app.jsx*/}
          <i className="bi bi-search"></i> Lost & Found
        </Link>
        {/* Hamburger menu for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link navbar-link-blue" to="/items">
                {/*link is to route path(/items) in app.jsx*/}
                All Items
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link navbar-link-blue" to="/add-item">
                    Add Item
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary ms-2"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link navbar-link-blue" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link navbar-link-blue" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 