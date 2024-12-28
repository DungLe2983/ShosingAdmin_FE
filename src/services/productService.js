import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin sản phẩm", error);
    throw error;
  }
};

// Thêm mới một sản phẩm
export const createProduct = async (data, token) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo mới sản phẩm", error);
    throw error;
  }
};

// Cập nhật thông tin sản phẩm
export const updateProduct = async (productId, data, token) => {
  try {
    const response = await axios.put(`${API_URL}/${productId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm", error);
    throw error;
  }
};

// Thêm biến thể sản phẩm (Product Variation)
export const addProductVariation = async (productId, variationData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/${productId}/variations`,
      variationData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm biến thể sản phẩm", error);
    throw error;
  }
};

// Cập nhật biến thể sản phẩm
export const updateProductVariation = async (
  variationId,
  variationData,
  token
) => {
  try {
    const response = await axios.put(
      `${API_URL}/variations/${variationId}`,
      variationData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật biến thể sản phẩm", error);
    throw error;
  }
};

// Xóa biến thể sản phẩm
export const deleteProductVariation = async (variationId, token) => {
  try {
    const response = await axios.delete(
      `${API_URL}/variations/${variationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa biến thể sản phẩm", error);
    throw error;
  }
};

export const deleteProduct = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa category", error);
    throw error;
  }
};
