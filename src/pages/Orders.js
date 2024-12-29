import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import OrderForm from "./Forms/OrderForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../services/orderService"; // API function to get all orders

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [checked, setChecked] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Redirect to login if no token
  if (!token) {
    navigate("/login");
  }

  // Fetch all orders from the API when the component is mounted
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders(token); // Fetch orders using the API
        setOrders(data.orders); // Update state with the fetched orders
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders.");
      }
    };

    fetchOrders();
  }, [token, checked]);

  // Handle editing an order
  console.log("Oders==", orders);
  const handleEditOrder = (order) => {
    setEditData(order);
    setIsFormOpen(true);
  };

  // Helper function to safely format date
  const safeFormatDate = (dateString) => {
    const date = new Date(dateString);
    // If the date is valid, format it. Otherwise, return an empty string.
    return !isNaN(date) ? format(date, "dd/MM/yyyy") : "";
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
      <h2 className='text-2xl text-heading3-bold mb-4'>Orders</h2>

      <div className='mt-6 overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
          <thead>
            <tr className='bg-gray-100 border-b border-gray-200'>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Order Date
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Customer
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Address
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Items Count
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Total
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Status
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {safeFormatDate(order.createdAt)}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {order.user.name}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {order.shippingAddress
                    ? `${order.shippingAddress.street}, ${order.shippingAddress.district}, ${order.shippingAddress.city}, ${order.shippingAddress.ward}`
                    : "N/A"}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {order.items.length}
                </td>
                <td className='px-4 py-3 text-sm text-red-600 font-bold'>
                  {order.totalAmount.toLocaleString()} đ
                </td>
                <td className='px-4 py-3 text-sm font-medium'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status === "delivered" ? "delivered" : "pending"}
                  </span>
                </td>
                <td className='px-4 py-3 text-sm text-gray-700 flex space-x-4'>
                  <button
                    onClick={() => handleEditOrder(order)}
                    className='text-blue-600 hover:text-blue-800 text-[18px]'
                    title='Edit Order'
                  >
                    <i className='ri-edit-line'></i>
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
          reload={() => setChecked(!checked)}
          initialData={editData} // Pass initial data for editing
        />
      )}
    </div>
  );
};

export default Orders;
