// src/components/PhoneLogin.js
import React, { useState } from "react";
import { auth } from "./firebase"; // Make sure the import path is correct
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const PhoneLogin = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const requestOTP = () => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
    setLoading(true);
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {},
          "expired-callback": () => {
            window.recaptchaVerifier = null;
          },
        },
        auth
      );
    }

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, `+91${phone}`, appVerifier)
      .then((confirmationResult) => {
        setLoading(false);
        // Navigate to OTP Verification and pass verificationId
        navigate("/firebaseotp", {
          state: { phone, verificationId: confirmationResult.verificationId },
        });
      })
      .catch((error) => {
        setLoading(false);
        alert(`Error during phone verification: ${error.message}`);
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear(); // Clear recaptcha on error
          window.recaptchaVerifier = null;
        }
      });
  };

  return (
    <div className="login-container">
      <h2>Phone Login</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        maxLength="10"
      />
      <div id="recaptcha-container"></div>
      <button onClick={requestOTP} disabled={loading}>
        {loading ? "Loading..." : "Get OTP"}
      </button>
    </div>
  );
};

export default PhoneLogin;
