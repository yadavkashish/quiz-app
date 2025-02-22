import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles.css";

// ✅ Register required chart components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Scoreboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Extracting quiz data from navigation state
  const score = location.state?.score || 0;
  const total = location.state?.total || 0;
  const wrongAnswers = location.state?.wrongAnswers || 0;
  const skippedQuestions = location.state?.skippedQuestions || 0;
  const user = location.state?.user || {}; // Ensure user data is available

  const [showConfetti, setShowConfetti] = useState(false);
  const [remark, setRemark] = useState("");

  useEffect(() => {
    // ✅ Determine performance feedback based on score percentage
    if (score >= total * 0.8) {
      setShowConfetti(true); // 🎉 Confetti for high scores
      setRemark("🔥 Incredible! You're on fire!");
      setTimeout(() => setShowConfetti(false), 5000);
    } else if (score >= total * 0.5) {
      setRemark("👍 Good job! Keep practicing.");
    } else {
      setRemark("😕 Keep trying! You'll get better.");
    }

    // ✅ Save score to Leaderboard only if user has a valid name and avatar
    if (user?.name && user?.avatar) {
      saveScore(user, score);
    }
  }, [score, total, user]);

  // ✅ Function to save user score to local leaderboard
  const saveScore = (user, score) => {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // ✅ Avoid duplicate entries; only add new scores
    const existingEntry = leaderboard.find((entry) => entry.name === user.name);
    if (!existingEntry) {
      leaderboard.push({ name: user.name, avatar: user.avatar, score });
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }
  };

  // ✅ Data for Pie Chart (Correct, Wrong, Skipped)
  const data = {
    labels: ["✅ Correct Answers", "❌ Wrong Answers", "⏭️ Skipped"],
    datasets: [
      {
        data: [score, wrongAnswers, skippedQuestions],
        backgroundColor: ["#4caf50", "#f44336", "#2196F3"],
        hoverBackgroundColor: ["#388e3c", "#d32f2f", "#1976D2"],
      },
    ],
  };

  return (
    <motion.div 
      className="scoreboard quiz-container bg-gradient-to-r from-blue-700 to-black flex flex-row items-center justify-between min-h-screen p-6 text-white"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      {/* 🎉 Confetti effect on high scores */}
      {showConfetti && <Confetti />} 

      {/* ✅ Left Section: User Info & Score */}
      <div className="flex flex-col items-start w-2/3 space-y-6">
        {user && (
          <div className="flex items-center space-x-4">
            <img src={user.avatar} alt="User Avatar" className="w-16 h-16 rounded-full border-2 border-white" />
            <h2 className="text-2xl font-semibold">{user.name}</h2>
          </div>
        )}

        {/* 🎉 Animated Quiz Completion Text */}
        <motion.h2 
          className="text-4xl font-bold"
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          🎉 Quiz Completed!
        </motion.h2>

        {/* ✅ Display final score */}
        <motion.h3 
          className="text-2xl font-semibold"
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          Your Score: {score}/{total}
        </motion.h3>

        {/* ✅ Performance remark based on score */}
        <motion.p 
          className="text-lg italic"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          {remark}
        </motion.p>

        {/* ✅ Navigation Buttons */}
        <div className="flex space-x-4 mt-4">
          <button 
            onClick={() => navigate("/")} 
            className="bg-gray-700 hover:bg-gray-600 text-black px-4 py-2 rounded"
          >
            🏠 Home
          </button>

          <button 
            onClick={() => navigate("/quiz")} 
            className="bg-blue-600 hover:bg-blue-500 text-black px-4 py-2 rounded"
          >
            🔄 Retry
          </button>

          <button 
            onClick={() => navigate("/history")} 
            className="bg-purple-600 hover:bg-purple-500 text-black px-4 py-2 rounded"
          >
            📊 History
          </button>

          <button 
            onClick={() => navigate("/leaderboard")} 
            className="bg-yellow-600 hover:bg-yellow-500 text-black px-4 py-2 rounded"
          >
            🏆 Leaderboard
          </button>
        </div>
      </div>

      {/* ✅ Right Section: Pie Chart for Score Breakdown */}
      <div className="w-1/3 flex justify-center">
        <div className="chart-container w-80 h-80">
          <Pie data={data} />
        </div>
      </div>
    </motion.div>
  );
}












