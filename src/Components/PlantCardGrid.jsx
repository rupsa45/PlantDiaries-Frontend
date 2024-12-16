import { useEffect, useState } from "react";
import PlantCard from "./PlantCard";
import { getAllPost } from "../apis/post.api";
const PlantCardGrid = () => {

  const [plantCards, setPlantCards] = useState([]);
  const [loading,setLoading]=  useState()

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
      }
      finally {
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
  return (
    <div className="w-full px-4 py-8 bg-[#EAF7EE]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
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
  );
};

export default PlantCardGrid;