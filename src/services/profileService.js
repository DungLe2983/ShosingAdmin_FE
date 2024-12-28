import axios from "axios";

const API_URL = "http://localhost:8080/api/users/profile";

export const getProfile = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
};

export const updateProfile = async (profileData, token) => {
  try {
    const response = await axios.put(API_URL, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};

export const getAddresses = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/users/addresses",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      }
    );
    return response.data; // Assuming the API returns a list of addresses
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    throw new Error("Unable to fetch addresses");
  }
};
