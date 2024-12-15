import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyAccount } from "../../apis/user.api";

const VerifyAccount = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [status, setStatus] = useState("input"); // 'input', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle OTP input change
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setStatus("error");
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }
    const userId = localStorage.getItem("userId");
    try {
      const response = await verifyAccount(userId, otpCode) // Pass userId to the backend
      console.log(userId,otpCode);
      
      if (response) {
        console.log("Email Verified ");
        setStatus("success");
        navigate("/"); 
      }
    } catch (error) {
      setStatus("error");
     console.log("Verification failed:",error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <img
        src="/bg1.jpeg"
        alt="Leafy background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#EAF9E7] via-transparent to-[#C0E6BA] z-10"></div>

      <div className="max-w-md w-full space-y-8 bg-white/80 p-10 rounded-xl shadow-2xl relative z-20 backdrop-blur-sm">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-[#013237]">
            Verify Your Account
          </h2>
          <p className="text-center text-sm text-[#4CA771] mt-2">
            Enter the OTP sent to your registered email.
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-center text-red-500 bg-red-50 p-3 rounded-md">
            {errorMessage}
          </div>
        )}

        {/* OTP Input */}
        {status === "input" && (
          <form onSubmit={handleOtpVerification} className="space-y-6">
            <div className="flex justify-center space-x-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-12 h-12 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#4CA771] to-[#013237] text-white rounded-md hover:opacity-90 transition-all"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* Loading State */}
        {status === "loading" && (
          <p className="text-center text-[#013237] font-medium">Verifying...</p>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className="text-center">
            <p className="text-green-600 font-semibold">
              Your account has been verified!
            </p>
            <p className="text-sm text-[#4CA771] mt-2">
              Redirecting to the homepage...
            </p>
          </div>
        )}

        {/* Error Retry */}
        {status === "error" && (
          <div className="text-center">
            <button
              onClick={() => setStatus("input")}
              className="text-[#4CA771] hover:underline"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyAccount;
