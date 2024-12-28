import React, { useState } from "react";
import toast from "react-hot-toast";

const OrderForm = ({ closeForm, reload, initialData }) => {
  const [status, setStatus] = useState(initialData.status);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Cập nhật trạng thái đơn hàng thành công!");
      reload();
      closeForm();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật đơn hàng");
    }
    setLoading(false);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>
            Chi tiết đơn hàng #{initialData.id}
          </h2>
          <button
            onClick={closeForm}
            className='text-gray-500 hover:text-gray-700'
          >
            <i className='ri-close-line text-2xl'></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>
            {/* Thông tin khách hàng */}
            <div className='border-b pb-4'>
              <h3 className='font-semibold mb-3'>Thông tin khách hàng</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Họ tên
                  </label>
                  <input
                    type='text'
                    value={initialData.userName}
                    readOnly
                    className='w-full px-3 py-2 border rounded-md bg-gray-100'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Số điện thoại
                  </label>
                  <input
                    type='text'
                    value={initialData.phoneNumber}
                    readOnly
                    className='w-full px-3 py-2 border rounded-md bg-gray-100'
                  />
                </div>
              </div>
              <div className='mt-3'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Địa chỉ
                </label>
                <input
                  type='text'
                  value={initialData.address}
                  readOnly
                  className='w-full px-3 py-2 border rounded-md bg-gray-100'
                />
              </div>
            </div>

            {/* Chi tiết đơn hàng */}
            <div className='border-b pb-4'>
              <h3 className='font-semibold mb-3'>Chi tiết đơn hàng</h3>
              <div className='space-y-3'>
                {initialData.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center bg-gray-50 p-3 rounded'
                  >
                    <div>
                      <p className='font-medium'>{item.name}</p>
                      <p className='text-sm text-gray-600'>
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <p className='font-medium'>
                      {item.price.toLocaleString()}đ
                    </p>
                  </div>
                ))}
                <div className='flex justify-between items-center pt-2'>
                  <p className='font-semibold'>Tổng tiền:</p>
                  <p className='font-semibold text-lg'>
                    {initialData.totalAmount.toLocaleString()}đ
                  </p>
                </div>
              </div>
            </div>

            {/* Trạng thái đơn hàng */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Trạng thái đơn hàng
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className='w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500'
              >
                <option value='Processing'>Đang xử lý</option>
                <option value='Completed'>Hoàn thành</option>
                <option value='Cancelled'>Đã hủy</option>
              </select>
            </div>
          </div>

          <div className='mt-6 flex justify-end space-x-3'>
            <button
              type='button'
              onClick={closeForm}
              className='px-4 py-2 border rounded-md hover:bg-gray-100'
            >
              Hủy
            </button>
            <button
              type='submit'
              disabled={loading}
              className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700
                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
