import React, { useEffect, useState } from "react";
import { getAttempts } from "../utils/db";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎯 Fetch Quiz History
  useEffect(() => {
    async function fetchHistory() {
      try {
        const attempts = await getAttempts();
        setHistory(attempts);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  // 🎨 Chart Data
  const data = {
    labels: history.map((_, i) => `Attempt ${i + 1}`),
    datasets: [
      {
        label: "Score",
        data: history.map((attempt) => attempt.score),
        borderColor: "rgba(0, 123, 255, 1)", // Vibrant blue
        backgroundColor: "rgba(0, 123, 255, 0.2)", // Light blue fill
        fill: true,
        tension: 0.3, // Smooth curves
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  return (
    <div className="history-container bg-gradient-to-r from-blue-700 to-black text-white p-7 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">📊 Quiz History</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : history.length > 0 ? (
        <div className="bg-gray-800 p-5 rounded-lg shadow-md">
          <Line data={data} />
        </div>
      ) : (
        <p className="text-center text-gray-400">No quiz history found. Play a quiz to track progress!</p>
      )}
    </div>
  );
}



