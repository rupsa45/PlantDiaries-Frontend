import { useEffect, useState } from "react";
import {
  Leaf,
  MapPin,
  Calendar,
  User,
  Mail,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import MobileDetail from "./MobileDetail";
import { getPlantPostById } from "../apis/post.api";
import { useParams } from "react-router-dom";

const Details = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [plantPost, setPlantPost] = useState(null);
  const { id } = useParams();

  const totalPages = 2;
  useEffect(() => {
    const fetchPlantPost = async () => {
      try {
        setLoading(true);
        const post = await getPlantPostById(id);
        setPlantPost(post);
      } catch (err) {
        setError("Failed to fetch plant post.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantPost();
  }, [id]);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!plantPost) {
    return <p>No plant post found.</p>;
  }
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
                  {plantPost.plantName}
                </h1>
                <p className="text-green-400">{plantPost.tags}</p>
              </div>

              <img
                className="w-full h-[300px] object-cover rounded-lg shadow-md"
                src={plantPost.image}
                alt={plantPost.plantName}
              />

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-[#4CA771]" />
                  <span className="font-semibold">Emily Botanica</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#4CA771]" />
                  <span>{new Date(plantPost.createdAt).toLocaleDateString()}</span>
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
                {plantPost.aboutPlant}
              </p>

              <div>
                <h3 className="text-lg font-bold text-[#013237] mb-2">
                  Habitat
                </h3>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#4CA771]" />
                  <div>
                    {/* <p className="font-semibold">Tropical Rainforests</p> */}
                    <p className="text-sm text-gray-600">
                      {plantPost.placeName}
                    </p>
                  </div>
                </div>
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
                  {plantPost.contactEmail}
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
