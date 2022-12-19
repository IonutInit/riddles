import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import StartAccordion from "../components/StartAccordion";

import placeholder2 from "../assets/images/placeholder2.jpg";

import "./Start.css";

const Start = () => {



  const [isLoading, setIsLoading] = useState(false);
  const [goToGame, setGoToGame] = useState(false);
  const [availableRiddles, setAvailableRiddles] = useState(); 
 



  const [riddle, setRiddle] = useState("");
  const [riddleSolution, setRiddleSolution] = useState("");
  const [solutionSynonyms, setSolutionSynonyms] = useState("");
  const [riddleImage, setRiddleImage] = useState("");

useEffect(() => {
  const available = []
  async function riddleArray() {
    const response = await fetch('https://the-path-of-riddles.onrender.com/api/v1/riddles/available')
    const data = await response.json()        
    for (let i = 0; i < data.length; i++) {
      available.push(data[i].id)
    }  
    setAvailableRiddles(available)
  }
  riddleArray()
},[])

console.log(availableRiddles)


  const handleStart = () => {
    setIsLoading(true)

    async function getRiddle() {
      const response = await fetch('http://localhost:4000/api/v1/combined/2', {
        method: 'POST'
      })
      const data = await response.json();
      setRiddle(data.riddle[0].riddle);
       setRiddleSolution(data.riddle[0].solution);
       setSolutionSynonyms(data.riddle[0].synonyms);
       setRiddleImage(data.imgUrl.url);
    }


    setIsLoading(false)
}

  // if (goToGame) {
  
  //   console.log(availableRiddles)
  //   return <Navigate to={"/play"} />;
  // }

  return (
    <div className="start">
      <h2 className="welcome-text">Welcome</h2>
      <img src={placeholder2} alt={"placeholder"} className="start-image"></img>
      <h2 className="welcome-text">to the Riddles Games</h2>
      <button className="start-button" onClick={handleStart}>
        {!isLoading ? "START GAME" : "Loading..."}
      </button>
      {/* <StartAccordion /> */}
    </div>
  );
};

export default Start;
