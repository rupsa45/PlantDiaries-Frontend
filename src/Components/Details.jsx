import { useState } from "react";
import {
  Leaf,
  MapPin,
  Calendar,
  User,
  Mail,
  Globe,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import MobileDetail from "./MobileDetail";

const Details = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 3;

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex justify-center items-center p-4">
      <div className="w-full max-w-4xl">
        <div className="hidden bg-white shadow-2xl rounded-2xl overflow-hidden md:flex">
          {/* Left Page */}
          <div
            className={`w-1/2 p-8 transition-all duration-500 
            ${currentPage === 1 ? "opacity-100" : "opacity-0 absolute"}
          `}
          >
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-[#013237] mb-2">
                  Monstera Deliciosa
                </h1>
                <p className="text-gray-600">Tropical Wonder</p>
              </div>

              <img
                className="w-full h-[300px] object-cover rounded-lg shadow-md"
                src="https://tools-api.webcrumbs.org/image-placeholder/400/300/plants/1"
                alt="Monstera Deliciosa"
              />

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-[#4CA771]" />
                  <span className="font-semibold">Emily Botanica</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#4CA771]" />
                  <span>2024-03-15</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Page - Description */}
          <div
            className={`w-1/2 p-8 border-l transition-all duration-500
            ${currentPage === 2 ? "opacity-100" : "opacity-0 absolute"}
          `}
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#013237] flex items-center">
                <Leaf className="w-6 h-6 mr-2 text-[#4CA771]" />
                About the Plant
              </h2>
              <p className="text-neutral-800 leading-relaxed">
                The Monstera Deliciosa, often called the Swiss Cheese Plant, is
                a stunning tropical species known for its distinctive split
                leaves and impressive growth. Native to the rainforests of
                Central America, it's become a beloved houseplant worldwide.
              </p>

              <div>
                <h3 className="text-lg font-bold text-[#013237] mb-2">
                  Habitat
                </h3>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#4CA771]" />
                  <div>
                    <p className="font-semibold">Tropical Rainforests</p>
                    <p className="text-sm text-gray-600">
                      Southern Mexico to Panama
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#013237] mb-2">
                  Categories
                </h3>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-[#4CA771] text-white rounded-full px-3 py-1 text-sm">
                    Indoor
                  </span>
                  <span className="bg-[#4CA771] text-white rounded-full px-3 py-1 text-sm">
                    Tropical
                  </span>
                  <span className="bg-[#4CA771] text-white rounded-full px-3 py-1 text-sm">
                    Large Leaves
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Page - Location & Contact */}
          <div
            className={`w-1/2 p-8 border-l transition-all duration-500
            ${currentPage === 3 ? "opacity-100" : "opacity-0 absolute"}
          `}
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#013237] flex items-center">
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
                  href="mailto:emily.botanica@plantsworld.com"
                  className="text-[#4CA771] hover:underline"
                >
                  emily.botanica@plantsworld.com
                </a>
              </div>
            </div>
          </div>

          {/* Page Navigation */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`
                p-2 rounded-full 
                ${
                  currentPage === 1
                    ? "text-gray-300"
                    : "text-[#4CA771] hover:bg-[#4CA771]/10"
                }
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
                ${
                  currentPage === totalPages
                    ? "text-gray-300"
                    : "text-[#4CA771] hover:bg-[#4CA771]/10"
                }
              `}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
        <div className="md:hidden focus:outline-none">
          <MobileDetail />
        </div>
      </div>
    </div>
  );
};

export default Details;
