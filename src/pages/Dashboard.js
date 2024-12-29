import React, { useEffect, useState } from "react";
import DataCard from "../components/DataCard";
import SalesChart from "../components/SalesChart";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import { getAllOrders } from "../services/orderService";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) {
    navigate("/login");
  }
  const [dataCounts, setDataCounts] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalBooks: 0,
    totalCategories: 0,
    totalAuthors: 0,
    totalPublishers: 0,
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Sử dụng mock data
    const fetchData = async () => {
      try {
        const productData = await getAllProducts();
        const categoriesData = await getCategories();

        const usersData = mockUsers;
        const ordersData = await getAllOrders(token);
        console.log("OrderData==", ordersData);

        const completedOrders = ordersData.orders.filter(
          (order) => order.status === "delivered"
        );

        const totalRevenue = completedOrders.reduce(
          (sum, order) => sum + order.totalAmount,
          0
        );

        setDataCounts({
          totalRevenue,
          totalOrders: ordersData.orders.length,
          totalUsers: usersData.length,
          totalBooks: productData.products.length,
          totalCategories: categoriesData.categories.length,
        });

        setOrders(ordersData.orders);
      } catch (error) {
        console.error("Failed to process mock data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='p-4 bg-white rounded shadow'>
      <h2 className='text-heading3-bold mb-8'>Dashboard</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-10'>
        <DataCard
          title='Total Revenue'
          number={`${dataCounts.totalRevenue.toLocaleString()} VNĐ`}
          icon='ri-money-dollar-circle-fill'
        />
        <DataCard
          title='Total Orders'
          number={dataCounts.totalOrders}
          icon='ri-shopping-bag-4-fill'
        />
        <DataCard
          title='Total Users'
          number={dataCounts.totalUsers}
          icon='ri-user-fill'
        />
        <DataCard
          title='Total Products'
          number={dataCounts.totalBooks}
          icon='ri-price-tag-3-fill'
        />
        <DataCard
          title='Total Categories'
          number={dataCounts.totalCategories}
          icon='ri-layout-2-fill'
        />
      </div>

      <div className='my-16 bg-white h-full w-full flex items-center justify-center'>
        <SalesChart orders={orders} />
      </div>
    </div>
  );
};

export default Dashboard;

const mockUsers = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
];
