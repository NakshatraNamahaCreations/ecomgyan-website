import axios from "axios";
import React, { useState } from "react";

function Chatsignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const config = {
        url: "/users/auth/register",
        method: "post",
        baseURL: "https://api.proleverageadmin.in/api",
        headers: { "Content-Type": "application/json" },
        data: {
          name,
          email,
          password,
          phoneNumber,
        },
      };

      const res = await axios(config);

      if (res.status === 200) {
        console.log("User registered:", res.data.message);

        localStorage.setItem("userToken", res.data.token);

        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.assign("/chat");

        alert("Registered successfully");

        // Reset fields or redirect user
        setName("");
        setEmail("");
        setPassword("");
        setphoneNumber("");
      }
    } catch (error) {
      console.log("Error during registration:", error);
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

          <div className="login_heading">Sign Up to Proleverage</div>
          <div className="mt-3">
            <div className="label">Name</div>
            <input
              type="text"
              placeholder="Please Enter Name"
              className="input_box"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <div className="label">Mobile Number</div>
            <input
              type="text"
              placeholder="Please Enter Mobilenumber"
              className="input_box"
              onChange={(e) => setphoneNumber(e.target.value)}
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
          </div>

          <div className="d-flex mt-3">
            <input type="checkbox" />
            <div
              className=""
              style={{
                color: "black",
                fontSize: "14px",
                marginLeft: "10px",
              }}
            >
              I agree with the Privacy Policy and Terms & Conditions
            </div>
          </div>

          <div className="login_button" onClick={submit}>
            Sign Up
          </div>

          <div
            className="text-center d-flex mt-3 justify-content-center mb-3"
            style={{ color: "black", fontSize: "15px" }}
          >
            Already have an account?
            <a href="login" className="hyperlink1 px-1">
              Log In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatsignup;
