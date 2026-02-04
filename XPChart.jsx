import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function XPChart({ xpHistory }) {
  if (!xpHistory || xpHistory.length === 0) {
    return <p>No XP data yet</p>;
  }

  const data = {
    labels: xpHistory.map(item => item.date),
    datasets: [
      {
        label: "XP Progress",
        data: xpHistory.map(item => item.xp),
        borderColor: "#4f46e5",
        backgroundColor: "#4f46e5",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Line data={data} options={options} />;
}

export default XPChart;