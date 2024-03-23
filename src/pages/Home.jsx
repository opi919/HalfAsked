import React, { useState, useEffect } from "react"
import "./Home.css"

function Home() {
  const [completedQuestions, setCompletedQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [halfQuestions, setHalfQuestions] = useState([])
  const [turn, setTurn] = useState(1) // 1 for User 1, 2 for User 2

  useEffect(() => {
    const initialHalfQuestions = [
      // Add your list of half questions here
      "What is the capital of...",
      "The best way to...",
      "Can you explain...",
    ]
    setHalfQuestions(initialHalfQuestions)
  }, [])

  const handleCompleteQuestion = (text, answer, newHalfQuestion) => {
    const newQuestion = { text, answer, user: turn }
    setCompletedQuestions([...completedQuestions, newQuestion])
    setCurrentQuestion(newHalfQuestion ? { text: newHalfQuestion } : null)
    setTurn(turn === 1 ? 2 : 1)

    // Clear input and textarea values
    document.getElementById("qus").value = ""
    document.getElementById("answerInput").value = ""
    document.getElementById("halfQuestionInput").value = ""

    // Show input and textarea
    document.getElementById("qus").style.display = "block"
    document.getElementById("answerInput").style.display = "block"
  }

  const selectRandomHalfQuestion = () => {
    const randomIndex = Math.floor(Math.random() * halfQuestions.length)
    const randomHalfQuestion = halfQuestions[randomIndex]
    setCurrentQuestion({ text: randomHalfQuestion, answer: "" })
  }

  const renderCompletedQuestions = () => (
    <div className="completed-questions">
      <div className="user-1-questions">
        <h2>User 1's Questions</h2>
        {completedQuestions.map(
          (question, index) =>
            question.user === 1 && (
              <div key={index}>
                <p>Question: {question.text}</p>
                <p>Answer: {question.answer}</p>
              </div>
            )
        )}
      </div>
      <div className="user-2-questions">
        <h2>User 2's Questions</h2>
        {completedQuestions.map(
          (question, index) =>
            question.user === 2 && (
              <div key={index}>
                <p>Question: {question.text}</p>
                <p>Answer: {question.answer}</p>
              </div>
            )
        )}
      </div>
    </div>
  )

  const renderCurrentQuestion = () => {
    if (currentQuestion) {
      const userLabel = turn === 1 ? "User 1" : "User 2"
      return (
        <div className={`current-question user-${turn}`}>
          <h2>{userLabel}'s Turn</h2>
          <p>{currentQuestion.text}</p>
          <input type="text" id="qus" placeholder="Complete the question" onChange={(e) => setCurrentQuestion({ text: e.target.value, answer: "" })} onKeyDown={handleEnterKeyPress} />
          {currentQuestion.text && (
            <>
              <p>
                <b>Answer:</b> {currentQuestion.answer}
              </p>
              <textarea id="answerInput" placeholder="Enter your answer..." onChange={(e) => setCurrentQuestion({ ...currentQuestion, answer: e.target.value })} onKeyDown={handleEnterKeyPress} />
              <p>
                <b>Ask a new question:</b>
              </p>
              <input type="text" id="halfQuestionInput" onChange={(e) => handleHalfQuestion(e.target.value)} placeholder="Ask a question..." onKeyDown={handleEnterKeyPress} />
            </>
          )}
        </div>
      )
    }
    return null
  }

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter" && currentQuestion) {
      //check from where the enter key is pressed
      if (e.target.id === "qus") {
        //set input display to none
        e.target.style.display = "none"
      } else if (e.target.id === "answerInput") {
        //set textarea display to none
        e.target.style.display = "none"
      } else if (e.target.id === "halfQuestionInput") {
        handleCompleteQuestion(currentQuestion.text, currentQuestion.answer, e.target.value)
      }
    }
  }

  return (
    <div className="question-list">
      {!currentQuestion && <button onClick={selectRandomHalfQuestion}>Start Conversation</button>}
      {completedQuestions.length > 0 && renderCompletedQuestions()}
      {renderCurrentQuestion()}
    </div>
  )
}

export default Home
