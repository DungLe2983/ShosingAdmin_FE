import axios from "axios";

export const getAllUsers = async () => {
  try {
    const response = await axios.get("https://localhost:44392/api/Profile");
    return response.data;
  } catch (error) {
    console.log("Failed to fetch Profile");
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(
      `https://localhost:44392/api/Profile/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to get Profile by ID");
  }
};

export const updateUserById = async (id, data) => {
  try {
    const response = await axios.put(
      `https://localhost:44392/api/Profile/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log("Failed to update Profile");
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(
      `https://localhost:44392/api/Profile/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to delete Profile");
  }
};
