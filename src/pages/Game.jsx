import { useEffect, useState } from "react";
import {Navigate} from 'react-router-dom'

import "./Game.css";
import "../components/RefreshPopUp.css"
import placeholder2 from "../assets/images/placeholder2.jpg";

import RefreshPopUp from "../components/RefreshPopUp";

import RefreshIcon from "@mui/icons-material/Refresh";

import {
  averageLetter, 
  approximateLengthHarder, 
  approximateLengthEasier, 
  approximateLengthEasiest, 
  randomLetter, 
  synonym, 
  firstLetter, 
  endLetter  
} from "../lib/hints";

import {hints} from '../lib/hintStructure'

import {checkSetSimilarity, checkSynonymSimilarity} from '../lib/checkSimilarity'

let randomRiddleWithPicture = false;

let options = [];
let result = [];



const Game = ({imageOptions, available}) => { 

  const [startEffect, setStartEffect] = useState(false)

   useEffect(() => {
    // setStartEffect(true)
    setStartEffect(true)
    getRandomRiddle()
    // stopStartEffect()
  },[])

 

  //game handles
  const [gameSteps, setGameSteps] = useState(1);
  const [points, setPoints] = useState(20);
  
  //riddle element handles
  const [riddle, setRiddle] = useState('');
  const [riddleSolution, setRiddleSolution] = useState("");
  const [solutionSynonyms, setSolutionSynonyms] = useState("");
  const [riddleImage, setRiddleImage] = useState("");

   //hint handles
   const [hint, setHint] = useState(result);
  
  //loading handles
  const [isLoading, setIsLoading] = useState(false);
  const [pictureIsLoading, setPictureIsLoading] = useState(false);

  //action button handles (i.e. Refresh and Hint)
  const [refreshPopUp, setRefreshPopUp] = useState(false)
  const [refreshEffect, setRefreshEffect] = useState(false)

  //submit Handles
  const [input, setInput] = useState('')
  const [notice, setNotice] = useState('')

  // const handleRefresh = () => {
  //   setRefreshPopUp(true)
  //   setRefreshEffect(true)
  // }

 
  //I don't know what this is
  const [response, setResponse] = useState("");
 
  // if (points <= 0) {
  //   return <Navigate to={"/gameover"} />;
  // }

  
  const getRandomRiddle = () => {
    // console.log(available)
    let randomPick = available[Math.floor(Math.random() * available.length)]
    const randomId = available.splice(available.indexOf(randomPick),1)
    

    async function randomRiddle() {
      
     
      if (!randomRiddleWithPicture) {
        setIsLoading(true);
    console.log(isLoading)
        const response = await fetch(
        `https://the-path-of-riddles.onrender.com/api/v1/riddles/${randomId}`
      );
      // console.log(response)
      const data = await response.json();
      setRiddle(data[0].riddle);
      setRiddleSolution(data[0].solution);
      // setRiddleSolution(data.riddle[0].solution);
      setSolutionSynonyms(data[0].synonyms);
      // setRiddleImage(data.imgUrl.url);

      setIsLoading(false);
      setStartEffect(false) //for some reason it didn't want to set itself off in the useEffect at the beginning
      } else {
        setIsLoading(true);
        const response = await fetch(`https://the-path-of-riddles.onrender.com/api/v1/combined/${randomId}`, 
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            style: imageOptions
          })
        })
        console.log(response)
        const data = await response.json();
        console.log(data)
        setRiddle(data.riddle[0].riddle)
        setRiddleSolution(data.riddle[0].solution)
        setSolutionSynonyms(data.riddle[0].synonyms)
        setRiddleImage(data.imgUrl.url)
      }  
      setIsLoading(false) 
      setStartEffect(false) //see comment on first block of IF statement
    }
    randomRiddle();
  };

///GAMES BEGIN!!!


const getHints = (solution, synonymsString) => {  

  //filters for optiions that are still within the game play and which haven't been yet called more than they are supposed to 
  hints.map(x => (x.lowerLimit <= gameSteps && x.upperLimit >= gameSteps) ? x.status = true : x.status = false)

  for (let i = 0; i < hints.length; i++) {
      if (hints[i].points === hints[i].limit) {
          hints[i].status = false;
      }
  }

  //creates an array enumerating the viable options each of them times their chance
  let availableHints = hints.filter(x => x.status === true)

  if (availableHints.length === 0) {
    setHint(result.push('There are no more hints available'))
    return;
  }

   for (let i = 0; i < availableHints.length; i++) {
      for(let j = 0; j < availableHints[i].chance; j++) {
          options.push(availableHints[i].call)
      }
  }

  //OPTIONS NEED TO BE FILTERED ACCORDING TO STATUS
  
  //one of these instances is being called to provide the hint
  let rand = Math.floor(Math.random() * options.length)
  setHint(result.push(options[rand](solution, synonymsString)))

  

  //it adds a point for the instance that has been called
  for (let i = 0; i < availableHints.length; i++) {
      if(availableHints[i].call.name === options[rand].name) {
          availableHints[i].points++
      }
  }

  //randomly adds one point to the chances of any instance that will still be played after the game reaches 5
  let upcomingHints = hints.filter(x => x.upperLimit > 5)
  rand = Math.floor(Math.random() * upcomingHints.length)
  upcomingHints[rand].chance++

  console.log(options)

  //refreshes the options array for the next call 
  options = [];

  console.log(hints)

  return hints
}


