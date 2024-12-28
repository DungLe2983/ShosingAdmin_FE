import React, { useState, useEffect } from "react";

const CategoriesForm = ({ closeForm, onSubmit, initialData = null }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setCategoryName(initialData.name || "");
      setCategoryDescription(initialData.description || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra xem tên danh mục có hợp lệ không
    if (!categoryName.trim()) {
      setError("Tên danh mục là bắt buộc.");
      return;
    }

    // Clear any previous errors
    setError("");

    const formData = {
      name: categoryName,
      description: categoryDescription,
    };
    onSubmit(formData);
    closeForm();
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white w-[30rem] p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]'>
        <h2 className='text-heading4-bold mb-8 text-center text-primary'>
          {initialData ? "Sửa Danh Mục" : "Tạo Danh Mục"}
        </h2>

        {/* Hiển thị lỗi nếu có */}
        {error && (
          <div className='mb-4 text-red-600 text-sm text-center'>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Tên Danh Mục
            </label>
            <input
              type='text'
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Nhập tên danh mục'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Mô Tả
            </label>
            <textarea
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Nhập mô tả danh mục'
            ></textarea>
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={closeForm}
              className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-4'
            >
              Hủy
            </button>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md'
            >
              {initialData ? "Cập Nhật" : "Tạo Mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoriesForm;
