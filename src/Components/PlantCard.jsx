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
    //hover:scale-[1.02]
    <div
      className="bg-white shadow-md rounded-xl 
      w-full sm:w-[280px] 
      flex flex-col 
      overflow-hidden 
      transform transition-all duration-100 
      hover:shadow-lg"
    >
      <div className="relative h-36 bg-neutral-200 overflow-hidden">
        <img
          src={image}
          alt={plantName}
          className="w-full h-full object-cover rounded-t-lg 
            transform hover:scale-110 transition-transform duration-300"
        />
        <button
          onClick={handleShare}
          className="absolute top-3 right-3 
          p-1.5 bg-white/80 rounded-full 
          shadow-md text-gray-600 
          hover:bg-white hover:text-[#4CA771] 
          transition-colors"
          aria-label="Share Post"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-[#013237] line-clamp-1 mb-1">
          {plantName}
        </h2>
        
        <div className="flex items-center gap-1.5 text-gray-600 text-xs mb-2">
          <MapPin className="w-3.5 h-3.5 text-[#4CA771]" />
          <span className="truncate font-semibold ">{placeName}</span>
        </div>
        
        <p className="text-neutral-800 font-serif line-clamp-2 mb-2 flex-grow">
          {aboutPlant}
        </p>
        
        <Link 
          to="/detail" 
          className="text-[#4CA771] text-xs 
          underline self-start hover:text-[#3A8C5A] 
          mb-2 inline-block"
        >
          Read More
        </Link>
        
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#4CA771]/10 text-[#4CA771] 
              text-[10px] rounded-full px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-[10px] text-gray-400 mt-2 text-right">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PlantCard;