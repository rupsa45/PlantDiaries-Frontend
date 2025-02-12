import { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../apis/user.api";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
  });
  const [error, setError] = useState("");
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
    setError("");

    try {
      const response = await signup(
        formData.name,
        formData.email,
        formData.password,
        formData.phoneNumber,
        formData.address,
        formData.city,
        formData.country
      );
      console.log("Full Response:", response); // Debugging
      if (response) {
        navigate("/login");
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      if (error.response) {
        console.log(
          "Error Response:",
          error.response.data.message || "Something went wrong"
        );
        setError(error.response.data.message || "Something went wrong");
      } else {
        console.error("Unhandled Error:", error.message);
        setError(error.message || "Unexpected error");
      }
    }
    }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      <img
        src="/bg.jpeg"
        alt="Leafy background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#EAF9E7] via-transparent to-[#C0E6BA] z-10"></div>

      <div className="max-w-2xl w-full p-8 z-20 shadow-2xl rounded-lg backdrop-blur-sm">
        <h1 className="text-center text-3xl font-extrabold text-[#013237]">
          Create your account
        </h1>
        <p className="text-center text-sm text-[#4CA771] mt-2">
          Join PlantDiaries and start your green journey
        </p>

        {/* Show error message if exists */}
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Info Column */}
            <div className="space-y-3">
              {/* Username Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-neutral-400 w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                  className="w-full pl-10 border border-neutral-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

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
            </div>

            {/* Contact Info Column */}
            <div className="space-y-3">
              {/* Phone Number Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="text-neutral-400 w-5 h-5" />
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full pl-10 border border-neutral-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* City Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="text-neutral-400 w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full pl-10 border border-neutral-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Country Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="text-neutral-400 w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="w-full pl-10 border border-neutral-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
          {/* Address Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="text-neutral-400 w-5 h-5" />
            </div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full pl-10 border border-neutral-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#4CA771] to-[#013237] hover:from-[#013237] hover:to-[#4CA771] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CA771] transition-all duration-300 mt-6"
          >
            Create Account
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          Already have an account?
          <Link
            to="/login"
            className="font-medium underline text-[#4CA771] hover:text-[#013237] transition-colors duration-300 ml-2"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
