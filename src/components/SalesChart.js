import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { format } from "date-fns";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const SalesChart = ({ orders = [] }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (!orders || orders.length === 0) {
      return;
    }

    try {
      const completedOrders = orders.filter(
        (order) => order.status === "Completed"
      );

      const salesByDate = completedOrders.reduce((acc, order) => {
        const orderDate = format(new Date(order.orderDate), "dd/MM/yyyy");
        acc[orderDate] = (acc[orderDate] || 0) + order.totalAmount;
        return acc;
      }, {});

      const labels = Object.keys(salesByDate);
      const data = Object.values(salesByDate);

      setChartData({
        labels,
        datasets: [
          {
            label: "Sales (VNĐ)",
            data,
            borderColor: "#6366F1",
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            pointBackgroundColor: "#6366F1",
            fill: false,
            tension: 0.4,
          },
        ],
      });
    } catch (error) {
      console.error("Error processing sales data:", error);
    }
  }, [orders]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "",
        },
      },
    },
  };

  return (
    <div className='w-[95%] bg-white shadow-sm rounded-lg p-4 border border-gray-200'>
      <h2 className='text-lg font-semibold mb-4'>Sales Chart (VNĐ)</h2>
      {chartData.labels.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p className='text-sm text-gray-500'>No sales data available.</p>
      )}
    </div>
  );
};

export default SalesChart;
