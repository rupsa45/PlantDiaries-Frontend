import  { useEffect, useState } from "react";
import { getPlantPostByUser } from "../../apis/post.api";
import { Edit, Trash2 } from "lucide-react";

const DasboardPostCards = () => {
  const [userPosts, setUserPosts] = useState([]);

  // Handle post deletion
  const handleDeletePost = async () => {
    // try {
    //   await deletePlantPost(postId);
    //   setUserPosts((prevPosts) =>
    //     prevPosts.filter((post) => post.id !== postId)
    //   );
    // } catch (error) {
    //   console.error("Error deleting post:", error);
    // }
  };
  
  // Fetch posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await getPlantPostByUser();
        setUserPosts(response || []);
        console.log(response);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setUserPosts([]);
      }
    };

    fetchUserPosts();
  }, []);
  const handleEditPost = (post) => {
    console.log("Edit post:", post);
    // Add further logic for editing if needed
  };
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
              {/* Use 'post.image' instead of 'post.imageUrl' */}
              <img
                src={post.image}
                alt={post.plantName}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                {/* Use 'post.plantName' instead of 'post.title' */}
                <h3 className="text-xl font-bold text-[#013237] mb-2">
                  {post.plantName}
                </h3>

                {/* Use 'post.aboutPlant' instead of 'post.description' */}
                <p className="text-sm text-gray-600 mb-4">{post.aboutPlant}</p>

                <div className="flex justify-between items-center">
                  {/* Display the created date */}
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex space-x-2">
                    {/* Edit and Delete Buttons */}
                    <button
                      onClick={() => handleEditPost(post)}
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
