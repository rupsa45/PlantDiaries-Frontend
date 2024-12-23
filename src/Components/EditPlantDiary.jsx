import { useState, useEffect } from 'react';
import { Leaf, MapPin, Tag, FileText, Image as ImageIcon, X } from 'lucide-react';
import { editPost } from '../apis/post.api';
import { toast } from 'react-toastify';
import axios from 'axios';
const WEATHER_API = import.meta.env.VITE_WEATHERAPI_KEY;

const EditPlantDiary = ({ existingPost }) => {
  const [formData, setFormData] = useState({
    plantName: '',
    aboutPlant: '',
    placeName: '',
    tags: '',
    image: null,
    latitude: null,
    longitude: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (name === "placeName" && value.trim().length > 2) {
        try {
          const response = await axios.get(
            `https://api.weatherapi.com/v1/search.json`,
            {
              params: {
                key: `${WEATHER_API}`,
                q: value,
              },
            }
          );
          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            setFormData((prev) => ({
              ...prev,
              latitude: lat,
              longitude: lon,
            }));
            setLocationError(""); // Clear any error if successful
          } else {
            setLocationError("No location found for the entered place name.");
          }
        } catch (error) {
          setLocationError("Error fetching coordinates. Please try again.");
          console.error("Error fetching coordinates:", error.message);
        }
      }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prevState => ({
      ...prevState,
      image: null
    }));
    setImagePreview(null);
  };

  const handleSubmit = async (e,postId) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await editPost(postId,formData);
      if (res) {
        toast.success("Diary updated successfully🌱")
        setFormData({
          plantName: "",
          aboutPlant: "",
          tags: "",
          placeName: "",
          latitude: null,
          longitude: null,
          image: []
        });
      }
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error("Error while updating!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-2xl w-full space-y-6 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-800">Edit Plant Diary</h2>
          <p className="mt-2 text-sm text-green-600">Update your {`plant's`} journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ImageIcon className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Plant Image</span>
            </div>
            
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Plant preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-2">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <span className="text-green-500">Upload an image</span> or drag and drop
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Plant Name */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Leaf className="h-5 w-5 text-green-500" />
            </div>
            <input
              type="text"
              name="plantName"
              value={formData.plantName}
              onChange={handleChange}
              placeholder="Plant Name (e.g., Monstera Deliciosa)"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* About Plant */}
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <FileText className="h-5 w-5 text-green-500" />
            </div>
            <textarea
              name="aboutPlant"
              value={formData.aboutPlant}
              onChange={handleChange}
              placeholder="About your plant (e.g., Growing well, new leaf unfurling...)"
              rows="4"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Place Name */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-green-500" />
            </div>
            <input
              type="text"
              name="placeName"
              value={formData.placeName}
              onChange={handleChange}
              placeholder="Location (e.g., Living Room Window)"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Tags */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag className="h-5 w-5 text-green-500" />
            </div>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Tags (e.g., #indoorplant #easycare #lowlight)"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlantDiary;