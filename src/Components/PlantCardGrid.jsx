import { useEffect, useState } from "react";
import PlantCard from "./PlantCard";
import { getAllPost } from "../apis/post.api";
import { Search } from "lucide-react";
import axios from "axios";
import { searchPosts } from "../apis/search.api";
const WEATHER_API = import.meta.env.VITE_WEATHERAPI_KEY;

const PlantCardGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [plantCards, setPlantCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        setLoading(true);
        const res = await getAllPost();
        if (res) {
          setPlantCards(res);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPost();
  }, []);

  const handlePlaceNameChange = async (e) => {
    const placeName = e.target.value;
    setSearchQuery(placeName);

    if (placeName.trim().length > 2) {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/search.json`,
          {
            params: {
              key: WEATHER_API,
              q: placeName,
            },
          }
        );
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setLatitude(lat);
          setLongitude(lon);
          setLocationError(""); // Clear any error
        } else {
          setLatitude(null);
          setLongitude(null);
          setLocationError("No location found for the entered place name.");
        }
      } catch (error) {
        setLocationError("Error fetching coordinates. Please try again.");
        console.error("Error fetching coordinates:", error.message);
      }
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault(); 
    if (!latitude || !longitude) {
      setLocationError("Please enter a valid place name.");
      return;
    }

    try {
      setLoading(true);
      const response = await searchPosts(searchQuery, latitude, longitude);
      if (response.data.posts) {
        setPlantCards(response.data.posts);
        setLocationError("");
      } else {
        setPlantCards([]);
        setLocationError("No plants found for the given location.");
      }
    } catch (error) {
      setLocationError("Error fetching plant posts. Please try again.");
      console.error("Error fetching plant posts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading plants...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8 bg-gradient-to-br from-[#EAF9E7] to-[#C0E6BA] relative">
      <div className="">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="mb-6 flex justify-center">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search plants by location..."
                  value={searchQuery}
                  onChange={handlePlaceNameChange}
                  className="bg-white text-gray-700 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                {locationError && (
                  <p className="text-red-500 text-sm mt-2">{locationError}</p>
                )}
              </form>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center ">
              {plantCards.map((card, index) => (
                <PlantCard
                  key={index}
                  {...card}
                  onShare={(name) => console.log(`Shared: ${name}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCardGrid;
