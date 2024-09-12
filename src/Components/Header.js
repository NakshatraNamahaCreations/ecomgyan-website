import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("userToken");
  console.log("token", token);

  const userstoredata = user ? JSON.parse(user) : null;

  console.log("user", userstoredata);

  const handleremove = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
    alert("Account Deleted Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid mheader-web">
          <Link className="navbar-brand" to="/">
            <img
              src="./images/pro.png"
              alt="loading...."
              style={{
                height: "60px",
              }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse m-header  navbar-collapse"
            style={{ flex: "none" }}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                className={`nav-item ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link className="nav-link poppins-regular" to="/">
                  Home
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link className="nav-link poppins-regular" to="/about">
                  About Us
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="poppins-regular nav-link dropdown-toggle"
                  href="#"
                  id="toolsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Tools
                </a>
                <ul className="dropdown-menu" aria-labelledby="toolsDropdown">
                  <li>
                    <Link
                      className="dropdown-item poppins-regular"
                      to="/asin-code"
                    >
                      ASIN Code
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item poppins-regular"
                      to="/product-search"
                    >
                      Product Search
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/courses" ? "active" : ""
                }`}
              >
                <Link className="nav-link poppins-regular" to="/courses">
                  Courses
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/chat" ? "active" : ""
                }`}
              >
                <Link className="nav-link poppins-regular" to="/chat">
                  Support
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/blogs" ? "active" : ""
                }`}
              >
                <Link className="nav-link poppins-regular" to="/blogs">
                  Blog
                </Link>
              </li>
              {userstoredata ? (
                <li
                  className={`nav-item ${
                    location.pathname === "/profile" ? "active" : ""
                  }`}
                >
                  <Link
                    onClick={handleremove}
                    className="nav-link poppins-regular"
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li
                  className={`nav-item ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link poppins-regular" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
