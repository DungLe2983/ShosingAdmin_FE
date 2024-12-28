import React, { useState } from "react";

const Test = () => {
  const [variations, setVariations] = useState([]);
  const [variationCount, setVariationCount] = useState(0);

  const handleAddVariation = () => {
    setVariations([...variations, { color: "", image: "", sizes: [] }]);
    setVariationCount(variationCount + 1);
  };

  const handleRemoveVariation = (index) => {
    const newVariations = variations.filter((_, i) => i !== index);
    setVariations(newVariations);
  };

  const handleSizeChange = (variationIndex, sizeIndex, field, value) => {
    const newVariations = [...variations];
    newVariations[variationIndex].sizes[sizeIndex][field] = value;
    setVariations(newVariations);
  };

  const handleAddSize = (variationIndex) => {
    const newVariations = [...variations];
    newVariations[variationIndex].sizes.push({
      name: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      variations,
      // Include other form data here
    };
    console.log("Form Data:", formData);
    // Handle form submission
  };

  return (
    <div className='max-w-3xl mx-auto p-5 bg-gray-100'>
      <h1 className='text-center text-2xl font-bold mb-6'>Thêm Sản Phẩm Mới</h1>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md'>
        <div className='mb-4'>
          <label className='block font-semibold mb-2' htmlFor='name'>
            Tên sản phẩm *
          </label>
          <input
            type='text'
            id='name'
            required
            className='w-full border border-gray-300 p-2 rounded'
          />
        </div>

        <div className='mb-4'>
          <label className='block font-semibold mb-2' htmlFor='description'>
            Mô tả sản phẩm *
          </label>
          <textarea
            id='description'
            required
            className='w-full border border-gray-300 p-2 rounded h-24'
          ></textarea>
        </div>

        <div className='mb-4'>
          <label className='block font-semibold mb-2' htmlFor='basePrice'>
            Giá cơ bản (VNĐ) *
          </label>
          <input
            type='number'
            id='basePrice'
            required
            className='w-full border border-gray-300 p-2 rounded'
          />
        </div>

        <div className='mb-4'>
          <label className='block font-semibold mb-2' htmlFor='category'>
            Danh mục
          </label>
          <select
            id='category'
            className='w-full border border-gray-300 p-2 rounded'
          >
            <option value=''>Chọn danh mục</option>
            {/* ...other options */}
          </select>
        </div>

        <div className='mb-4'>
          <label className='block font-semibold mb-2'>Biến thể sản phẩm</label>
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
                  onChange={(e) => {
                    const newVariations = [...variations];
                    newVariations[variationIndex].image = e.target.files[0];
                    setVariations(newVariations);
                  }}
                  className='w-full border border-gray-300 p-2 rounded'
                />
              </div>

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
                      value={size.name}
                      required
                      onChange={(e) =>
                        handleSizeChange(
                          variationIndex,
                          sizeIndex,
                          "name",
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

        <button
          type='submit'
          className='bg-blue-500 text-white p-3 rounded w-full'
        >
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default Test;
