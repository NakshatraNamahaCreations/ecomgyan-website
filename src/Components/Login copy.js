import React from "react";

function Login() {
  return (
    <div className="row justify-content-center">
      <div
        className="col-md-4 shadow p-4 mt-5"
        style={{ borderRadius: "10px" }}
      >
        <div className="text-center heading">Login</div>

        <div className="">
          <div className="l_label">User Name</div>
          <input
            type="text"
            className="l_input"
            placeholder="Type Your Username"
          />
        </div>

        <div className="mt-3">
          <div className="l_label">Password</div>
          <input
            type="text"
            className="l_input"
            placeholder="Type Your Password"
          />
        </div>
        <div
          className=""
          style={{ textAlign: "right", color: "skyblue", fontSize: "13px" }}
        >
          forgot password?
        </div>
        <div className="l_button">Login</div>
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            marginTop: "15px",
            color: "grey",
          }}
        >
          Or Sign Up Using
        </div>
      </div>
    </div>
  );
}

export default Login;
