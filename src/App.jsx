import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Scoreboard from "./components/Scoreboard";
import History from "./components/History";
import Leaderboard from "./components/Leaderboard";
import UserSetup from "./components/UserSetup";
import "./styles.css";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usersetup" element={<UserSetup />} /> 
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}
