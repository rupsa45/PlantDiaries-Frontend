import { MapPin, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const PlantCard = ({
  image,
  plantName,
  placeName,
  aboutPlant,
  tags = [],
  createdAt,
  onShare,
}) => {
  const handleShare = () => {
    onShare && onShare(plantName);

    if (navigator.share) {
      navigator
        .share({
          title: plantName,
          text: aboutPlant,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err) => console.error("Failed to copy:", err));
    }
  };
  return (
    <div
      className="bg-white shadow rounded-lg 
      w-full sm:w-[300px] 
      flex flex-col justify-between 
      p-4 mb-6 sm:mb-0
      transition-all duration-300 
      hover:shadow-lg"
    >
      <div className="relative h-40 bg-neutral-300 rounded-t-lg overflow-hidden">
        <img
          src={image}
          alt={plantName}
          className="w-full h-full object-cover rounded-t-lg 
            transform hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-6 right-6 z-10 flex space-x-2">
          <button
            onClick={handleShare}
            className="p-2 bg-white/70 rounded-full shadow-md text-gray-500 hover:bg-gray-100"
            aria-label="Share Post"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-grow flex flex-col">
        <h2 className="text-lg font-bold text-[#013237] mt-4 line-clamp-1">
          {plantName}
        </h2>
        <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
          <MapPin className="w-4 h-4 text-[#4CA771]" />
          <span>{placeName}</span>
        </div>
        <p className="text-neutral-950 mt-2 line-clamp-3 flex-grow">
          {aboutPlant}
        </p>
        <button className="text-[#4CA771] text-sm mt-2 underline self-start hover:text-[#3A8C5A]">
          <Link to="/detail">Read More</Link>
        </button>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#4CA771] text-white text-xs rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-right">
        Posted on: {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PlantCard;
