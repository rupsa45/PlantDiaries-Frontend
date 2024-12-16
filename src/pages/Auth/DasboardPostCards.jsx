import { useEffect, useState } from "react";
import { getPlantPostByUser } from "../../apis/post.api";
import { Edit, Trash2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DasboardPostCards = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  // Handle post deletion
  const handleDeletePost = async () => {
    try {
      await axios.delete(`/plants/plant-posts/${id}`, {
        withCredentials: true,
      });
      navigate("/plant-posts"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Fetch posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        const response = await getPlantPostByUser();
        setUserPosts(response || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setUserPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);
  const handleEditPost = (post) => {
    console.log("Edit post:", post);
    // Add further logic for editing if needed
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your documentry...</p>
      </div>
    );
  }

  if (userPosts.length === 0) {
    return (
      <div className="no-plants">
        <img src="empty-illustration.png" alt="No plants found" />
        <p>No plants available. Start documenting your plants now!</p>
      </div>
    );
  }
  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-4xl font-bold mb-6 text-[#013237] border-b-2 border-[#013237] pb-4">
        My Plant Postcard Collection
      </h2>

      {userPosts && userPosts.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No plant postcards yet. Start sharing your botanical adventures!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.map((post) => (
            <div
              key={post._id}
              className="bg-[#EAF9E7] rounded-xl shadow-md overflow-hidden hover:scale-105"
            >
              <img
                src={post.image}
                alt={post.plantName}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-bold text-[#013237] mb-2">
                  {post.plantName}
                </h3>

                <p className="text-neutral-950 mt-2 line-clamp-3 flex-grow">{post.aboutPlant}</p>

                <div className="flex justify-between items-center">
                
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex space-x-2">
                    {/* Edit and Delete Buttons */}
                    <button
                      onClick={() => handleEditPost(post._id)}
                      className="text-green-600 hover:bg-green-100 p-2 rounded-full"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default DasboardPostCards;