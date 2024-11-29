// src/components/OTPVerification.js
import React, { useState } from "react";
import { auth } from "./firebase";
import { PhoneAuthProvider, signInWithCredential } from "@firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { phone, verificationId } = location.state;

  const verifyOTP = () => {
    setLoading(true);
    const credential = PhoneAuthProvider.credential(verificationId, otp);

    signInWithCredential(auth, credential)
      .then(() => {
        setLoading(false);
        alert("Login successful!");
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        alert(`Invalid OTP. Please try again. Error: ${error.message}`);
      });
  };

  return (
    <div className="otp-container">
      <h2>OTP Verification</h2>
      <p>Enter the OTP sent to {phone}</p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength="6"
      />
      <button onClick={verifyOTP} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
};

export default OTPVerification;
