import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import {login, verifyEmailAfterLogin } from '../../apis/user.api'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [userId, setUserId] = useState();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response= await login(formData.email,formData.password);
      
    if (response.success) {
      const { userId, isAccountVerified } = response;
      localStorage.setItem("userId", userId);
      if (!isAccountVerified) {
        const otpResponse = await verifyEmailAfterLogin(userId);
        if (otpResponse.success) {
          setUserId(userId);
          navigate("/verify-account");
        } else {
          alert("Failed to send OTP. Please try again.");
        }
      } else {
        navigate("/");
      }
    } else {
      console.log(response.message || "Login failed.");
    }
    } catch (error) {
      console.log("error in login:",error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden"
      
    >
      <img
        src="/bg.jpeg"
        alt="Leafy background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#EAF9E7] via-transparent to-[#C0E6BA] z-10"></div>

      <div className="max-w-md w-full  p-8 z-20  shadow-2xl rounded-lg backdrop-blur-sm">
        <h1 className="text-center text-3xl font-extrabold text-[#013237]">
          Welcome back
        </h1>
        <p className="text-center text-sm text-[#4CA771] mt-2">
          Log in to your PlantDiaries account
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-neutral-400 w-5 h-5" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full pl-10 border border-neutral-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-neutral-400 w-5 h-5" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-10 border border-neutral-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-otp" className="font-medium text-[#4CA771] hover:text-[#013237] transition-colors duration-300">
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            to="/login"
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#4CA771] to-[#013237] hover:from-[#013237] hover:to-[#4CA771] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CA771] transition-all duration-300"
          >
            Sign in
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          {`Don't`} have an account?
          <Link
            to="/signup"
            className="font-medium underline text-[#4CA771] hover:text-[#013237] transition-colors duration-300"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
