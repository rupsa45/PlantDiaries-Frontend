import { useState,useEffect } from "react";
import { Menu, X, CircleUserRound,  LogOut, User2Icon} from "lucide-react";
import { Link} from "react-router-dom";
import { getUserData, logout } from "../apis/user.api";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

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

  const handleLogout = async () => {
    try {
      const response = await logout();
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm text-slate-900 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 mobile-nav">
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          <h1 className="text-[#4CA771]">Plant</h1> Diaries
        </Link>

        {/* Menu Toggle Button */}
        <div className="flex items-center space-x-4 ">
          <button onClick={toggleMenu} className="p-2 rounded-lg hover:bg-emerald-50 transition-colors focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
            {isMenuOpen ? (
              <X className="h-8 w-8" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className=" w-full shadow-lg">
          <nav className="flex flex-col space-y-4 p-6">
            {/* Navigation Links */}
            <Link
              to="/"
              className="hover:text-[#4CA771] transition text-xl font-serif"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/discover"
              className="hover:text-[#4CA771] transition text-xl font-serif"
              onClick={toggleMenu}
            >
              Discover
            </Link>
            {user && (
            <Link
              to="/plant-diary-form"
              className="hover:text-[#4CA771] transition text-xl font-serif"
            >
              Document Your Plant
            </Link>
          )}

            {/* Conditional Rendering Based on Authentication */}
            {user ? (
              <div>
                <button
                  onClick={toggleDropdown}
                  className="bg-[#4CA771]/10 text-[#4CA771] flex gap-1  px-4 py-3 rounded-lg hover:bg-[#9ae1b6] transition text-center w-full text-xl"
                >
                  <CircleUserRound />
                  {user.name || "Profile"}
                </button>
                {isDropdownOpen && (
                  <div className="flex flex-col space-y-2 mt-2">

                    <Link
                      to="/profile"
                      className="bg-[#4CA771]/10 text-[#4CA771] flex gap-1 px-4 py-3 rounded-lg hover:bg-[#9ae1b6] transition text-center w-full text-xl"
                      onClick={toggleMenu}
                    >
                      <User2Icon/>
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-[#4CA771]/10 text-[#4CA771]  flex gap-1 px-4 py-3 rounded-lg hover:bg-[#9ae1b6] transition text-center w-full text-xl"
                    >
                      <LogOut/>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#4CA771]/10 text-[#4CA771] px-4 py-3 flex gap-1 rounded-lg hover:bg-[#3A8C5A] transition text-center text-xl"
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
