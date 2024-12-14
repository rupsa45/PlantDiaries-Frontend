import { Link, useNavigate } from "react-router-dom";
import { forgetPass } from "../../apis/user.api";
import { useState } from "react";

const ForgetOtp = () => {
  const [email, setEmail] = useState(""); 
  const [error, setError] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await forgetPass(email);
      if (response && response.success) {
        navigate('/reset-password')
      }
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
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
      <div className="max-w-md w-full space-y-8  bg-opacity-80 p-10 rounded-xl shadow-2xl relative z-20 backdrop-blur-sm">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-[#013237]">
            Forgot Password?
          </h2>
          <p className="mt-2 text-center text-sm text-[#4CA771]">
            Enter your email to receive a one-time password
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#C0E6BA] placeholder-[#4CA771] text-[#013237] focus:outline-none focus:ring-[#4CA771] focus:border-[#4CA771] focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#4CA771] to-[#013237] hover:from-[#013237] hover:to-[#4CA771] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CA771] transition-all duration-300"
            >
              Send OTP
            </button>
          </div>
          {error && <p className="text-red-600 text-center">{error}</p>}
        </form>
        {/* Option to go back to login */}
        <div className="text-center">
          <Link to="/login" className="text-[#4CA771] hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetOtp;
