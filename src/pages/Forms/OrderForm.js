import React, { useState, useEffect } from "react";
import { updateOrderStatus } from "../../services/orderService";
import { toast } from "react-hot-toast";

const OrderForm = ({ closeForm, initialData, reload }) => {
  const [order, setOrder] = useState(initialData);
  const [status, setStatus] = useState(initialData ? initialData.status : "");
  const token = localStorage.getItem("token"); // Lấy token từ localStorage

  console.log("Order===", order);
  console.log("initialData", initialData);
  useEffect(() => {
    if (initialData) {
      setOrder(initialData);
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu trạng thái không thay đổi thì không cần cập nhật
    if (status === order.status) {
      toast.error("Trạng thái không thay đổi");
      return;
    }

    try {
      await updateOrderStatus(order._id, status, token);
      toast.success("Cập nhật trạng thái thành công");
      reload();
      closeForm();
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái");
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='w-[60rem] mx-auto p-5 bg-gray-100 rounded-lg relative overflow-y-auto max-h-[90vh]'>
        <h1 className='text-center text-2xl font-bold mb-6'>Edit Order</h1>

        <form onSubmit={handleSubmit}>
          {/* Ngày đặt hàng */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Ngày đặt hàng
            </label>
            <input
              type='text'
              value={new Date(order?.createdAt).toLocaleDateString() || ""}
              readOnly
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
            />
          </div>

          {/* Khách hàng */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Khách hàng
            </label>
            <input
              type='text'
              value={order ? order.user.name : ""}
              readOnly
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
            />
          </div>

          {/* Địa chỉ */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Địa chỉ
            </label>
            <input
              type='text'
              value={
                order && order.shippingAddress
                  ? `${order.shippingAddress.street}, ${order.shippingAddress.district}, ${order.shippingAddress.city}, ${order.shippingAddress.ward}`
                  : ""
              }
              readOnly
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Tổng tiền
            </label>
            <input
              type='text'
              value={order.totalAmount + " đ" || ""}
              readOnly
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
            />
          </div>

          {/* Sản phẩm trong đơn hàng */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Sản phẩm
            </label>
            <table className='min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-sm'>
              <thead>
                <tr className='bg-gray-100 text-left text-sm font-medium text-gray-600'>
                  <th className='px-6 py-3 border-b'>Tên sản phẩm</th>
                  <th className='px-6 py-3 border-b'>Màu sắc / Kích thước</th>
                  <th className='px-6 py-3 border-b'>Số lượng</th>
                  <th className='px-6 py-3 border-b'>Giá</th>
                  <th className='px-6 py-3 border-b'>Tổng</th>
                </tr>
              </thead>
              <tbody>
                {order?.items?.map((item, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className='px-6 py-4 text-sm text-gray-700 border-b'>
                      {item.product?.name}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-700 border-b'>
                      {item.variation.color} / {item.variation.size}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-700 border-b'>
                      {item.quantity}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-700 border-b'>
                      {item.variation.price.toLocaleString()} đ
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-700 border-b'>
                      {(item.quantity * item.variation.price).toLocaleString()}{" "}
                      đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Trạng thái */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Trạng thái
            </label>
            <select
              value={status}
              onChange={handleStatusChange}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
            >
              <option value='pending'>Đang chờ xử lý</option>
              <option value='delivered'>Đã hoàn thành</option>
            </select>
          </div>

          {/* Buttons */}
          <div className='flex justify-end space-x-4 mt-6'>
            <button
              type='button'
              onClick={closeForm}
              className='bg-gray-500 text-white py-2 px-4 rounded-md'
            >
              Hủy
            </button>
            <button
              type='submit'
              className='bg-blue-600 text-white py-2 px-4 rounded-md'
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
