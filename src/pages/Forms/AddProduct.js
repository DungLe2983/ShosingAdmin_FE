import React, { useState, useEffect } from "react";
import { getCategories } from "../../services/categoryService";
import { createProduct } from "../../services/productService";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "../../services/uploadService";

const AddProduct = ({ closeForm, token, reload }) => {
  const [categories, setCategories] = useState([]);
  const [variations, setVariations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategories();
        setCategories(categoryData.categories); // Set categories into state
      } catch (error) {
        console.error("Error fetching categories:", error);
        setErrorMessage("Không thể tải danh mục.");
      }
    };

    fetchCategories();
  }, []);

  const handleAddVariation = () => {
    setVariations([...variations, { color: "", image: "", sizes: [] }]);
  };

  const handleRemoveVariation = (index) => {
    const newVariations = variations.filter((_, i) => i !== index);
    setVariations(newVariations);
  };

  const handleImageUpload = async (event, variationIndex) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const url = await uploadToCloudinary(file);
      if (url) {
        // Update the variation image URL
        const updatedVariations = [...variations];
        updatedVariations[variationIndex].image = url;
        setVariations(updatedVariations);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("An error occurred while uploading the image.");
    }
  };

  const handleSizeChange = (variationIndex, sizeIndex, field, value) => {
    const newVariations = [...variations];
    newVariations[variationIndex].sizes[sizeIndex][field] = value;
    setVariations(newVariations);
  };

  const handleAddSize = (variationIndex) => {
    const newVariations = [...variations];
    newVariations[variationIndex].sizes.push({
      size: "",
      stock: "",
      price: "",
    });
    setVariations(newVariations);
  };

  const handleRemoveSize = (variationIndex, sizeIndex) => {
    const newVariations = [...variations];
    newVariations[variationIndex].sizes.splice(sizeIndex, 1);
    setVariations(newVariations);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !name ||
      !description ||
      !basePrice ||
      !selectedCategory ||
      variations.length === 0
    ) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setLoading(true);
    const formData = {
      name,
      description,
      basePrice: Number(basePrice),
      variations,
      category: selectedCategory, // Include selected category in the form data
    };
    // console.log("Sản phẩm đã được thêm thành công", formData);

    try {
      const response = await createProduct(formData, token); // Send form data to the server
      console.log("response==", response);
      toast.success("Sản phẩm đã được thêm thành công");
      reload();
      closeForm(); // Close the form on successful submission
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      setErrorMessage("Không thể tạo sản phẩm. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='w-[50rem] mx-auto p-5 bg-gray-100 rounded-lg relative overflow-y-auto max-h-[90vh]'>
        <h1 className='text-center text-2xl font-bold mb-6'>
          Thêm Sản Phẩm Mới
        </h1>
        <form
          onSubmit={handleSubmit}
          className='bg-white p-6 rounded shadow-md'
        >
          {/* Product Name */}
          <div className='mb-4'>
            <label className='block font-semibold mb-2' htmlFor='name'>
              Tên sản phẩm *
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='w-full border border-gray-300 p-2 rounded'
            />
          </div>

          {/* Product Description */}
          <div className='mb-4'>
            <label className='block font-semibold mb-2' htmlFor='description'>
              Mô tả sản phẩm *
            </label>
            <textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className='w-full border border-gray-300 p-2 rounded h-24'
            ></textarea>
          </div>

          {/* Base Price */}
          <div className='mb-4'>
            <label className='block font-semibold mb-2' htmlFor='basePrice'>
              Giá cơ bản (VNĐ) *
            </label>
            <input
              type='number'
              id='basePrice'
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              required
              className='w-full border border-gray-300 p-2 rounded'
            />
          </div>

          {/* Category Dropdown */}
          <div className='mb-4'>
            <label className='block font-semibold mb-2' htmlFor='category'>
              Danh mục
            </label>
            <select
              id='category'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='w-full border border-gray-300 p-2 rounded'
            >
              <option value=''>Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Variations Section */}
          <div className='mb-4'>
            <label className='block font-semibold mb-2'>
              Biến thể sản phẩm
            </label>
            <button
              type='button'
              className='bg-green-500 text-white p-2 rounded mb-2'
              onClick={handleAddVariation}
            >
              + Thêm màu sắc mới
            </button>
            {variations.map((variation, variationIndex) => (
              <div
                key={variationIndex}
                className='border border-gray-300 p-4 rounded mb-4 bg-gray-50'
              >
                <div className='mb-4'>
                  <label className='block font-semibold mb-2'>Màu sắc *</label>
                  <input
                    type='text'
                    value={variation.color}
                    required
                    onChange={(e) => {
                      const newVariations = [...variations];
                      newVariations[variationIndex].color = e.target.value;
                      setVariations(newVariations);
                    }}
                    className='w-full border border-gray-300 p-2 rounded'
                  />
                </div>

                <div className='mb-4'>
                  <label className='block font-semibold mb-2'>Hình ảnh</label>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleImageUpload(e, variationIndex)}
                    className='w-full border border-gray-300 p-2 rounded'
                  />
                  {variation.image && (
                    <div className='mt-2'>
                      <img
                        src={variation.image}
                        alt='Cover Preview'
                        className='h-60 w-60 object-cover'
                      />
                    </div>
                  )}
                </div>

                {/* Sizes */}
                <div className='mb-4'>
                  <label className='block font-semibold mb-2'>Các size</label>
                  <button
                    type='button'
                    className='bg-green-500 text-white p-2 rounded mb-2'
                    onClick={() => handleAddSize(variationIndex)}
                  >
                    + Thêm size
                  </button>
                  {variation.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex} className='flex items-center mb-2'>
                      <input
                        type='text'
                        placeholder='Size *'
                        value={size.size}
                        required
                        onChange={(e) =>
                          handleSizeChange(
                            variationIndex,
                            sizeIndex,
                            "size",
                            e.target.value
                          )
                        }
                        className='border border-gray-300 p-2 rounded w-1/3 mr-2'
                      />
                      <input
                        type='number'
                        placeholder='Số lượng *'
                        value={size.stock}
                        required
                        onChange={(e) =>
                          handleSizeChange(
                            variationIndex,
                            sizeIndex,
                            "stock",
                            e.target.value
                          )
                        }
                        className='border border-gray-300 p-2 rounded w-1/3 mr-2'
                      />
                      <input
                        type='number'
                        placeholder='Giá (VNĐ) *'
                        value={size.price}
                        required
                        onChange={(e) =>
                          handleSizeChange(
                            variationIndex,
                            sizeIndex,
                            "price",
                            e.target.value
                          )
                        }
                        className='border border-gray-300 p-2 rounded w-1/3 mr-2'
                      />
                      <button
                        type='button'
                        className='bg-red-500 text-white p-1 rounded'
                        onClick={() =>
                          handleRemoveSize(variationIndex, sizeIndex)
                        }
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type='button'
                  className='bg-red-500 text-white p-2 rounded'
                  onClick={() => handleRemoveVariation(variationIndex)}
                >
                  Xóa biến thể này
                </button>
              </div>
            ))}
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className='text-red-500 text-center mb-4'>{errorMessage}</div>
          )}

          {/* Submit Buttons */}
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
              className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              disabled={loading}
            >
              {loading ? "Đang tạo sản phẩm..." : "Thêm sản phẩm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
