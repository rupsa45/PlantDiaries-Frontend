import  { useState, useRef } from "react";
import { Leaf, Image,  BookOpen,  Send, X } from "lucide-react";
import axios from "axios";
const WEATHER_API = import.meta.env.VITE_WEATHERAPI_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PlantDiaryBookForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  const [formData, setFormData] = useState({
    plantName: "",
    aboutPlant: "",
    tags: "",
    category: [],
    contactEmail: "",
    placeName: "",
    latitude: null,
    longitude: null,
    image: [],
  });
  const fileInputRef = useRef(null);
  const [locationError, setLocationError] = useState("");

  const categories = ["Succulents", 
      "Herbs", 
      "Trees", 
      "Flowers", 
      "Indoor Plants",
      "Outdoor Plants",
      "Medicinal Plants",
      "Climbers",
      "Creepers",
      "Desert Plants",
      "Shrubs",
      "Grasses",
      "Fruit Plants",
      "Vegetable Plants",
      "Tropical Plants",
      "Evergreen Plants",
      "Others"];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...newImages]);
    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ...files],
    }));
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "placeName" && value.trim().length > 2) {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/search.json`,
          {
            params: {
              key: `${WEATHER_API}`, // Replace with your API key
              q: value,
            },
          }
        );
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setFormData((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lon,
          }));
          setLocationError(""); // Clear any error if successful
        } else {
          setLocationError("No location found for the entered place name.");
        }
      } catch (error) {
        setLocationError("Error fetching coordinates. Please try again.");
        console.error("Error fetching coordinates:", error.message);
      }
    }
  };

  const toggleCategory = (category) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }));
  };

  const nextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, 3));
  };

  const prevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image") {
          formData.image.forEach((image) => {
            formDataToSubmit.append("image", image);
          });
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        `${API_BASE_URL}/plants/plant-posts`, 
        formDataToSubmit,
        { 
          headers: 
          { 
            "Content-Type": "multipart/form-data" 
          } ,
          withCredentials: true, 
        }
      );

      if (response.data.success) {
        console.log("Diary submitted successfully:", response.data);
      } else {
        console.error("Error submitting diary:", response.data.message);
      }
    } catch (error) {
      console.error("Submission error:", error.message);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif text-[#013237]">
                Start Your Plant Diary
              </h2>
              <p className="text-[#4CA771]">
                Share the story of your green companion
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xl font-serif text-[#013237] mb-2">
                  Name Your Plant Story
                </label>
                <input
                  type="text"
                  name="plantName"
                  value={formData.plantName}
                  onChange={handleInputChange}
                  placeholder="e.g., My Jade Plant's Journey"
                  className="w-full px-4 py-3 border-b-2 border-[#4CA771] bg-transparent text-[#013237] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xl font-serif text-[#013237] mb-2">
                  Upload Plant Photos
                </label>
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 border-dashed border-[#4CA771] rounded-lg p-6 text-center cursor-pointer hover:bg-[#EAF9E7] transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Image className="mx-auto w-12 h-12 text-[#4CA771] mb-4" />
                  <p className="text-[#013237]">Click or drag photos here</p>
                </div>

                {selectedImages.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative w-24 h-24 group">
                        <img
                          src={image}
                          alt={`Plant ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-xl font-serif text-[#013237] mb-2">
                Your Plant's Story
              </label>
              <textarea
                name="aboutPlant"
                value={formData.aboutPlant}
                onChange={handleInputChange}
                rows="6"
                placeholder="Tell us about your plant's journey, care tips, and special memories..."
                className="w-full px-4 py-3 border-2 border-[#4CA771] rounded-lg bg-transparent text-[#013237] focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xl font-serif text-[#013237] mb-2">
                Add Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="#succulents #indoorplants #plantlove"
                className="w-full px-4 py-3 border-b-2 border-[#4CA771] bg-transparent text-[#013237] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xl font-serif text-[#013237] mb-2">
                Select Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`
                      px-4 py-2 rounded-full text-sm transition-all
                      ${
                        formData.category.includes(category)
                          ? "bg-[#4CA771] text-white"
                          : "bg-[#EAF9E7] text-[#013237] border border-[#4CA771]"
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-xl font-serif text-[#013237] mb-2">
                Your Email Address
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                placeholder="example@plantdiaries.com"
                className="w-full px-4 py-3 border-b-2 border-[#4CA771] bg-transparent text-[#013237] focus:outline-none"
              />
            </div>

            <div>
                <label className="block text-xl font-serif text-[#013237] mb-2">
                  Place Name
                </label>
                <input
                  type="text"
                  name="placeName"
                  value={formData.placeName}
                  onChange={handleInputChange}
                  placeholder="Enter the place name"
                  className="w-full px-4 py-3 border-b-2 border-[#4CA771] bg-transparent text-[#013237] focus:outline-none"
                />
                {locationError && (
                  <p className="text-red-500 text-sm mt-2">{locationError}</p>
                )}
              </div>

            <div className="text-center">
              <p className="text-[#013237] mb-4">
                Ready to share your plant's story with the world?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-[#4CA771] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-[#3A8C5A] transition-colors"
                >
                  <Send className="w-5 h-5" /> Publish Diary
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF9E7] to-[#C0E6BA] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden flex">
        {/* Left Page (Book Cover) */}
        <div className="w-1/2 bg-[#013237] text-[#EAF9E7] p-12 flex flex-col justify-center">
          <BookOpen className="w-24 h-24 text-[#4CA771] mx-auto mb-6" />
          <h1 className="text-4xl font-serif text-center mb-4">
            Plant Diaries
          </h1>
          <p className="text-center mb-8">
            Your personal journal of green adventures
          </p>
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  w-3 h-3 rounded-full transition-all
                  ${currentPage === page ? "bg-[#4CA771]" : "bg-[#EAF9E7]/50"}
                `}
              />
            ))}
          </div>
        </div>

        {/* Right Page (Form Content) */}
        <div className="w-1/2 p-12 relative">
          <form className="h-full flex flex-col justify-between">
            <div>{renderPage()}</div>

            <div className="flex justify-between mt-6">
              {currentPage > 1 && (
                <button
                  type="button"
                  onClick={prevPage}
                  className="text-[#013237] flex items-center gap-2 hover:text-[#4CA771] transition-colors"
                >
                  <Leaf className="w-5 h-5" /> Previous
                </button>
              )}
              {currentPage < 3 && (
                <button
                  type="button"
                  onClick={nextPage}
                  className="ml-auto text-[#013237] flex items-center gap-2 hover:text-[#4CA771] transition-colors"
                >
                  Next <Leaf className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlantDiaryBookForm;
