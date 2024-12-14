import React, { useState } from 'react';
import { 
  Leaf, 
  MapPin, 
  Calendar, 
  User, 
  Tags, 
  Mail, 
  Globe,
  ArrowLeft,
  ArrowRight 
} from 'lucide-react';

const MobileDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Plant data object for easy modification
  const plantData = {
    name: "Monstera Deliciosa",
    subtitle: "Tropical Wonder",
    imageSrc: "https://tools-api.webcrumbs.org/image-placeholder/400/300/plants/1",
    creator: "Emily Botanica",
    createdDate: "2024-03-15",
    description: `The Monstera Deliciosa, often called the Swiss Cheese Plant, 
      is a stunning tropical species known for its distinctive 
      split leaves and impressive growth. Native to the rainforests 
      of Central America, it's become a beloved houseplant worldwide.`,
    habitat: {
      region: "Tropical Rainforests",
      location: "Southern Mexico to Panama"
    },
    categories: ["Indoor", "Tropical", "Large Leaves"],
    contact: "emily.botanica@plantsworld.com"
  };

  const totalPages = 3;

  const nextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex justify-center items-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden 
          flex flex-col md:flex-row relative">
          {/* Mobile Navigation */}
          <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              className={`
                p-2 rounded-full bg-white/80 shadow-md
                ${currentPage === 1 ? 'text-gray-300' : 'text-[#4CA771]'}
              `}
            >
              <ArrowLeft />
            </button>
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
              className={`
                p-2 rounded-full bg-white/80 shadow-md
                ${currentPage === totalPages ? 'text-gray-300' : 'text-[#4CA771]'}
              `}
            >
              <ArrowRight />
            </button>
          </div>

          {/* Page 1 - Mobile & Desktop */}
          <div className={`
            w-full md:w-1/2 p-6 md:p-8 
            ${currentPage === 1 
              ? 'block opacity-100' 
              : 'hidden md:block md:opacity-100'
            }`}
          >
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-[#013237] mb-2">
                  {plantData.name}
                </h1>
                <p className="text-gray-600">{plantData.subtitle}</p>
              </div>

              <img
                className="w-full h-[250px] md:h-[300px] object-cover rounded-lg shadow-md"
                src={plantData.imageSrc}
                alt={plantData.name}
              />

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-[#4CA771]" />
                  <span className="font-semibold">{plantData.creator}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#4CA771]" />
                  <span>{plantData.createdDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Page 2 - Mobile & Desktop */}
          <div className={`
            w-full md:w-1/2 p-6 md:p-8 md:border-l
            ${currentPage === 2 
              ? 'block opacity-100' 
              : 'hidden md:block md:opacity-100'
            }`}
          >
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#013237] flex items-center">
                <Leaf className="w-6 h-6 mr-2 text-[#4CA771]" />
                About the Plant
              </h2>
              <p className="text-neutral-800 leading-relaxed">
                {plantData.description}
              </p>

              <div>
                <h3 className="text-lg font-bold text-[#013237] mb-2">
                  Habitat
                </h3>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#4CA771]" />
                  <div>
                    <p className="font-semibold">{plantData.habitat.region}</p>
                    <p className="text-sm text-gray-600">{plantData.habitat.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#013237] mb-2">
                  Categories
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {plantData.categories.map((category, index) => (
                    <span 
                      key={index} 
                      className="bg-[#4CA771] text-white rounded-full px-3 py-1 text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Page 3 - Mobile & Desktop */}
          <div className={`
            w-full md:w-1/2 p-6 md:p-8 md:border-l
            ${currentPage === 3 
              ? 'block opacity-100' 
              : 'hidden md:block md:opacity-100'
            }`}
          >
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#013237] flex items-center">
                <Globe className="w-6 h-6 mr-2 text-[#4CA771]" />
                Native Region
              </h2>
              <div className="w-full h-[250px] bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDmmzMB0uQreWkfz_4_ezMdTL-Pz8pT_3o&q=Southern+Mexico+Rainforests"
                  allowFullScreen
                  loading="lazy"
                  title="Native Habitat"
                />
              </div>

              <div className="border-t pt-4 mt-4 border-neutral-200">
                <h3 className="text-lg font-bold text-[#013237] mb-2 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-[#4CA771]" />
                  Contact Creator
                </h3>
                <a 
                  href={`mailto:${plantData.contact}`} 
                  className="text-[#4CA771] hover:underline"
                >
                  {plantData.contact}
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Page Navigation */}
          <div className="hidden md:flex absolute bottom-4 left-0 right-0 justify-center space-x-4">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              className={`
                p-2 rounded-full 
                ${currentPage === 1 ? 'text-gray-300' : 'text-[#4CA771] hover:bg-[#4CA771]/10'}
              `}
            >
              <ArrowLeft />
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
              className={`
                p-2 rounded-full 
                ${currentPage === totalPages ? 'text-gray-300' : 'text-[#4CA771] hover:bg-[#4CA771]/10'}
              `}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDetail;