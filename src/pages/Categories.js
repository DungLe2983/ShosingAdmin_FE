import React, { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";
import CategoriesForm from "../pages/Forms/CategoriesForm";
import DeleteButton from "../components/DeleteButton";
import toast from "react-hot-toast";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Lấy danh mục từ API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await getCategories();
      setCategories(data.categories);
    } catch (error) {
      toast.error("Không thể tải danh mục");
    } finally {
      setIsLoading(false);
    }
  };

  // Lọc danh sách theo từ khóa tìm kiếm
  useEffect(() => {
    const filtered = categories.filter(
      (category) =>
        category.name &&
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleCreateCategory = () => {
    setEditData(null);
    setIsFormOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditData(category); // Set edit data để chỉnh sửa
    setIsFormOpen(true);
  };

  const confirmDeleteCategory = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const handleSubmitCategory = async (categoryData) => {
    setIsLoading(true);
    try {
      if (!categoryData.name || !categoryData.description) {
        toast.error("Tên và mô tả danh mục không được để trống!");
        return;
      }
      if (editData) {
        // Cập nhật danh mục
        await updateCategory(editData._id, categoryData, token);
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === editData._id
              ? { ...category, ...categoryData }
              : category
          )
        );
        toast.success("Danh mục được cập nhật thành công");
      } else {
        const newCategory = await createCategory(categoryData, token);
        if (newCategory) {
          // setCategories((prevCategories) => [...prevCategories, newCategory]);
          fetchCategories();
          toast.success("Danh mục được tạo mới thành công");
        } else {
          toast.error("Dữ liệu danh mục không hợp lệ");
        }
      }
    } catch (error) {
      console.error("Error during category submission:", error); // Log lỗi nếu có
      toast.error("Không thể lưu danh mục");
    } finally {
      setIsFormOpen(false);
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (_id) => {
    try {
      const id = selectedCategory._id;
      await deleteCategory(id, token);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
      toast.success("Danh mục đã được xóa thành công");
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("Không thể xóa danh mục. Vui lòng thử lại.");
    } finally {
      setDeleteModalOpen(false);
      setSelectedCategory(null);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
      <h2 className='text-heading3-bold mb-4'>Categories</h2>
      <div className='bg-white h-16 flex justify-between items-center border-b border-gray-200'>
        <div className='relative'>
          <i className='ri-search-line text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'></i>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4'
          />
        </div>
        <button
          onClick={handleCreateCategory}
          className='bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition'
        >
          Create Category
        </button>
      </div>

      <div className='overflow-x-auto mt-6'>
        {isLoading ? (
          <p className='text-center text-gray-600'>Đang tải...</p>
        ) : (
          <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
            <thead>
              <tr className='bg-gray-100 border-b border-gray-200'>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                  Tên Danh Mục
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                  Mô Tả
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  className='border-b hover:bg-gray-100 transition-colors'
                >
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {category.name}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {category.description}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700 space-x-2'>
                    <button
                      onClick={() => handleEditCategory(category)}
                      className='text-blue-600 hover:text-blue-800'
                    >
                      <i className='ri-edit-line'></i>
                    </button>
                    <button
                      onClick={() => confirmDeleteCategory(category)}
                      className='text-red-600 hover:text-red-800'
                    >
                      <i className='ri-delete-bin-line'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isFormOpen && (
        <CategoriesForm
          closeForm={() => setIsFormOpen(false)}
          onSubmit={handleSubmitCategory}
          initialData={editData}
        />
      )}
      {deleteModalOpen && selectedCategory && (
        <DeleteButton
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => handleDeleteCategory(selectedCategory._id)}
          itemName={selectedCategory.name}
        />
      )}
    </div>
  );
};

export default Categories;
