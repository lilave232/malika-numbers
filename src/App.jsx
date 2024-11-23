import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const words = ["Plein","Carre","Cheval","Transversale","Sixain"];
  const numbers = [2,3,4,5,6,7,8,9,10];
  const words2 = ["Plein","Carre","Cheval","Transversale","Sixain"];
  const numbers2 = [11,12,13,14,15,16,17,18,19,20];
  //const words = ["Cheval"];
  //const numbers = [11,12,13,14,15,16,17,18,19,20];
  const [setValues, setSetValues] = useState([]);
  const [timeLeft, setTimeLeft] = useState(6000);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsStarted(false);
      setIsFinished(true);
      return;
    };

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  function buildUniquePairSet(array1, array2) {
    const pairSet = new Set();
  
    array1.forEach(a => {
      array2.forEach(b => {
        // Serialize the pair to a string
        const pair = JSON.stringify([a, b]);
        pairSet.add(pair);
      });
    });
  
    // Convert back to array of pairs if needed
    return Array.from(pairSet).map(pair => JSON.parse(pair));
  }

  function randomizeSet(inputSet) {
    // Convert the Set to an Array
    const array = Array.from(inputSet);
  
    // Shuffle the Array using Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
  
    // Convert back to Set (if needed) or return the array
    return array; // Return a randomized Set
    // return array;       // Return a randomized Array
  }

  const [count, setCount] = useState(-1);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  const newSet = () => {
    if (count < setValues.length) setCount(count + 1);
    if (setValues.length > 0 && count == setValues.length-1) {
      setIsStarted(false);
      setIsFinished(true);
      setIsCompleted(true);
    }
  }

  const checkAnswer = (e) => {
    e.preventDefault();
    let answer = 0;
    const randomWord = setValues[count][0];
    const randomNumber = setValues[count][1];
    if (randomWord === "Plein") answer = randomNumber * 35;
    if (randomWord === "Carre") answer = randomNumber * 8;
    if (randomWord === "Transversale") answer = randomNumber * 11;
    if (randomWord === "Sixain") answer = randomNumber * 5;
    if (randomWord === "Cheval") answer = randomNumber * 17;
    if (parseInt(e.target.answer.value) == answer) {
      setIsSuccess(true);
      setIsFailure(false);
      newSet();
      e.target.answer.value = ""
    } else {
      setIsSuccess(false);
      setIsFailure(true);
      e.target.answer.value = ""
    }
    setTimeout(()=>{setIsFailure(false);setIsSuccess(false);}, 1000);
  }

  const start = () => {
    setTimeLeft(6000);
    let values = randomizeSet(buildUniquePairSet(words,numbers));
    values.push(...randomizeSet(buildUniquePairSet(words2,numbers2)));
    values = randomizeSet(values);
    setSetValues(values);
    newSet();
    setCount(0);
    setIsFinished(false);
    setIsStarted(true);
  }

  if (isCompleted) return <><h1>You Win</h1><p>{count}/{setValues.length}</p></>

  return (
    <>
      <div>
        <h1>❤️</h1>
        {isStarted ? 
          <>
            <div>
              {timeLeft > 0 ? (
                <>
                  <p>Time left: {timeLeft} seconds</p>
                  <p>{count}/{setValues.length}</p>
                </>
              ) : (
                <p>Countdown finished!</p>
              )}
            </div>
            <div id="success" class={"alert alert-success " + (!isSuccess ? 'd-none' : '')} role="alert">
              Correct!
            </div>
            <div id="failure" class={"alert alert-danger " + (!isFailure ? 'd-none' : '')} role="alert">
              Incorrect!
            </div>
            {(setValues.length > 0) ? <h1>{setValues[count][0]}<br></br>{setValues[count][1]}</h1> : <></>}
            <br></br>
            <form href="" onSubmit={checkAnswer}>
              <input id="answer" type="text" class="form-control" placeholder="Answer"/>
              <br></br>
              <button type="submit" class="btn btn-dark">Next</button>
            </form>
          </>
          :
          <div>
            {isFinished ? <h1>You Got {count}/{setValues.length}!</h1> : <></>}
            <button onClick={start} class="btn btn-dark">Start</button>
          </div>
        }
      </div>
    </>
  )
}

export default App
