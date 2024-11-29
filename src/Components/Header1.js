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
      <nav className="navbar navbar-expand-lg mobile_header navbar-light bg-light">
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
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
