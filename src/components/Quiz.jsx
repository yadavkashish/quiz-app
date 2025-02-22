import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import { saveAttempt } from "../utils/db";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "../styles.css";

// ✅ Import sound effects for correct and wrong answers
const correctSound = new Audio("/correct.mp3");
const wrongSound = new Audio("/wrong.mp3");

// ✅ Array of GIFs to display dynamically for different questions
const gifs = [
 "https://www.bing.com/th/id/OGC.fe3785bad7c97048390939ea9076aff6?pid=1.7&rurl=https%3a%2f%2fwww.icegif.com%2fwp-content%2fuploads%2f2023%2f10%2ficegif-823.gif&ehk=rts7OuEe2uTctSBsa20Z4OVScNrsafibsoBaidGuNJY%3d",


  "https://www.icegif.com/wp-content/uploads/icegif-5453.gif",

  "https://mymarketplacebuilder.com/wp-content/uploads/2022/02/coding-1.gif",
  
  "https://media.tenor.com/rEUfrrBlzl4AAAAj/minecraft-adeventure-time.gif",

  "https://i.pinimg.com/originals/e9/8b/d3/e98bd30d18827f3bff619eaae51fc90b.gif",
];

// ✅ Additional open-ended questions for the quiz
const additionalQuestions = [
  { question: "What is the value of 12 + 28?", correctAnswer: "40" },
  { question: "How many states are there in the United States?", correctAnswer: "50" },
  { question: "In which year was the Declaration of Independence signed?", correctAnswer: "1776" },
  { question: "What is the value of pi rounded to the nearest integer?", correctAnswer: "3" },
  { question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?", correctAnswer: "120" },
];

export default function Quiz() {
  const [index, setIndex] = useState(0); // ✅ Current question index
  const [selectedAnswer, setSelectedAnswer] = useState(null); // ✅ Stores the selected answer for multiple-choice questions
  const [userInput, setUserInput] = useState(""); // ✅ Stores user input for open-ended questions
  const [isSubmitted, setIsSubmitted] = useState(false); // ✅ Tracks if an answer has been submitted
  const [timer, setTimer] = useState(30); // ✅ Countdown timer for each question
  const [score, setScore] = useState(0); // ✅ Tracks user’s score
  const [wrongAnswers, setWrongAnswers] = useState(0); // ✅ Tracks number of wrong answers
  const [skippedQuestions, setSkippedQuestions] = useState(0); // ✅ Tracks number of skipped questions
  const [showConfetti, setShowConfetti] = useState(false); // ✅ Controls the confetti effect on correct answers
  const navigate = useNavigate();
  const [wrongOrSkippedQuestions, setWrongOrSkippedQuestions] = useState([]); // ✅ Stores incorrect/skipped questions for review
  const [user, setUser] = useState({ name: "", avatar: "" }); // ✅ Stores user info (name & avatar)

  useEffect(() => {
    // ✅ Retrieve stored user data from localStorage; redirect if missing
    const storedUser = JSON.parse(localStorage.getItem("quizUser"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/");
    }
  }, []);

  // ✅ Combine standard and additional questions
  const allQuestions = [...questions, ...additionalQuestions];

  useEffect(() => {
    // ✅ Auto-submit when timer reaches 0
    if (timer === 0) {
      handleSubmit(true);
    }
    // ✅ Update timer every second
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // ✅ Handle answer submission
  const handleSubmit = (autoSubmit = false) => {
    if (isSubmitted) return; // Prevent multiple submissions
    setIsSubmitted(true);

    const currentQuestion = allQuestions[index];
    const correct = currentQuestion.correctAnswer;
    let isCorrect = false;

    if (index < questions.length) {
      // ✅ For multiple-choice questions, check if selected answer matches correct answer
      isCorrect = selectedAnswer === correct;
    } else {
      // ✅ For open-ended questions, check if user input matches correct answer (case insensitive)
      isCorrect = userInput.trim().toLowerCase() === correct.toLowerCase();
    }

    if (isCorrect) {
      correctSound.play();
      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      wrongSound.play();
      setWrongAnswers((prev) => prev + 1);
      setWrongOrSkippedQuestions((prev) => [
        ...prev,
        { question: currentQuestion.question, correctAnswer: correct },
      ]);
    }

    if (autoSubmit) {
      // ✅ If the question is skipped, increase the skipped counter
      setSkippedQuestions((prev) => prev + 1);
    }

    setTimeout(() => handleNext(), 1000);
  };

  const handleNext = () => {
    if (!isSubmitted && selectedAnswer === null && userInput.trim() === "") {
      // ✅ If no answer is selected or input is empty, mark question as skipped
      setSkippedQuestions((prev) => prev + 1);
      setWrongOrSkippedQuestions((prev) => [
        ...prev,
        { question: allQuestions[index].question, correctAnswer: allQuestions[index].correctAnswer },
      ]);
    }

    if (index + 1 < allQuestions.length) {
      // ✅ Move to the next question
      setIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setUserInput("");
      setIsSubmitted(false);
      setTimer(30);
    } else {
      // ✅ Save the final attempt & navigate to scoreboard
      saveAttempt(score);
      navigate("/scoreboard", {
        state: {
          score,
          total: allQuestions.length,
          wrongAnswers,
          skippedQuestions,
          wrongOrSkippedQuestions,
          user,
        },
      });
    }
  };

  return (
    <div className="quiz-container bg-gradient-to-r from-blue-700 to-black">
      {showConfetti && <Confetti />}
      <div className="quiz-left">
        <motion.div className="question-box blur-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2>Question {index + 1}: {allQuestions[index].question}</h2>
        </motion.div>

        {index < questions.length ? (
          <motion.div className="options-box blur-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {allQuestions[index].options.map((option, i) => (
              <button
                key={i}
                className={`option-button ${
                  isSubmitted
                    ? option === allQuestions[index].correctAnswer
                      ? "correct"
                      : selectedAnswer === option
                      ? "wrong"
                      : ""
                    : ""
                }`}
                disabled={isSubmitted}
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </button>
            ))}
          </motion.div>
        ) : (
          <input
            type="text"
            className="text-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isSubmitted}
          />
        )}

        <div className="button-container">
          <button className="submit-button" onClick={() => handleSubmit()}>Submit</button>
          <button className="next-button" onClick={handleNext}>Next</button>
        </div>
      </div>

      <div className="quiz-right">
        <motion.img key={index} src={gifs[index % gifs.length]} alt="Brain Loading" className="quiz-gif" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
      </div>
    </div>
  );
}























