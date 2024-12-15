import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createPlantPost = async (formData) => {
  try {
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "image") {
        formData.image.forEach((image) => {
          formDataToSubmit.append("image", image);
        });
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    const response = await axios.post(`${API_BASE_URL}/plants/plant-posts`,formDataToSubmit,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    if (response.data.success) {
      console.log("Diary submitted successfully:", response.data);
    } else {
      console.error("Error submitting diary:", response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("Submission error:", error.message);
  }
};

export const getPlantPostById = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/plants/plant-posts`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("An error occurred while fetching the post", error);
  }
};


export const getAllPost = async()=>{
  try {
    const response = await axios.get(
      `${API_BASE_URL}/plants/all-posts`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("An error occurred while fetching the post", error);
  }
}