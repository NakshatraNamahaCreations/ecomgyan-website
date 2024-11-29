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
    <div>
      <nav className="navbar navbar-expand-lg web-header navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="./images/plogo.png"
              alt="loading...."
              style={{
                height: "50px",
                width: "200px",
              }}
            />
          </a>

          <ul className="navbar-nav me-0 mb-2 mb-lg-0">
            <li
              className={`nav-item ${
                location.pathname === "/home" ? "active" : ""
              }`}
            >
              <Link
                className="nav-link poppins-regular"
                style={{ fontSize: "14px" }}
                to="/home"
              >
                Home
              </Link>
            </li>
            {/* <li
                className={`nav-item ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link className="nav-link poppins-regular" to="/about">
                  About Us
                </Link>
              </li> */}

            <li
              className={`nav-item ${
                location.pathname === "/asin-code" ? "active" : ""
              }`}
            >
              <Link className="nav-link poppins-regular" to="/asin-code">
                Tools
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
                <i
                  className="fa-solid fa-circle-user"
                  style={{ fontSize: "25px" }}
                ></i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="toolsDropdown">
                <li>
                  <Link
                    className="dropdown-item poppins-regular"
                    to="/asin-code"
                  >
                    Logout
                  </Link>
                </li>
                {/* <li>
                  <Link
                    className="dropdown-item poppins-regular"
                    to="/product-search"
                  >
                    Product Search
                  </Link>
                </li> */}
              </ul>
            </li>
            {/* <li
                className={`nav-item ${
                  location.pathname === "/courses" ? "active" : ""
                }`}
              >
                <Link className="nav-link poppins-regular" to="/courses">
                  Courses
                </Link>
              </li> */}
            {/* <li
                className={`nav-item ${
                  location.pathname === "/chat" ? "active" : ""
                }`}
              >
                <Link className="nav-link poppins-regular" to="/chat">
                  Support
                </Link>
              </li> */}
            {/* <li
                className={`nav-item ${
                  location.pathname === "/blogs" ? "active" : ""
                }`}
              >
                <Link className="nav-link poppins-regular" to="/blogs">
                  Blog
                </Link>
              </li> */}
            {/* {userstoredata ? (
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
            )} */}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
