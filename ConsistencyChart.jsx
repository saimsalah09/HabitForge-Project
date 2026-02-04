import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
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

function ConsistencyChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No consistency data</p>;
  }

  const chartData = {
    labels: data.map(d => d.date.slice(5)), // MM-DD
    datasets: [
      {
        label: "Habits Completed",
        data: data.map(d => d.count),
        borderColor: "#16a34a",
        backgroundColor: "#16a34a",
        tension: 0.4
      }
    ]
  };

  return <Line data={chartData} />;
}

export default ConsistencyChart;