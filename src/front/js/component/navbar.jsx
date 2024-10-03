import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo/logo-marca.png";
import { Context } from "../store/appContext.js";
import { Notifications } from "./notifications.jsx";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logoutUser();
    navigate("/");
  };

  return (
    <>
      <section id="navBar">
        <nav className="navbar fixed-top py-3 navbar-expand-lg navbar-light shadow-sm">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img
                src={logo}
                alt="Logo"
                width="250"
                height="70"
                className="d-inline-block align-top"
              />
            </Link>
            <button
              className="navbar-toggler custom-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search">
                    Search
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search-match">
                    Match
                  </Link>
                </li>
                <li className="nav-item dropdown ">
                  <a
                    className="nav-link dropdown-toggle "
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    
                    aria-expanded="false"
                  >
                    Sessions
                  </a>
                  <ul
                    className="dropdown-menu bg-dark"
                    aria-labelledby="navbarDropdown"
                  >
                    <li className="">
                      <Link className="dropdown-item text-white" to={localStorage.getItem("token") ? "/session" : "/login"}>
                        Search Session
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-white" 
                        to={localStorage.getItem("token") ? "/create-session" : "/login"}
                      >
                        Create Session
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/team">
                    Team
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/donate">
                    Donate
                  </Link>
                </li>
              </ul>

              {store.isAuthenticated && (
                <Notifications notifications={store.notifications} />
              )}

              <div className="d-flex align-items-center navbar-container">
                {store.isAuthenticated ? (
                  <div className="dropdown">
                    <button
                      className="btn nav_button dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user me-3"></i>
                      {store.userProfile
                        ? JSON.parse(localStorage.getItem("userProfile"))
                            .username
                        : "Perfil"}
                    </button>
                    <ul
                      className="dropdown-menu bg-dark"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <Link
                          className="dropdown-item text-white"
                          to={`/profile/${
                            store.userProfile ? store.userProfile.id : ""
                          }`}
                        >
                          Ver perfil
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-white"
                          to={`/profile_edit/${store.userProfile.id}`}
                        >
                          Editar perfil
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-white"
                          onClick={handleLogout}
                        >
                          Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/login">
                    <button type="button" className="btn nav_button">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};
