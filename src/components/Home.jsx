import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../assets/sparkle.css";

export default function Home() {
  const navigate = useNavigate();

  // ✅ Reusable styles for buttons
  const buttonStyle = "px-6 py-3 rounded-lg shadow-lg transition-all m-2 backdrop-blur-md border border-white/30";
  
  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-700 to-black text-white overflow-hidden">
      {/* 🌟 Sparkle animation */}
      <div className="absolute inset-0 pointer-events-none sparkle-animation"></div>

      {/* 🎭 Main container */}
      <motion.div
        className="relative bg-opacity-10 p-10 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/10 text-center flex flex-col items-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      >
        {/* 🦋 Animated Butterfly */}
        <motion.img
          src="https://media2.giphy.com/media/dl2c1a1xHklcJzCmCP/giphy.gif"
          alt="Flying butterfly animation"
          className="absolute top-[-110px] left-[-100px] w-60"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 🎯 Title */}
        <motion.h1
          className="text-4xl font-bold mb-4 text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎯 Welcome to the Quiz App!
        </motion.h1>

        {/* 📜 Subtitle */}
        <motion.p
          className="text-lg mb-6 text-white drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Test your knowledge and challenge yourself.
        </motion.p>

        {/* 🚀 Start Quiz Button */}
        <motion.button
          onClick={() => navigate("/usersetup")}
          className={`text-blue-900 font-semibold hover:bg-white/20 ${buttonStyle}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🚀 Start Quiz
        </motion.button>

        {/* 📊 View History Button */}
        <motion.button
          onClick={() => navigate("/history")}
          className={`bg-white/10 text-purple-600 font-semibold hover:bg-white/20 ${buttonStyle}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📊 View History
        </motion.button>
      </motion.div>
    </div>
  );
}








