import { useEffect, useState } from "react";

import "./Game.css";
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
import { CompressOutlined } from "@mui/icons-material";


let randomRiddleWithPicture = true;

let options = [];
let result = [];


let hints = [
  {
      call: averageLetter,
      status: null,
      points: 0, //how many times has been played this turn
      limit: 1, //how many times can be played by turn
      lowerLimit: 1, //it is available each turn within the lower/upper limits of the game
      upperLimit: 4, 
      chance: 2, //the chance of it being called out of the summ of all chances 
  },
  {
      call: approximateLengthHarder,
      status: null,
      points: 0,
      limit: 1,
      lowerLimit: 1,
      upperLimit: 5, 
      chance: 2,       
  },
  {
      call: approximateLengthEasier,
      status: null,
      points: 0,
      limit: 1,
      lowerLimit: 6,
      upperLimit: 10,
      chance: 1,       
  },
  {
      call: approximateLengthEasiest,
      status: null,
      points: 0,
      limit: 1,
      lowerLimit: 11,
      upperLimit: 200,
      chance: 1,        
  },
  {
      call: randomLetter,
      status: null,
      points: 0,
      limit: 3,
      lowerLimit: 1,
      upperLimit: 200, 
      chance: 1,       
  },
  {
      call: synonym,
      status: null,
      points: 0,
      limit: 2,
      lowerLimit: 1,
      upperLimit: 200,
      chance: 1,        
  },
  {
      call: endLetter,
      status: null,
      points: 0,
      limit: 1,
      lowerLimit: 3,
      upperLimit: 200,
      chance: 1,        
  },
  {
      call: firstLetter,
      status: null,
      points: 0,
      limit: 1,
      lowerLimit: 5,
      upperLimit: 200, 
      chance: 2,       
  },
]




const Game = ({imageOptions, available}) => {

  
 
  useEffect(() => {
    getRandomRiddle()
    console.log(hints)
  },[])

  //game handles
  const [gameSteps, setGameSteps] = useState(5);
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

  //action button handles
  const [refreshPopUp, setRefreshPopUp] = useState(false)
  const [refreshEffect, setRefreshEffect] = useState(false)


  const handleRefresh = () => {
    setRefreshPopUp(true)
    setRefreshEffect(true)
  }

 
  //I don't know what this is
  const [response, setResponse] = useState("");

 


  const getRandomRiddle = () => {
    // console.log(available)
    let randomPick = available[Math.floor(Math.random() * available.length)]
    const randomId = available.splice(available.indexOf(randomPick),1)

    async function randomRiddle() {
      setIsLoading(true);

      if (!randomRiddleWithPicture) {
        const response = await fetch(
        `https://the-path-of-riddles.onrender.com/api/v1/riddles/${randomId}`
      );
      console.log(response)
      const data = await response.json();
      setRiddle(data[0].riddle);
      setRiddleSolution(data[0].solution);
      // setRiddleSolution(data.riddle[0].solution);
      setSolutionSynonyms(data[0].synonyms);
      // setRiddleImage(data.imgUrl.url);

      setIsLoading(false);
      } else {
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
    }
    randomRiddle();
    setIsLoading(false);
    // console.log(randomId)
    // console.log(available)
  };


  // const getRandomRiddle = () => {
  //   async function randomRiddle() {
  //     let randomPick = available[Math.floor(Math.random() * available.length)]
  //   const randomId = available.splice(available.indexOf(randomPick),1)

  //   try {
  //     const response = await fetch(`https://the-path-of-riddles.onrender.com/api/v1/combined/${randomId}`)
  //     console.log(response)
      

  //   // setRiddle(data.riddle[0].riddle)
  //   // setRiddleSolution(data.riddle[0].solution)
  //   // setSolutionSynonyms(data.riddle[0].synonyms)
  //   // setRiddleImage(data.imgUrl.url)

  //   } catch (error) {
  //     setResponse(error.message)
  //   }

    
  //   }

  //   randomRiddle()
  // }




///GAMES BEGIN!!!


const getHints = (solution, synonymsString) => {  

  //filters for optiions that are still within the game play and which haven't been yet called more than they are supposed to 
  hints.map(x => (x.lowerLimit < gameSteps && x.upperLimit > gameSteps) ? x.status = true : x.status = false)

  for (let i = 0; i < hints.length; i++) {
      if (hints[i].points === hints[i].limit) {
          hints[i].status = false;
      }
  }

  //creates an array enumerating the viable options each of them times their chance
  let availableHints = hints.filter(x => x.status === true)

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

  return hints
}

const handleHints =() => {
  getHints(riddleSolution, solutionSynonyms)
  let allHints = [...result] 
  setHint(allHints)
  setPoints(points => points - 1)
}





////////////////////////
 

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
    <div className={`game ${refreshEffect ? 'refresh-effect' : ''}`}>
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
        ></input>
        <button
          className={!isLoading ? "submit-button" : "submit-button-disabled"}
          onClick={getRandomRiddle}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>

      <div className="control">
      <button  className='control-buttons refresh-button' onClick={() => setRefreshPopUp(true)}>REFRESH</button>
      <button className='control-buttons hints-button' onClick={handleHints}>HINTS</button>
      </div>
      
      <p>{riddleSolution}</p>

      <p>hints</p>
      <p>Game steps: {gameSteps}</p>
      
      <ul>
        {hint.map((h) => (
          <li >{h}</li>
        ))}
        
      </ul>

          <RefreshPopUp 
            trigger={refreshPopUp}
        setTrigger={setRefreshPopUp}
          > 
          <h2>Are you sure?</h2>
           <p>This will cost you 5 points.</p>
           <div className='refresh-button-container'>
            <button className="refresh-buttons">YES</button>
        <button className="refresh-buttons" onClick={() => props.setTrigger(false)}>NO</button> 
           </div>
          </RefreshPopUp>

    </div>
  );
  // </div>
};

export default Game;
