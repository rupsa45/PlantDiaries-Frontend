import { Search, User2 } from "lucide-react";
import { useState, useEffect } from "react";
import MobileNav from "./MobileNav";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Leaf } from "lucide-react";
import { getUserData, logout } from "../apis/user.api";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [user, setUser] = useState(null); // State to hold user data
  const navigate = useNavigate(); // Initialize the navigate function

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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // Add logic to fetch search results based on searchQuery
  };

  return (
    <div className="bg-[#EAF7EE] text-slate-900 shadow-lg">
      <div className="hidden container mx-auto md:flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <Link to="/" className="flex text-2xl font-serif font-bold items-center space-x-4">
          <Leaf className="text-[#4CA771]  w-10 h-10" />
          <h1 className="text-[#4CA771] ">Plant</h1>Diaries
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 font-mono text-slate-600">
          <Link to="/" className="hover:text-[#4CA771] transition">
            Home
          </Link>
          <Link to="/discover" className="hover:text-[#4CA771] transition">
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
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search plants by location..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-white text-gray-700 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </form>

          {/* Conditional Rendering Based on User Authentication */}
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-[#4CA771] text-white px-4 py-2 rounded-lg hover:bg-[#3A8C5A] transition"
              >
                {user.name || "Profile"} {/* Show user's name if available */}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-[#91d7a6] shadow-lg rounded-md z-50">
                  <Link
                    to="/profile"
                    className="flex gap-1 px-4 py-2 text-gray-700 hover:bg-[#D7F1DE]"
                  >
                    <User2 />
                    Profile
                  </Link>
                  <button onClick={handleLogout}>
                    <Link
                      to="/login"
                      className="w-full text-left px-4 py-2 flex gap-1 text-gray-700 hover:bg-[#D7F1DE]"
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
              className="bg-[#4CA771] text-white px-4 py-2 rounded-lg hover:bg-[#3A8C5A] transition"
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
