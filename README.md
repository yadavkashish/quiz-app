# **Interactive Quiz Platform**

## **Overview**
The **Interactive Quiz Platform** is a web-based application that allows users to attempt quizzes, track their progress, and compete on a leaderboard. Users can take multiple attempts, receive instant feedback, and monitor their improvement through a history section.

## **Features**

### 📝 **Quiz Creation & Management**
- Displays a list of questions in the form of a quiz.
- Allows users to attempt the quiz multiple times.
- Questions are retrieved from a structured dataset.

### 🎮 **User Interaction**
- Users can select answers and get **instant feedback**.
- A **timer-based quiz** mechanism restricts users to 30 seconds per question.
- Users can select an avatar and enter their name before starting.

### 📈 **Progress Tracking**
- A **leaderboard** displays the top scores from multiple attempts.
- A **history section** visualizes progress using charts.

### 💾 **Data Persistence**
- Quiz history and scores are stored in **IndexedDB** for offline access.
- Uses `localStorage` to retain user session data.

## **Tech Stack**
- **Frontend:** React (Vite), Tailwind CSS, Framer Motion
- **State Management:** React State Hooks
- **Database:** IndexedDB (via `idb` library)
- **Charting:** Chart.js (for history visualization)

## **Installation & Setup**

1. **Clone the Repository**
   ```sh
   git clone https://github.com/yadavkashish/quiz-app.git
   cd quiz-app
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Application**
   ```sh
   npm run dev
   ```

4. **Open in Browser**
   The app will be available at:
   ```
  (https://playquizwithus.netlify.app/)
   ```

## **Deployed Link**
🔗 [Live Demo](https://playquizwithus.netlify.app/))


