import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo/logo-marca.png";

export const Navbar = () => {
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
                  <Link className="nav-link" to="#about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/match-results">
                    Match
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#team">
                    Team
                  </Link>
                </li>
              </ul>
              <div className="d-flex align-items-center">
                <Link to="/login">
                  <button type="button" className="btn nav_button">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};
