import React, { useState, useEffect } from "react";
import PlantCardGrid from "../../Components/PlantCardGrid";
import { getUserData } from "../../apis/user.api";
import { Flower, Mail, MapPin, Pencil, Save, UserCircle } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br font-serif from-green-50 via-transparent to-green-100 flex flex-col items-center p-6">
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
          <UserCircle className="inline-block" /> Personal Details
        </button>
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === "posts"
              ? "bg-green-600 text-white shadow-md"
              : "bg-white text-green-600 border border-green-600 hover:bg-green-50"
          }`}
        >
          <Flower className="inline-block mr-2" /> My Plant Postcards
        </button>
      </div>
      {/* bg-[#4CA771] */}
      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="w-full max-w-2xl bg-[#EAF9E7] backdrop-blur-sm rounded-xl shadow-lg p-8">
          <h2 className="text-4xl font-bold mb-6 text-[#013237] border-b-2 border-[#013237] pb-4">
            Personal Details
            <button
              onClick={() => setIsEditing(!isEditing)}
              className=" bg-[#013237] text-[#F4ECD8] p-2 rounded-full hover:bg-[#A0522D] transition-colors"
            >
              {isEditing ? <Save /> : <Pencil />}
            </button>
          </h2>

          <form onSubmit={handleProfileSubmit} className="space-y-3">
            {[
              { label: "Full Name", name: "name", icon: <UserCircle /> },
              {
                label: "Email Address",
                name: "email",
                type: "email",
                icon: <Mail />,
              },
              {
                label: "Phone Number",
                name: "phoneNumber",
                icon: <UserCircle />,
              },
              { label: "Home Address", name: "address", icon: <MapPin /> },
              { label: "City", name: "city", icon: <MapPin /> },
              { label: "Country", name: "country", icon: <MapPin /> },
            ].map(({ label, name, type = "text", icon }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="flex items-center text-[#013237] font-semibold"
                >
                  {icon}
                  <span className="ml-2">{label}</span>
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={userData[name]}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2  rounded-lg text-sm transition-all duration-300 ${
                    isEditing
                      ? "focus:ring-2 focus:ring-green-500 focus:outline-none"
                      : "cursor-not-allowed"
                  }`}
                />
              </div>
            ))}
          </form>
        </div>
      )}

      {/* Posts Tab */}
      {activeTab === "posts" && (
        <div>
          <h2 className="text-4xl font-bold mb-6 text-[#013237] border-b-2 border-[#013237] pb-4">
            My Plant Postcard Collection
          </h2>
          <PlantCardGrid />
        </div>
      )}
    </div>
  );
}

export default ProfileDashboard;
