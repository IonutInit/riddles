import { useState } from "react";

import "./Game.css";
import placeholder2 from "../assets/images/placeholder2.jpg";

import RefreshPopUp from "../components/RefreshPopUp";

import RefreshIcon from "@mui/icons-material/Refresh";




const Game = ({imageOptions, available, startingRiddle}) => {
  //game handles
  const [gameSteps, setGameSteps] = useState(1);
  const [points, setPoints] = useState(20);
  
  //riddle element handles
  const [riddle, setRiddle] = useState(startingRiddle);
  const [riddleSolution, setRiddleSolution] = useState("");
  const [solutionSynonyms, setSolutionSynonyms] = useState("");
  const [riddleImage, setRiddleImage] = useState("");

   //hint handles
   const [hint, setHint] = useState([]);
  
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
    console.log(available)
    let randomPick = available[Math.floor(Math.random() * available.length)]
    const randomId = available.splice(available.indexOf(randomPick),1)

    async function randomRiddle() {
      setIsLoading(true);
      const response = await fetch(
        `https://the-path-of-riddles.onrender.com/api/v1/riddles/${randomId}`
      );
      const data = await response.json();
      setRiddle(data[0].riddle);
      setRiddleSolution(data[0].solution);
      // setRiddleSolution(data.riddle[0].solution);
      setSolutionSynonyms(data[0].synonyms);
      // setRiddleImage(data.imgUrl.url);

      setIsLoading(false);
    }
    randomRiddle();
    console.log(randomId)
    console.log(available)
  };





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
      // handlePrompt((e) => {
      //   e.target.value = "";
      // });
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
      <button className='control-buttons hints-button' onClick={handleRefresh}>HINTS</button>
      </div>
      
      <p>{riddleSolution}</p>

      <p>hints</p>
      <p>{gameSteps}</p>
      
      <ul>
        {hint.map((h) => (
          <li key={hint[h]}>{h}</li>
        ))}
      </ul>

          <RefreshPopUp 
            trigger={refreshPopUp}
        setTrigger={setRefreshPopUp}
          />

    </div>
  );
  // </div>
};

export default Game;
