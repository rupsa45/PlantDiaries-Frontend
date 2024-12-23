import  { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { resetPassword } from "../../apis/user.api";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(
        formData.email,
        formData.otp,
        formData. newPassword
      );
      if (response.success) {
        navigate("/");
      }else {
        console.log(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      console.log("An error occurred during login",error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      <img
        src="/bg.jpeg"
        alt="Leafy background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#EAF9E7] via-transparent to-[#C0E6BA] z-10"></div>

      <div className="max-w-md w-full  p-8 z-20  shadow-2xl rounded-lg backdrop-blur-sm">
        <h1 className="text-center text-3xl font-extrabold text-[#013237]">
          Reset your password
        </h1>

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
              placeholder="Enter your Email"
              required
              className="w-full pl-10 border border-neutral-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-neutral-400 w-5 h-5" />
            </div>
            <input
              type="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter your otp"
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
              type="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter your newPassword"
              required
              className="w-full pl-10 border border-neutral-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <button
            to="/login"
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#4CA771] to-[#013237] hover:from-[#013237] hover:to-[#4CA771] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CA771] transition-all duration-300"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
