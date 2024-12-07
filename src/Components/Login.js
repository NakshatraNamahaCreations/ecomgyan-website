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
  const [user, setUser] = useState(null);

  const userdata = localStorage.getItem("user");
  console.log("userdata", userdata);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible", callback: onSignup },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to send OTP. Please try again.");
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
        VerifyFromServer();
        toast.success("Otp verified!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Invalid OTP, please try again.");
        setLoading(false);
      });
  }

  async function VerifyFromServer() {
    try {
      const cleanedPhoneNumber = ph.startsWith("91") ? ph.slice(2) : ph;

      const config = {
        url: "/users/auth/firebaselogin",
        method: "post",
        baseURL: "http://localhost:8082/api",
        headers: { "Content-Type": "application/json" },
        data: {
          phoneNumber: cleanedPhoneNumber,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        console.log("Success");
        localStorage.setItem("token", response.data.token);
        window.location.assign("/asin-code");
        setUser(response.data);
        setLoading(false);
      } else {
        window.location.assign("/signup");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify. Please complete the steps.");
      setLoading(false);
      window.location.assign("/signup");
    }
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {user ? (
        <h2 className="text-center text-white font-medium text-2xl">
          👍 Login Success
        </h2>
      ) : (
        <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
          <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
            Welcome to <br /> Proleverage
          </h1>
          {showOTP ? (
            <>
              <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                <BsFillShieldLockFill size={30} />
              </div>
              <label className="font-bold text-xl text-white text-center">
                Enter your OTP
              </label>
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
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Verify OTP</span>
              </button>
            </>
          ) : (
            <>
              <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                <BsTelephoneFill size={30} />
              </div>
              <label className="font-bold text-xl text-white text-center">
                Verify your phone number
              </label>
              <PhoneInput country={"in"} value={ph} onChange={setPh} />
              <button
                onClick={onSignup}
                className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Send OTP</span>
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
};
export default Login;
