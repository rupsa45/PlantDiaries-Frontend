import  { useEffect, useState } from "react";
import {
  Leaf,
  MapPin,
  Calendar,
  User,
  Mail,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { getPlantPostById } from "../apis/post.api";
import { useParams } from "react-router-dom";
const MobileDetail = () => {
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
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!plantPost) {
    return <div className="text-center">No plant post found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex justify-center items-center p-4">
      <div className="w-full max-w-4xl">
        <div
          className="bg-white shadow-2xl rounded-2xl overflow-hidden 
          flex flex-col md:flex-row relative"
        >
          <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-full bg-white/80 shadow-md ${
                currentPage === 1 ? "text-gray-300" : "text-[#4CA771]"
              }`}
            >
              <ArrowLeft />
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full bg-white/80 shadow-md ${
                currentPage === totalPages ? "text-gray-300" : "text-[#4CA771]"
              }`}
            >
              <ArrowRight />
            </button>
          </div>

          {/* Page 1 */}
          <div
            className={`w-full md:w-1/2 p-6 md:p-8 ${
              currentPage === 1
                ? "block opacity-100"
                : "hidden md:block md:opacity-100"
            }`}
          >
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-[#013237] mb-2">
                  {plantPost.plantName || "Unknown Plant"}
                </h1>
              </div>
              <img
                className="w-full h-[250px] md:h-[300px] object-cover rounded-lg shadow-md"
                src={plantPost.image || "placeholder.jpg"}
                alt={plantPost.plantName || "Plant Image"}
              />
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-[#4CA771]" />
                  <span className="font-semibold">
                    {plantPost.createdBy?.name || "Unknown Plant"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#4CA771]" />
                  <span>
                    {plantPost.createdAt
                      ? new Date(plantPost.createdAt).toLocaleDateString()
                      : "Unknown Date"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Page 2 */}
          <div
            className={`w-full md:w-1/2 p-6 md:p-8 md:border-l ${
              currentPage === 2
                ? "block opacity-100"
                : "hidden md:block md:opacity-100"
            }`}
          >
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#013237] flex items-center">
                <Leaf className="w-6 h-6 mr-2 text-[#4CA771]" />
                About the Plant
              </h2>
              <p className="text-neutral-800 leading-relaxed">
                {plantPost.aboutPlant || "No information available."}
              </p>
              <div>
                <h3 className="text-lg font-bold text-[#013237] mb-2">
                  Habitat
                </h3>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#4CA771]" />
                  <div>
                    <p className="text-sm text-gray-600">
                      {plantPost.placeName || "Unknown Place"}
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
                  href={`mailto:${plantPost.createdBy?.email}`}
                  className="text-[#4CA771] hover:underline"
                >
                  {plantPost.createdBy?.email || "No Contact Information"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDetail;
