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
    const fetchAllPosts = async () => {
      try {
        setLoading(true);
        const res = await getAllPost();
        setPlantCards(res || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  const handlePlaceNameChange = async (e) => {
    const placeName = e.target.value.trim();
    setSearchQuery(placeName);

    if (placeName.length < 3) {
      setLocationError("Please enter at least 3 characters.");
      setLatitude(null);
      setLongitude(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json`,
        {
          params: { key: WEATHER_API, q: placeName },
        }
      );

      if (response.data?.length > 0) {
        const { lat, lon } = response.data[0];
        setLatitude(lat);
        setLongitude(lon);
        setLocationError("");
      } else {
        throw new Error("No location found.");
      }
    } catch (error) {
      setLocationError(
        error.message || "Error fetching coordinates. Please try again."
      );
      setLatitude(null);
      setLongitude(null);
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
      setPlantCards(response.posts || []);
      if (!response.posts?.length) {
        setLocationError("No plants found for the given location.");
      } else {
        setLocationError("");
      }
    } catch (error) {
      setLocationError(
        error.message || "Error fetching plant posts. Please try again."
      );
      setPlantCards([]);
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
              {plantCards.map((card, index) => {
                const plantPostId = card._id;
                return (
                  <PlantCard
                    key={index}
                    {...card}
                    plantPostId={plantPostId}
                    onShare={(name) => console.log(`Shared: ${name}`)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCardGrid;
