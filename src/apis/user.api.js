import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
  }
};

export const signup = async (
  name,
  email,
  password,
  phoneNumber,
  address,
  city,
  country
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      { name, email, password, phoneNumber, address, city, country },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Signup failed", error);
  }
};

export const logout = async () => {
  try {
    await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    console.log("Logged out");
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export const getUserData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/me`, {
      withCredentials: true,
    });
    return response.data.userData;
  } catch (error) {
    console.error("Failed to fetch user data", error);
  }
};

export const forgetPass = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/send-reset-otp`, {
      email,
    });

    if (response.data.success) {
      console.log("OTP sent successfully:", response.data.message);
      return response.data;
    }
  } catch (error) {
    console.error("Error during OTP request", error.message);
  }
};

export const resetPassword = async (email, otp, newPassword) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/reset-password`,
      { email, otp, newPassword },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
  }
};
