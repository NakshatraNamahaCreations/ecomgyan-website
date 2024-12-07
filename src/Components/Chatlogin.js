import axios from "axios";
import React, { useState } from "react";

function Chatlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const config = {
        url: "/users/auth/login",
        method: "post",
        baseURL: "http://localhost:8082/api",
        headers: { "content-type": "application/json" },
        data: { email, password },
      };

      const res = await axios(config);

      if (res.status === 200 && res.data.token) {
        localStorage.setItem("userToken", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login Successfully", res.data.token);
        console.log("token sisya", res.data.token);
        window.location.assign("/");
      }
    } catch (error) {
      console.log("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row mt-2 col-md-12 justify-content-center">
        <div className="col-md-4">
          <div className="d-flex justify-content-center">
            <img
              src="./images/eg.png"
              alt="loading..."
              style={{ height: "150px", textAlign: "center" }}
            />
          </div>

          <div className="login_heading">Log In to Proleverage</div>
          <div className="mt-3">
            <div className="label">Email</div>
            <input
              type="text"
              placeholder="Please Enter Email"
              className="input_box"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <div className="label">Password</div>
            <input
              type="text"
              placeholder="Please Enter Password"
              className="input_box"
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="" className="hyperlink">
              Forgot Password?
            </a>
          </div>

          <div className="d-flex mt-2">
            <input type="checkbox" />
            <div
              className=""
              style={{
                color: "black",
                fontSize: "15px",
                fontWeight: "700",
                marginLeft: "10px",
              }}
            >
              Remember Me
            </div>
          </div>

          <div className="login_button" onClick={handleLogin}>
            Login
          </div>

          <div
            className="text-center d-flex mt-3 justify-content-center mb-3"
            style={{ color: "black", fontSize: "15px" }}
          >
            New to Proleverage ?
            <a href="signup" className="hyperlink1 px-1">
              Sign Up Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatlogin;
