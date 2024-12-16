import { useEffect, useState } from "react";
import PlantCard from "./PlantCard";
import { getAllPost } from "../apis/post.api";
import { Search } from "lucide-react";

const PlantCardGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [plantCards, setPlantCards] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        setLoading(true);
        const res = await getAllPost();
        if (res) {
          setPlantCards(res);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPost();
  }, []);
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading plants...</p>
      </div>
    );
  }

  if (plantCards.length === 0) {
    return (
      <div className="no-plants">
        <p>No plants available. Start documenting your plants now!</p>
      </div>
    );
  }
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // Add logic to fetch search results based on searchQuery
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
                  onChange={handleSearchChange}
                  className="bg-white text-gray-700 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
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
