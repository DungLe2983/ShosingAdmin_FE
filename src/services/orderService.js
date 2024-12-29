import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

export const getUserOrders = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

export const getAllOrders = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (orderId, token) => {
  try {
    const response = await axios.get(`${API_URL}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
};

// Tạo đơn hàng mới
export const createOrder = async (orderData, token) => {
  try {
    const response = await axios.post(API_URL, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (orderId, status, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/${orderId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

// Cập nhật trạng thái thanh toán của đơn hàng
export const updateOrderPaymentStatus = async (
  orderId,
  paymentStatus,
  token
) => {
  try {
    const response = await axios.put(
      `${API_URL}/${orderId}/payment`,
      { paymentStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order payment status:", error);
    throw error;
  }
};
