import { useState,useEffect } from "react";
import { Search, Menu, X, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getUserData, logout } from "../apis/user.api";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData();
        if (response && response.name) {
          setUser(response);
          console.log("User state after update: ", response);
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

  const handleLogout = async () => {
    try {
      const response = await logout();
      setUser(null);
      console.log("Logout successful");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // Add logic to fetch search results based on `searchQuery`
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-[#EAF7EE] text-slate-900 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 mobile-nav">
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          <h1 className="text-[#4CA771]">Plant</h1> Diaries
        </Link>

        {/* Menu Toggle Button */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? (
              <X className="h-8 w-8" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute z-20 w-full bg-[#EAF7EE] shadow-lg">
          <nav className="flex flex-col space-y-4 p-6">
            {/* Navigation Links */}
            <Link
              to="/"
              className="hover:text-[#4CA771] transition text-xl"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/discover"
              className="hover:text-[#4CA771] transition text-xl"
              onClick={toggleMenu}
            >
              Discover
            </Link>
            {user && (
            <Link
              to="/plant-diary-form"
              className="hover:text-[#4CA771] transition text-xl"
            >
              Add Plant Post
            </Link>
          )}

            {/* Search Bar */}
            <div className="relative mt-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search plants..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="bg-white text-gray-700 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </form>
            </div>

            {/* Conditional Rendering Based on Authentication */}
            {user ? (
              <div>
                <button
                  onClick={toggleDropdown}
                  className="bg-[#4CA771] text-white px-4 py-3 rounded-lg hover:bg-[#3A8C5A] transition text-center w-full text-xl"
                >
                  {user.name || "Profile"}
                </button>
                {isDropdownOpen && (
                  <div className="flex flex-col space-y-2 mt-2">
                    <Link
                      to="/profile"
                      className="bg-[#4CA771] text-white px-4 py-3 rounded-lg hover:bg-[#3A8C5A] transition text-center w-full text-xl"
                      onClick={toggleMenu}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-[#4CA771] text-white px-4 py-3 rounded-lg hover:bg-[#3A8C5A] transition text-center w-full text-xl"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#4CA771] text-white px-4 py-3 rounded-lg hover:bg-[#3A8C5A] transition text-center text-xl"
                onClick={toggleMenu}
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
