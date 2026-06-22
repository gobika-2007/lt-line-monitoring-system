import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function ChartSection() {
  const barData = {
    labels: ["Zone A", "Zone B", "Zone C", "Zone D"],
    datasets: [
      {
        label: "Faults",
        data: [5, 3, 7, 2],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
        ],
      },
    ],
  };

  const pieData = {
    labels: ["Resolved", "Active"],
    datasets: [
      {
        data: [12, 3],
        backgroundColor: ["#10B981", "#EF4444"],
      },
    ],
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "25px",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Faults by Zone</h3>
        <Bar data={barData} />
      </div>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Fault Status</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default ChartSection;