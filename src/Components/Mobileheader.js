import React from "react";
import { Link } from "react-router-dom";

function Mobileheader() {
  return (
    <div
      className="row mobile_header"
      style={{ backgroundColor: "aliceblue", padding: "15px" }}
    >
      <Link className="navbar-brand" to="/">
        <img
          src="./images/plogo.png"
          alt="loading...."
          style={{
            height: "50px",
            width: "200px",
          }}
        />
      </Link>
    </div>
  );
}
export default Mobileheader;
