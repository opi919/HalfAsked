import React, { useState, useEffect } from "react"
import "./Home.css"
import LOGO from "../assets/logo.png"

function Home() {
  const [completedQuestions, setCompletedQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [halfQuestions, setHalfQuestions] = useState([])
  const [turn, setTurn] = useState(1) // 1 for User 1, 2 for User 2
  const [user1Name, setUser1Name] = useState("User1")
  const [user2Name, setUser2Name] = useState("User2")

  useEffect(() => {
    const initialHalfQuestions = [
      // Add your list of half questions here
      "When are you ....?",
      "Does it always say ...?",
      "How have you ...?",
      "Why does ...?",
      "When have you ...?",
      "The best way to...?",
      "Can you explain...?",
      "Who can you ...?",
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
    //remove usernames input fields
    document.querySelector(".user-names").style.display = "none"
    const randomIndex = Math.floor(Math.random() * halfQuestions.length)
    const randomHalfQuestion = halfQuestions[randomIndex]
    setCurrentQuestion({ text: randomHalfQuestion, answer: "" })
  }

  const renderCompletedQuestions = () => (
    <div className="completed-questions mt-5">
      <div className="user-1-questions">
        <h2>{user1Name}'s Questions</h2>
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
        <h2>{user2Name}'s Questions</h2>
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
      const userLabel = turn === 1 ? user1Name : user2Name
      return (
        <div className={`current-question user-${turn}`}>
          <h2>{userLabel}'s Turn</h2>
          <p>{currentQuestion.text}</p>
          <input type="text" id="qus" placeholder="Complete the question" onChange={(e) => setCurrentQuestion({ text: e.target.value, answer: "" })} onKeyDown={handleEnterKeyPress} />
          {currentQuestion.text && (
            <>
              <p className="m-0 mb-1 mt-3">
                <b>Answer:</b> {currentQuestion.answer}
              </p>
              <textarea id="answerInput" placeholder="Enter your answer..." onChange={(e) => setCurrentQuestion({ ...currentQuestion, answer: e.target.value })} onKeyDown={handleEnterKeyPress} />
              <p className="m-0 mt-3 mb-1">
                <b>Ask another half question:</b>
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
      <div className="user-names text-center">
        <div>
          <img src={LOGO} alt="chat" className="half-logo" />
        </div>
        <div>
          <label for="user1">User 1's Name:</label>
          <input type="text" id="user1" onChange={(e) => setUser1Name(e.target.value)} />
        </div>
        <div className="mt-2">
          <label for="user2">User 2's Name:</label>
          <input type="text" id="user2" onChange={(e) => setUser2Name(e.target.value)} />
        </div>

        <div className="mt-4">
          {!currentQuestion && (
            <button onClick={selectRandomHalfQuestion} className="btn btn-primary">
              Start Conversation
            </button>
          )}
        </div>
      </div>

      {renderCurrentQuestion()}
      {completedQuestions.length > 0 && renderCompletedQuestions()}
    </div>
  )
}

export default Home