////////////////////////

const handleHints =() => {
  getHints(riddleSolution, solutionSynonyms)
  let allHints = [...result] 
  setHint(allHints)
  setPoints(points => points - 1)
}


const handleRefresh = () => {
  getRandomRiddle()
  setPoints(points => points - 5)
  setGameSteps(gameSteps => gameSteps + 1)
  setRefreshPopUp(false)
  setHint([])
}


const handleSubmit = () => {
  if(checkSetSimilarity(input, riddleSolution) === true) {
    //CORRECT
    setGameSteps(gameSteps => gameSteps + 1)
    setPoints(points => points + 7)
    setInput('')
    getRandomRiddle()
    // setNotice('Correct!')
  } else if(checkSetSimilarity(input, riddleSolution) === 1) {
    setNotice(`You're very close`)
  } else if(checkSetSimilarity(input, riddleSolution) === null) {
    setNotice(`Field is empty`)
  } else if(checkSetSimilarity(input, riddleSolution) === undefined) {
    if(checkSynonymSimilarity(input, solutionSynonyms) === 2) {
      setNotice(`You're on the right track`)
    } else {
      //INCORRECT!!
      setNotice('Incorrect')
      setGameSteps(gameSteps => gameSteps + 1)
      setPoints(points => points - 5)
      setInput('')  
    }    
  }
}

 

  //IMAGE REFRESH
  const handleImageRefresh = () => {
    
    async function getImage() {
      setPictureIsLoading(true);
      setIsLoading(true)
      setPoints(points - 1);
      try {
        const response = await fetch(
          "https://the-path-of-riddles.onrender.com/api/v1/openai/img",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: `${riddle} ${imageOptions}`,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`That didn't work`);
        }

        const data = await response.json();
        console.log(data.url);
        setRiddleImage(data.url);
      } catch (error) {
        setResponse(error.message);
      }
      setPictureIsLoading(false);
      setIsLoading(false)
    }
    getImage();
    console.log(JSON.stringify(prompt))
  };

  



  return (
    <div className={`game ${startEffect ? 'start-effect' : ''}`}>
      <div className="image-container">
        <img
          src={!riddleImage ? placeholder2 : riddleImage}
          alt={"rendered representation of the riddle"}
          className="riddle-image"
        ></img>
        <RefreshIcon
          className={`refresh-icon ${pictureIsLoading ? 'picture-loading' : ''}`}
          sx={{ fontSize: "64px" }}
          role="button"
          onClick={handleImageRefresh}
        />

        <div className="points-container">
          <h3>{points}</h3>
          <p>points</p>
        </div>
      </div>

      <p className="riddle-container">{riddle}</p>

      <div className="input-container">
        <input
          type="text"
          className="input-box"
          placeholder="tell me..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        >
        </input>
        <button
          className={!isLoading ? "submit-button" : "submit-button-disabled"}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>

      <div className="control">
      <button  className='control-buttons refresh-button' onClick={() => setRefreshPopUp(true)} disabled={isLoading}>REFRESH</button>
      <button className='control-buttons hints-button' onClick={handleHints} disabled={isLoading}>HINTS</button>
      </div>
      
      <p>{riddleSolution}</p>
      <p>{notice}</p>

      <p>hints</p>
      <p>Game steps: {gameSteps}</p>
      
      <ul>
        {hint.map((h) => (
          <li key={hint.indexOf(h)}>{h}</li>
        ))}
        
      </ul>

          <RefreshPopUp 
            trigger={refreshPopUp}
        // setTrigger={setRefreshPopUp}
          > 
          {/* <h2>Are you sure?</h2>
           <p>This will cost you 5 points.</p> */}
           <div className='refresh-button-container'>
            <button className="refresh-buttons" onClick={handleRefresh}>YES</button>
        <button className="refresh-buttons" onClick={() => setRefreshPopUp(false)}>NO</button> 
           </div>
          </RefreshPopUp>

    </div>
  );
  // </div>
};

export default Game;
