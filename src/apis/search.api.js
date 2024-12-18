// /api/plants/plant-posts/search/${placeName}

import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const searchPosts = async (placeName) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/plants/plant-posts/search/${placeName}`
    );

    return response.data;
  } catch (error) {
    console.error("Error searching books:", error);
    throw error; // Forward error for UI handling
  }
};