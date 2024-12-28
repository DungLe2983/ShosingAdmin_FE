import axios from "axios";

export const getAllOrders = async () => {
  try {
    const response = await axios.get("https://localhost:44392/api/Order");
    return response.data;
  } catch (error) {
    console.log("Failed to fetch Order", error);
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await axios.delete(
      `https://localhost:44392/api/Order/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to delete Order", error);
  }
};

export const updateOrderStatus = async (orderId, status, existingData) => {
  try {
    const response = await axios.put(
      `https://localhost:44392/api/Order/${orderId}`,
      {
        ...existingData, // Giữ nguyên tất cả các trường cũ
        status: status, // Cập nhật trường status
      }
    );
    return response.data;
  } catch (error) {
    console.log("Failed to update order status", error);
  }
};
