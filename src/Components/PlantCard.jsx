import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlantCard = ({ 
  imageSrc, 
  title, 
  location, 
  description, 
  tags = [], 
  postedDate 
}) => {
  return (
    <div className="bg-white shadow rounded-lg 
      w-full sm:w-[300px] 
      flex flex-col justify-between 
      p-4 mb-6 sm:mb-0
      transition-all duration-300 
      hover:shadow-lg">
      <div className="relative h-40 bg-neutral-300 rounded-t-lg overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover rounded-t-lg 
            transform hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="flex-grow flex flex-col">
        <h2 className="text-lg font-bold text-[#013237] mt-4 line-clamp-1">
          {title}
        </h2>
        <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
          <MapPin className="w-4 h-4 text-[#4CA771]" />
          <span>{location}</span>
        </div>
        <p className="text-neutral-950 mt-2 line-clamp-3 flex-grow">
          {description}
        </p>
        <button className="text-[#4CA771] text-sm mt-2 underline self-start hover:text-[#3A8C5A]">
          <Link to='/detail'>
            Read More
          </Link>
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
        Posted on: {postedDate}
      </p>
    </div>
  );
};

export default PlantCard;