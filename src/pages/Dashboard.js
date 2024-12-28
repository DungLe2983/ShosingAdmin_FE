import React, { useEffect, useState } from "react";
import DataCard from "../components/DataCard";
import SalesChart from "../components/SalesChart";
import { useNavigate } from "react-router-dom";

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
        const booksData = mockBooks;
        const categoriesData = mockCategories;
        const authorsData = mockAuthors;
        const publishersData = mockPublishers;
        const usersData = mockUsers;
        const ordersData = mockOrders;

        const completedOrders = ordersData.filter(
          (order) => order.status === "Completed"
        );

        const totalRevenue = completedOrders.reduce(
          (sum, order) => sum + order.totalAmount,
          0
        );

        setDataCounts({
          totalRevenue,
          totalOrders: ordersData.length,
          totalUsers: usersData.length,
          totalBooks: booksData.length,
          totalCategories: categoriesData.length,
          totalAuthors: authorsData.length,
          totalPublishers: publishersData.length,
        });

        setOrders(ordersData);
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
          title='Total Books'
          number={dataCounts.totalBooks}
          icon='ri-price-tag-3-fill'
        />
        <DataCard
          title='Total Categories'
          number={dataCounts.totalCategories}
          icon='ri-layout-2-fill'
        />
        <DataCard
          title='Total Authors'
          number={dataCounts.totalAuthors}
          icon='ri-book-open-fill'
        />
      </div>

      <div className='my-16 bg-white h-full w-full flex items-center justify-center'>
        <SalesChart orders={orders} />
      </div>
    </div>
  );
};

export default Dashboard;

// Mock data
const mockBooks = [
  { id: 1, title: "Book 1" },
  { id: 2, title: "Book 2" },
];

const mockCategories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
];

const mockAuthors = [
  { id: 1, name: "Author 1" },
  { id: 2, name: "Author 2" },
];

const mockPublishers = [
  { id: 1, name: "Publisher 1" },
  { id: 2, name: "Publisher 2" },
];

const mockUsers = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
];

const mockOrders = [
  {
    id: 1,
    orderDate: "2024-12-01T10:00:00Z",
    status: "Completed",
    totalAmount: 50000,
  },
  {
    id: 2,
    orderDate: "2024-12-02T15:30:00Z",
    status: "Completed",
    totalAmount: 20000,
  },
  {
    id: 3,
    orderDate: "2024-12-03T12:45:00Z",
    status: "Completed",
    totalAmount: 75000,
  },
  {
    id: 4,
    orderDate: "2024-12-12T12:45:00Z",
    status: "Completed",
    totalAmount: 200000,
  },
];
