import React, { useState } from "react";
import { format } from "date-fns";
import OrderForm from "./Forms/OrderForm";
import DeleteButton from "../components/DeleteButton.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Mock data
const mockOrders = [
  {
    id: 1,
    orderDate: "2024-12-15",
    userName: "Nguyễn Văn A",
    address: "123 Nguyễn Du, Q1, TP.HCM",
    phoneNumber: "0901234567",
    orderItems: [
      {
        id: 1,
        name: "Rau cải ngọt hữu cơ",
        quantity: 2,
        price: 25000,
      },
      {
        id: 2,
        name: "Cà rốt hữu cơ",
        quantity: 1,
        price: 35000,
      },
    ],
    totalAmount: 85000,
    status: "Completed",
  },
  {
    id: 2,
    orderDate: "2024-12-16",
    userName: "Trần Thị B",
    address: "456 Lê Lợi, Q5, TP.HCM",
    phoneNumber: "0907654321",
    orderItems: [
      {
        id: 3,
        name: "Thịt heo hữu cơ",
        quantity: 1,
        price: 150000,
      },
    ],
    totalAmount: 150000,
    status: "Processing",
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) {
    navigate("/login");
  }

  const handleEditOrder = (order) => {
    setEditData(order);
    setIsFormOpen(true);
  };

  const confirmDeleteOrder = (order) => {
    setSelectedOrder(order);
    setDeleteModalOpen(true);
  };

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
    setDeleteModalOpen(false);
    toast.success("Đã xóa đơn hàng thành công");
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.orderDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
      <h2 className='text-2xl text-heading3-bold mb-4'>Orders</h2>
      <div className='bg-white h-16 flex justify-between items-center border-b border-gray-200'>
        <div className='relative'>
          <i className='ri-search-line text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'></i>
          <input
            type='text'
            placeholder='Tìm kiếm đơn hàng...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4'
          />
        </div>
      </div>

      <div className='mt-6 overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
          <thead>
            <tr className='bg-gray-100 border-b border-gray-200'>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Ngày đặt hàng
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Khách hàng
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Địa chỉ
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Số điện thoại
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Số lượng món
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Tổng tiền
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Trạng thái
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={order.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {format(new Date(order.orderDate), "dd/MM/yyyy")}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {order.userName}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {order.address}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {order.phoneNumber}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {order.orderItems.length}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {order.totalAmount.toLocaleString()} đ
                </td>
                <td className='px-4 py-3 text-sm font-medium'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status === "Completed" ? "Hoàn thành" : "Đang xử lý"}
                  </span>
                </td>
                <td className='px-4 py-3 text-sm text-gray-700 flex space-x-4'>
                  <button
                    onClick={() => handleEditOrder(order)}
                    className='text-blue-600 hover:text-blue-800 text-[18px]'
                    title='Sửa đơn hàng'
                  >
                    <i className='ri-edit-line'></i>
                  </button>
                  <button
                    onClick={() => confirmDeleteOrder(order)}
                    className='text-red-600 hover:text-red-800 text-[18px]'
                    title='Xóa đơn hàng'
                  >
                    <i className='ri-delete-bin-line'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <OrderForm
          closeForm={() => setIsFormOpen(false)}
          reload={() => setOrders(mockOrders)}
          initialData={editData}
        />
      )}
      {deleteModalOpen && selectedOrder && (
        <DeleteButton
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => handleDeleteOrder(selectedOrder.id)}
          itemName={selectedOrder.id}
        />
      )}
    </div>
  );
};

export default Orders;
