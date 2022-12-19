import { useState } from "react";
import {
  checkSetSimilarity,
  checkSynonymSimilarity,
} from "../game-logic/checkSimilarity";

import placeholder2 from "../assets/images/placeholder2.jpg";

const RandomRiddle = () => {
  const [randomRiddle, setRandomRiddle] = useState("");
  const [riddleSolution, setRiddleSolution] = useState("");
  const [solutionSynonyms, setSolutionSynonyms] = useState("");
  const [riddleImage, setRiddleImage] = useState("");

  const [result, setResult] = useState("");
  const [synonymResult, setSynonymResult] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  //gets random riddle
  const getRandomRiddle = () => {
    async function randomRiddle() {
      setIsLoading(true);

      const response = await fetch(
        "https://the-path-of-riddles.onrender.com/api/v1/combined/random",
        {
          method: "POST",
        }
      );
      const data = await response.json();
      setRandomRiddle(data.riddle[0].riddle);
      setRiddleSolution(data.riddle[0].solution);
      setSolutionSynonyms(data.riddle[0].synonyms);
      setRiddleImage(data.imgUrl.url);

      setIsLoading(false);
    }
    randomRiddle();
  };

  //checks similarity of both input and synonyms
  const handleResult = (e) => {
    const synonymArr = solutionSynonyms.split(" ");
    setResult(checkSetSimilarity(e.target.value, riddleSolution));
    setSynonymResult(checkSynonymSimilarity(e.target.value, synonymArr));
  };

  return (
    <div>
      <div>
        <img
          src={!riddleImage ? placeholder2 : riddleImage}
          alt="riddle representation"
        ></img>
      </div>

      <h3>{randomRiddle}</h3>
      {/* <h5>{riddleSolution}</h5>
      <p>{solutionSynonyms}</p> */}

      <input type="text" onChange={(e) => handleResult(e)}></input>
      <button onClick={() => getRandomRiddle()}>
        {isLoading ? "Loading..." : "Get riddle"}
      </button>

      {result !== "" && <h3>{result}</h3> && synonymResult !== "" && (
        <h3>{synonymResult}</h3>
      )}
    </div>
  );
};

export default RandomRiddle;
