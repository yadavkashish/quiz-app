import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [topScores, setTopScores] = useState([]);

  // ✅ Load leaderboard from localStorage on component mount
  useEffect(() => {
    updateLeaderboard();
  }, []);

  // 📌 Fetch and sort leaderboard data (Top 5 highest scores)
  const updateLeaderboard = () => {
    const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    
    // ✅ Sort by score (Descending order) and take the top 5
    const sortedScores = [...scores].sort((a, b) => b.score - a.score).slice(0, 5);
    
    setTopScores(sortedScores);
  };

  // 📌 Clear leaderboard with confirmation
  const clearLeaderboard = () => {
    if (window.confirm("Are you sure you want to clear the leaderboard? This action cannot be undone.")) {
      localStorage.removeItem("leaderboard");
      setTopScores([]);
    }
  };

  return (
    <div className="leaderboard-container bg-gray-800 bg-gradient-to-r from-blue-700 to-black text-white p-7 rounded-lg shadow-lg w-96 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">🏆 Leaderboard</h2>

      {/* ✅ Display leaderboard if scores exist */}
      {topScores.length > 0 ? (
        <ul className="space-y-3">
          {topScores.map((entry, i) => (
            <li 
              key={i} 
              className="flex items-center bg-gray-700 p-3 rounded-md shadow-md"
            >
              <span className="text-xl font-bold mr-3">#{i + 1}</span>
              <img 
                src={entry.avatar} 
                alt={`${entry.name}'s avatar`} 
                className="w-10 h-10 rounded-full border border-white mr-3"
              />
              <span className="flex-1 font-medium">{entry.name}</span>
              <span className="font-semibold">{entry.score} pts</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">No scores yet! Play a quiz to enter the leaderboard.</p>
      )}

      {/* ✅ Clear Leaderboard Button with confirmation */}
      {topScores.length > 0 && (
        <button 
          onClick={clearLeaderboard} 
          className="mt-4 bg-red-600 hover:bg-red-700 text-black py-2 px-4 rounded w-full transition duration-200"
        >
          Clear Leaderboard
        </button>
      )}
    </div>
  );
};

export default Leaderboard;


