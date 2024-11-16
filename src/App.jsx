import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const words = ["Plein","Carre","Cheval","Transversale","Sixain"]
  const numbers = [1,2,3,4,5,6,7,8,9,10]

  const [randomNumber, setRandomNumber] = useState("");
  const [randomWord, setRandomWord] = useState(0);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  useEffect(() => {
    newSet()
  },[])

  const newSet = () => {
    setRandomWord(words[Math.floor(Math.random() * words.length)]);
    setRandomNumber(numbers[Math.floor(Math.random() * numbers.length)]);
  }

  const checkAnswer = (e) => {
    e.preventDefault();
    let answer = 0;
    if (randomWord === "Plein") answer = randomNumber * 35;
    if (randomWord === "Carre") answer = randomNumber * 8;
    if (randomWord === "Transversale") answer = randomNumber * 11;
    if (randomWord === "Sixain") answer = randomNumber * 5;
    if (randomWord === "Cheval") answer = randomNumber * 17;
    if (parseInt(e.target.answer.value) == answer) {
      console.log("Correct")
      setIsSuccess(true);
      setIsFailure(false);
      newSet();
      e.target.answer.value = ""
    } else {
      console.log("Incorrect")
      setIsSuccess(false);
      setIsFailure(true);
      e.target.answer.value = ""
    }
    setTimeout(()=>{setIsFailure(false);setIsSuccess(false);}, 1000);
  }

  return (
    <>
      <div>
        <div id="success" class={"alert alert-success " + (!isSuccess ? 'd-none' : '')} role="alert">
          Correct!
        </div>
        <div id="failure" class={"alert alert-danger " + (!isFailure ? 'd-none' : '')} role="alert">
          Incorrect!
        </div>
        <h1>{randomWord}<br></br>{randomNumber}</h1>
        <br></br>
        <form href="" onSubmit={checkAnswer}>
          <input id="answer" type="text" class="form-control" placeholder="Answer"/>
          <br></br>
          <button type="submit" class="btn btn-dark">Next</button>
        </form>
      </div>
    </>
  )
}

export default App
