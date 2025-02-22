import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

// ✅ Predefined avatars for selection
const avatars = [
  "https://www.pinpng.com/pngs/m/180-1806911_mulher-png-avatar-jira-transparent-png.png",
  "https://th.bing.com/th/id/OIP.eYwGU6QydyIrO2HBkbrKKQHaHa?pid=ImgDet&w=189&h=189&c=7&dpr=1.5",
  "https://th.bing.com/th/id/OIP.y82-Upn20SDLmRWuv-st1AHaHa?w=170&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  "https://th.bing.com/th/id/OIP.GOnabjGitD3X09BiYmtf6QAAAA?w=121&h=128&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  "https://th.bing.com/th/id/OIP.Fng_wwIcHbzZib_xrD3d7gHaHa?pid=ImgDet&w=189&h=189&c=7&dpr=1.5",
  "https://th.bing.com/th/id/OIP.dz1bQVwnCLC2pDNeAU41rAAAAA?w=158&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  "https://th.bing.com/th/id/OIP.FMWqW3-78DjNe-K74rJahgHaFj?w=181&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
];

export default function UserSetup() {
  const [name, setName] = useState(""); // Store user's name
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]); // Default avatar selection
  const navigate = useNavigate();

  // ✅ Handle quiz start, ensuring a valid name is entered
  const handleStart = () => {
    if (!name.trim()) {
      alert("⚠️ Please enter your name!");
      return;
    }

    // ✅ Save user details in local storage for later use
    localStorage.setItem("quizUser", JSON.stringify({ name, avatar: selectedAvatar }));

    // ✅ Navigate to the quiz page
    navigate("/quiz");
  };

  return (
    <div className="user-setup-container bg-gradient-to-r from-blue-700 to-black min-h-screen flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz! 🎉</h1>

      {/* ✅ User Name Input Field */}
      <input 
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="name-input w-64 p-2 rounded-md text-black"
      />

      {/* ✅ Avatar Selection */}
      <h3 className="text-lg mt-4">Select Your Avatar:</h3>
      <div className="avatar-selection flex space-x-4 mt-3">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className={`w-16 h-16 rounded-full cursor-pointer border-2 transition-all duration-200 ${
              selectedAvatar === avatar ? "border-yellow-500 scale-110" : "border-transparent"
            }`}
            onClick={() => setSelectedAvatar(avatar)}
          />
        ))}
      </div>

      {/* ✅ Start Quiz Button */}
      <button 
        className="start-button bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded mt-6"
        onClick={handleStart}
      >
        🚀 Start Quiz
      </button>
    </div>
  );
}

