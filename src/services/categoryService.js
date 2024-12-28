import axios from "axios";

const API_URL = "http://localhost:8080/api/categories";

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách categories", error);
    throw error;
  }
};

export const createCategory = async (data, token) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo mới category", error);
    throw error;
  }
};

export const updateCategory = async (id, data, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật category", error);
    throw error;
  }
};

export const deleteCategory = async (id, token) => {
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

// Hàm lấy thông tin chi tiết một category
export const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin category", error);
    throw error;
  }
};

// Hàm lấy tất cả sản phẩm trong một category
export const getProductsByCategoryId = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/${categoryId}/products`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm trong category", error);
    throw error;
  }
};
