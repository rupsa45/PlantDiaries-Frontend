import React, { useState, useEffect } from "react";
import { Book, UserCircle, Pencil, Save, PenTool, MapPin, Flower, Mail } from 'lucide-react';
import { getUserData } from "../apis/user.api";
import PlantCardGrid from "../Components/PlantCardGrid";

function BookProfileDashboard() {
  const [activeTab, setActiveTab] = useState("postcards");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    plantJournalIntro: "A collection of botanical memories and green adventures.",
  });

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData();
        if (response) {
          setUserData({...response, plantJournalIntro: response.plantJournalIntro || "A collection of botanical memories and green adventures."});
        } else {
          console.error("No user data received.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle profile editing submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Add actual submission logic here
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
    <div className="min-h-screen bg-[#F4ECD8] flex items-center justify-center p-6 font-serif">
      <div className="w-full max-w-5xl flex shadow-2xl rounded-2xl overflow-hidden">
        {/* Book Cover / Sidebar */}
        <div className="w-1/4 bg-[#8B4513] text-[#F4ECD8] p-8 flex flex-col justify-between">
          <div>
            <Flower className="w-16 h-16 mb-6 text-[#F4ECD8]" />
            <h1 className="text-3xl font-bold mb-4">Plant Journal</h1>
            <nav className="space-y-4">
              <button 
                onClick={() => setActiveTab("postcards")}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeTab === "postcards" 
                    ? "bg-[#D2691E] text-white" 
                    : "hover:bg-[#A0522D] text-[#F4ECD8]"
                }`}
              >
                <Flower className="inline-block mr-2" /> My Plant Postcards
              </button>
              <button 
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeTab === "profile" 
                    ? "bg-[#D2691E] text-white" 
                    : "hover:bg-[#A0522D] text-[#F4ECD8]"
                }`}
              >
                <UserCircle className="inline-block mr-2" /> Personal Details
              </button>
            </nav>
          </div>
          <div className="text-sm opacity-75">
            © 2024 Botanical Memories
          </div>
        </div>

        {/* Page Content */}
        <div className="w-3/4 bg-[#F4ECD8] p-12">
          {activeTab === "postcards" && (
            <div className="relative">
              <h2 className="text-4xl font-bold mb-6 text-[#8B4513] border-b-2 border-[#8B4513] pb-4">
                My Plant Postcard Collection
              </h2>
              
              <div className="mb-6">
                <label 
                  htmlFor="plantJournalIntro" 
                  className="block text-[#8B4513] font-semibold mb-2"
                >
                  Collection Description
                </label>
                <textarea
                  id="plantJournalIntro"
                  name="plantJournalIntro"
                  value={userData.plantJournalIntro}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  className={`w-full p-3 border-b-2 bg-transparent text-[#8B4513] 
                    ${isEditing 
                      ? "border-[#8B4513] focus:outline-none" 
                      : "border-transparent"
                    }`}
                />
              </div>

              <PlantCardGrid />
            </div>
          )}

          {activeTab === "profile" && (
            <div className="relative">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="absolute top-0 right-0 bg-[#8B4513] text-[#F4ECD8] p-2 rounded-full hover:bg-[#A0522D] transition-colors"
              >
                {isEditing ? <Save /> : <Pencil />}
              </button>
              
              <h2 className="text-4xl font-bold mb-6 text-[#8B4513] border-b-2 border-[#8B4513] pb-4">
                Personal Details
              </h2>

              <form onSubmit={handleProfileSubmit} className="space-y-6">
                {[
                  { label: "Full Name", name: "name", icon: <UserCircle /> },
                  { label: "Email Address", name: "email", type: "email", icon: <Mail /> },
                  { label: "Phone Number", name: "phoneNumber", icon: <UserCircle /> },
                  { label: "Home Address", name: "address", icon: <MapPin /> },
                  { label: "City", name: "city", icon: <MapPin /> },
                  { label: "Country", name: "country", icon: <MapPin /> },
                ].map(({ label, name, type = "text", icon }) => (
                  <div key={name} className="space-y-2">
                    <label 
                      htmlFor={name} 
                      className="flex items-center text-[#8B4513] font-semibold"
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
                      className={`w-full p-3 border-b-2 bg-transparent text-[#8B4513] 
                        ${isEditing 
                          ? "border-[#8B4513] focus:outline-none" 
                          : "border-transparent"
                        }`}
                    />
                  </div>
                ))}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookProfileDashboard;