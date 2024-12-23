import { useEffect, useState } from "react";
import { deletePostById, getPlantPostByUser } from "../../apis/post.api";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardPostCards = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //post deletion
  const handleDeletePost = async (postId) => {
    // if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePostById(postId);
      setUserPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      toast.success("Post deleted successfully.🌱");
    } catch (err) {
      console.error("Error deleting post:", err);
      toast.error("Failed to delete the post. Please try again.❗");
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
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  // Handle edit post
  const handleEditPost = (postId) => {
    navigate(`/edit-post/${postId}`); // Navigate to the edit page with the post ID
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your documentry...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
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

              <p className="text-neutral-950 mt-2 line-clamp-3 flex-grow">
                {post.aboutPlant}
              </p>

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
    </div>
  );
};

export default DashboardPostCards;
