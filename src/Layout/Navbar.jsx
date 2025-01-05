import {  CircleUserRound, User2 } from "lucide-react";
import { useState, useEffect } from "react";
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";
import { LogOut, Leaf } from "lucide-react";
import { getUserData, logout } from "../apis/user.api";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // State to hold user data

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData();
        if (response && response.name) {
          setUser(response);
          //console.log("User state after update: ", response);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await logout();
      setUser(null);
      console.log("Logout successful");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  return (
    <div className="bg-white/80 backdrop-blur-sm text-slate-900 shadow-xl">
      <div className="hidden container mx-auto md:flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <Link to="/" className="flex text-2xl font-serif font-bold items-center space-x-1">
          <Leaf className="text-[#4CA771]  w-10 h-10" />
          <span className="text-emerald-600 font-medium">Plant</span>Diaries
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 font-serif">
          <Link to="/" className=" text-emerald-700 hover:text-emerald-500  transition">
            Home
          </Link>
          <Link to="/discover" className="ext-emerald-700 hover:text-emerald-500 transition">
            Discover
          </Link>
          {user && (
            <Link
              to="/plant-diary-form"
              className="hover:text-[#4CA771] transition"
            >
              Document Your Plant
            </Link>
          )}
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Conditional Rendering Based on User Authentication */}
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-[#4CA771]/10 text-[#4CA771] flex px-4 py-2 rounded-lg hover:bg-[#9ae1b6] transition"
              >
                <CircleUserRound />
                {user.name || "Profile"} {/* Show user's name if available */}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-[#91d7a6] shadow-lg rounded-md z-50">
                  <Link
                    to="/profile"
                    className="flex gap-1 px-4 py-2 text-gray-700 hover:bg-[#bef1cc]"
                  >
                    <User2 />
                    Profile
                  </Link>
                  <button onClick={handleLogout}>
                    <Link
                      // to="/login"
                      className="w-full text-left px-4 py-2 flex gap-1 text-gray-700 hover:bg-[#bbe8c7]"
                    >
                      <LogOut />
                      Logout
                    </Link>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#4CA771]/10 text-[#4CA771] px-4 py-2 rounded-lg hover:bg-[#3A8C5A] transition"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden focus:outline-none">
        <MobileNav />
      </div>
    </div>
  );
};

export default Navbar;
