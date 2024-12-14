import React, { useState, useEffect } from "react";
import PlantCardGrid from "../../Components/PlantCardGrid";
import { getUserData } from "../../apis/user.api";

function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
  });

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData();
        if (response) {
          setUserData(response);
        } else {
          console.error("No user data received.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle profile editing submission (if needed)
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Submit logic (if needed in the future)
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-transparent to-green-100 flex flex-col items-center p-6">
      {/* Navigation Tabs */}
      <div className="max-w-2xl mb-6 flex space-x-4">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === "profile"
              ? "bg-green-600 text-white shadow-md"
              : "bg-white text-green-600 border border-green-600 hover:bg-green-50"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === "posts"
              ? "bg-green-600 text-white shadow-md"
              : "bg-white text-green-600 border border-green-600 hover:bg-green-50"
          }`}
        >
          My Posts
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-green-900 mb-6">
            Your Profile
          </h2>
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            {[ // Profile fields
              { label: "Name", name: "name", icon: "👤" },
              { label: "Email", name: "email", type: "email", icon: "✉️" },
              { label: "Phone Number", name: "phoneNumber", icon: "📱" },
              { label: "Address", name: "address", icon: "🏠" },
              { label: "City", name: "city", icon: "🏙️" },
              { label: "Country", name: "country", icon: "🌍" },
            ].map(({ label, name, type = "text", icon }) => (
              <div key={name} className="flex items-center space-x-4">
                <span className="text-2xl w-10">{icon}</span>
                <div className="flex-grow">
                  <label
                    htmlFor={name}
                    className="block text-sm font-medium text-green-900 mb-2"
                  >
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={userData[name]}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg text-sm transition-all duration-300 ${
                      isEditing
                        ? "border-green-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        : "border-gray-200 bg-gray-100 cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>
            ))}
          </form>
        </div>
      )}

      {/* Posts Tab */}
      {activeTab === "posts" && <PlantCardGrid />}
    </div>
  );
}

export default ProfileDashboard;
