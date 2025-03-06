import React, { useEffect, useState } from "react";
import { FlimFlix, regularUser } from "../../assets/images";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // UseEffect to handle user state when component mounts
  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser && loggedUser !== "null") {
      setUser(JSON.parse(loggedUser));
    } else {
      setUser(null);
    }
  }, []); // Only run once when the component is mounted

  const handleLogout = () => {
    localStorage.setItem("accountLogged", false);
    localStorage.setItem("loggedUser", null);
    localStorage.setItem("userEmail", null);
    setUser(null); // Update the user state immediately
    navigate("/"); // Navigate to home or login page
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="navBar">
      <div className="navBar__image">
        <img src={FlimFlix} alt="FlimFlix Logo" />
      </div>
      <ul>
        <li onClick={() => navigate("/home")}>Home</li>
        <li onClick={() => navigate("/movies")}>Movies</li>
        <li onClick={() => navigate("/series")}>TV Series</li>
        <li onClick={() => navigate("/docs")}>Documentaries</li>
      </ul>

      {/* Profile Image as Offcanvas Toggle Button */}
      <div
        className="navBar__user"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasUserMenu"
      >
        <div>
          <img src={regularUser} alt="User" />
          <p>{user?.name || "Guest"}</p>
        </div>
      </div>

      {/* Offcanvas Logout/Login Menu */}
      <div
        className="offcanvas offcanvas-end text-bg-dark"
        tabIndex="-2"
        id="offcanvasUserMenu"
        aria-labelledby="offcanvasUserMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasUserMenuLabel">
            {user?.name || "Guest"}
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body text-center">
          {/* Logo and Text Above Buttons */}
          <div className="offcanvas-logo">
            <img src={FlimFlix} alt="App Logo" className="app-logo" />
            <p className="mt-3">
              Welcome to FlimFlix! Your gateway to movies and TV shows.
            </p>
          </div>

          {/* Login/Logout Button */}
          <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
            <li className="nav-item">
              {user && user.name !== "Guest" ? (
                <button className="btn btn-danger w-50" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <button className="btn btn-primary w-50" onClick={handleLogin}>
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
