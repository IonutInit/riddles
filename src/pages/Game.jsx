import {useState} from 'react'
import HintsButton from "../components/HintsButton";

import "./Game.css";
import placeholder2 from "../assets/images/placeholder2.jpg";

import RefreshIcon from "@mui/icons-material/Refresh";

import {approximateLength, averageLetter, randomLetter, synonym} from '../game-logic/hints'
import {averageLetterCounter, approximateLengthCounter} from '../game-logic/hints'

const Game = () => {  
  const [points, setPoints] = useState(20)

  //HINT HANDLERS
  const [hint, setHint] = useState([])
  const [hintCounter, setHintCounter] = useState(0)
  const [getRandomLetter, setRandomLetter] = useState(0)  
  //explain what this is
  const hintOptions = [0, 0, 1, 1, 2, 3]

  const [riddle, setRiddle] = useState("");
  const [riddleSolution, setRiddleSolution] = useState("");
  const [solutionSynonyms, setSolutionSynonyms] = useState("");
  const [riddleImage, setRiddleImage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [newImagePrompt, setNewImagePrompt] = useState('')

  //RANDOM RIDDLE
  //   const getRandomRiddle = () => {
  //   async function randomRiddle() {
  //     setIsLoading(true);

  //     const response = await fetch(
  //       "https://the-path-of-riddles.onrender.com/api/v1/combined/random",
  //       {
  //         method: "POST",
  //       }
  //     );
  //     const data = await response.json();
  //     setRiddle(data.riddle[0].riddle);
  //     setRiddleSolution(data.riddle[0].solution);
  //     setSolutionSynonyms(data.riddle[0].synonyms);
  //     setRiddleImage(data.imgUrl.url);

  //     setIsLoading(false);
  //   }
  //   randomRiddle();
  // };



     const getRandomRiddle = () => {
    async function randomRiddle() {
      setIsLoading(true);

      const response = await fetch(
        "https://the-path-of-riddles.onrender.com/api/v1/riddles/random"
      );
      const data = await response.json();
      setRiddle(data[0].riddle)
      setRiddleSolution(data[0].solution)
      // setRiddleSolution(data.riddle[0].solution);
      setSolutionSynonyms(data[0].synonyms);
      // setRiddleImage(data.imgUrl.url);

      setIsLoading(false);
    }
    randomRiddle();
  };


// IMAGE REFRESH
  const handleImageRefresh = () => {
    const riddleText = document.getElementsByClassName('riddle-container')[0].innerHTML

    async function refreshImage() {
      
      setIsLoading(true) 
      

      const response = await fetch('https://the-path-of-riddles.onrender.com/api/v1/openai/img', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: ({
          prompt: 'hello'
        })
      })
      // console.log(prompt)
      const newImage = await response.json()
      setRiddleImage(newImage)
      setIsLoading(false) 
      
    }
    refreshImage()
  }




  const handleHint = () => {
    let allHints = [...hint]
    
    const possibleHints = [approximateLength(riddleSolution), averageLetter(riddleSolution), randomLetter(riddleSolution), synonym(solutionSynonyms.split(','))]
    
    //explanation
    let randNum = Math.floor(Math.random() * hintOptions.length);
    
    
    averageLetterCounter > 0 ? possibleHints.filter(x => x !== 0) : possibleHints

    allHints.push(possibleHints[hintOptions[randNum]])

    setHint(allHints)
    console.log(averageLetterCounter)
  console.log(hintOptions)


    if (hintCounter < 3) {
      setPoints(points - 1)
    } else if (hintCounter < 5) {
      setPoints(points - 2)
    } else {
      setPoints(points - 3)
    }
    
    setHintCounter(hintCounter + 1)
  }



  return (
    <div className="game">
      <div className="image-container">
        <img
          src={!riddleImage ? placeholder2 : riddleImage}
          alt={"rendered representation of the riddle"}
          className="riddle-image"
        ></img>
        <RefreshIcon className="refresh-icon" sx={{ fontSize: "64px" }} role='button' onClick={handleImageRefresh}/>

        <div className="points-container">
          <h3>{points}</h3>
          <p>points</p>
        </div>
      </div>

      <p className='riddle-container'>{riddle}</p>

      <div className="input-container">
        <input
          type="text"
          className="input-box"
          placeholder="tell me..."
        ></input>
        <button className={!isLoading ? "submit-button" : "submit-button-disabled"} onClick={getRandomRiddle} disabled={isLoading}>{isLoading? "Loading..." : "Submit"}</button>
      </div>

      <p>hints</p>
      <ul>{hint.map(h => <li key={hint[h]}>
      {h}
      </li>)}</ul>
      <HintsButton handleHint={handleHint}/>
      <p>{riddleSolution}</p>
    </div>
  );
  // </div>
};

export default Game;
