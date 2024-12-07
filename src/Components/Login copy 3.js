import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  // Check if user exists
  async function checkUser() {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8082/api/auth/check-user",
        {
          phoneNumber: ph,
        }
      );

      // If user exists, show OTP screen
      setShowOTP(true);
      toast.success(response.data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 404) {
        // If user doesn't exist, redirect to signup
        window.location.assign("/signup");
      } else {
        console.error("Error checking user:", error);
        toast.error("An error occurred. Please try again.");
      }
    }
  }

  // Verify OTP function
  async function onOTPVerify() {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8082/api/auth/verify-otp",
        {
          phoneNumber: ph,
          otp,
        }
      );

      localStorage.setItem("token", response.data.token);
      window.location.assign("/asin-code");
      setLoading(false);
      toast.success("Login Successful!");
    } catch (error) {
      setLoading(false);
      console.error("Error verifying OTP:", error);
      toast.error("Invalid or expired OTP. Please try again.");
    }
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {showOTP ? (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Enter OTP
            </h1>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="otp-container"
            />
            <button
              onClick={onOTPVerify}
              className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Verify Phone Number
            </h1>
            <PhoneInput country={"in"} value={ph} onChange={setPh} />
            <button
              onClick={checkUser}
              className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
              disabled={loading}
            >
              {loading ? "Loading..." : "Send OTP"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
