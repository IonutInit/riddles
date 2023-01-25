/* eslint-disable no-unused-vars */
//Probably due to imperfect design, but I have to import variables which are not used directly

/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
//I have used tabIndex so the user could easily navigate between the elements of the game, until proper keybord navigation is set up.

import { useEffect, useState, useRef, useContext } from "react";
import { Navigate } from "react-router-dom";

import Draggable from "react-draggable";

import "./Game.css";
import "../components/RefreshPopUp.css";
import placeholder from "../assets/images/placeholder.png";
import refreshButton from "../assets/images/refresh-button.png";

import RiddleIdContext from "../components/RiddleIdContext";

import RefreshPopUp from "../components/RefreshPopUp";

import { APIpath } from "../lib/path";
import { key } from "../lib/auth";
import { countPics } from "../lib/countPics";

import {
  averageLetter,
  approximateLengthHarder,
  approximateLengthEasier,
  approximateLengthEasiest,
  randomLetter,
  synonym,
  firstLetter,
  endLetter,
} from "../lib/hints";

import { hints } from "../lib/hintStructure";

import {
  checkSetSimilarity,
  checkSynonymSimilarity,
} from "../lib/checkSimilarity";

import { changePoints } from "../lib/changePoints";

//toggle between generating image or not
let randomRiddleWithPicture = true;

//sets the limit of how many images the user can generate daily (put here for convenience)
//NOT YET USED
let picLimit = 7;
let picCount = JSON.parse(localStorage.getItem("picCount"));

let options = [];
let result = [];

export const usedSynonyms = [];

const Game = ({ imageOptions, available, magicWord }) => {
  //used for Draggable deprecation error
  const nodeRef = useRef(null);

  //toggles image options
  imageOptions === ""
    ? (randomRiddleWithPicture = false)
    : (randomRiddleWithPicture = true);

  const [startEffect, setStartEffect] = useState(false);

  useEffect(() => {
    setStartEffect(true);
    getRandomRiddle();
  }, []);

  //obvious use
  const [win, setWin] = useState(false);
  let winningWord = magicWord;

  //game hooks
  const [gameSteps, setGameSteps] = useState(1);
  const [points, setPoints] = useState(21);

  //riddle element hooks
  const [riddle, setRiddle] = useState("");
  const [riddleSolution, setRiddleSolution] = useState("");
  const [solutionSynonyms, setSolutionSynonyms] = useState("");
  const [riddleImage, setRiddleImage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [_, setRiddleId] = useContext(RiddleIdContext);
  // const [_, setRating] = useContext(RiddleIdContext)

  //hint hooks
  const [hint, setHint] = useState(result);
  const [disableHint, setDisableHint] = useState(false);

  //loading hooks
  const [isLoading, setIsLoading] = useState(false);
  const [pictureIsLoading, setPictureIsLoading] = useState(false);

  //action button hooks (i.e. Refresh and Hint)
  const [refreshPopUp, setRefreshPopUp] = useState(false);

  //submit hooks
  const [input, setInput] = useState("");
  const [notice, setNotice] = useState("");

  //hooks used to toggle the visibility of elements on the picture (i.e. points and hints)
  //also, the hook to provide the animation for closing the refresh overlay, NOT WORKING AT THE MOMENT
  const [pointsVanish, setPointsVanish] = useState(false);
  const [hintsVanish, setHintsVanish] = useState(false);
  const [shrinkRefresh, setShrinkRefresh] = useState(false);

  //In case of fetch errors, to be developed
  const [response, setResponse] = useState("");

  //loss condition activates
  if (points <= 0) {
    return <Navigate to={"/gameover"} />;
  }

  //win condition activated
  if (win) {
    return <Navigate to={"/win"} />;
  }

  //cosmetic for animating the Refresh pop-up on close (not working, see above)
  const handleRefreshClose = () => {
    setShrinkRefresh(true);
    setTimeout(() => {
      setRefreshPopUp(false);
      setShrinkRefresh(false);
    }, 500);
  };

  //RANDOM RIDDLE
  const getRandomRiddle = () => {
    let randomPick = available[Math.floor(Math.random() * available.length)];
    const randomId = available.splice(available.indexOf(randomPick), 1);

    async function randomRiddle() {
      if (!randomRiddleWithPicture) {
        setIsLoading(true);
        const response = await fetch(`${APIpath}/riddles/${randomId}`);
        const data = await response.json();
        setRiddle(data.data[0].riddle);
        setRiddleSolution(data.data[0].solution);
        setSolutionSynonyms(data.data[0].synonyms);
        setRiddleId(data.data[0].id);

        setIsLoading(false);
        setStartEffect(false); //for some reason it didn't want to set itself off in the useEffect at the beginning
      } else {
        countPics(picLimit);
        setIsLoading(true);
        const response = await fetch(`${APIpath}/combined/${randomId}`, {
          method: "POST",
          headers: {
            Authorization: `${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            style: imageOptions,
          }),
        });
        const data = await response.json();

        setRiddle(data.data.riddle[0].riddle);
        setRiddleSolution(data.data.riddle[0].solution);
        setSolutionSynonyms(data.data.riddle[0].synonyms);
        setRiddleImage(data.data.imgUrl.url);
        setRiddleId(data.data.riddle[0].id);
      }
      setIsLoading(false);
      setStartEffect(false); //see comment on first block of IF statement
    }
    randomRiddle();
  };

  //IMAGE REFRESH
  const handleImageRefresh = () => {
    //nothing happens if image options are off
    if (imageOptions === "") {
      return;
    }

    async function getImage() {
      setPictureIsLoading(true);
      setIsLoading(true);
      setPoints(points - 1);
      try {
        const response = await fetch(`${APIpath}/openai/img`, {
          method: "POST",
          headers: {
            Authorization: `${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `${riddle} ${imageOptions}`,
          }),
        });

        if (!response.ok) {
          throw new Error(`That didn't work`);
        }

        const data = await response.json();
        setRiddleImage(data.data.url);
      } catch (error) {
        setResponse(error.message);
      }
      setPictureIsLoading(false);
      setIsLoading(false);
    }
    getImage();
  };

  // //RATINGS
  // const handleRatings = () => {
  //   async function getRiddleRating() {
  //     const response = await fetch(`${APIpath}/v1/ratings/${riddle}`)
  //     const data = response[0].round
  //     setRiddleRating(data)
  //   }
  //   getRiddleRating()
  // }

  ///GAME BEGINS!!!

  const getHints = (solution, synonymsString) => {
    //filters for optiions that are still within the game play and which haven't been yet called more than they are supposed to
    //de-activates the synonyms option if there are no synonyms
    hints.map((x) =>
      x.lowerLimit <= gameSteps && x.upperLimit >= gameSteps
        ? (x.status = true)
        : (x.status = false)
    );

    for (let i = 0; i < hints.length; i++) {
      if (hints[i].points === hints[i].limit) {
        hints[i].status = false;
      }
    }

    let synonymCall = hints.find((x) => x.call === synonym);
    if (!solutionSynonyms.length) {
      synonymCall.status = false;
    }

    //creates an array enumerating the viable options, each of them times their chance
    let availableHints = hints.filter((x) => x.status === true);

    if (availableHints.length === 0) {
      setHint(
        result.push("Oops! Looks like there are no more hints available")
      );
      setDisableHint(true);
      return;
    }

    for (let i = 0; i < availableHints.length; i++) {
      for (let j = 0; j < availableHints[i].chance; j++) {
        options.push(availableHints[i].call);
      }
    }

    //one of these instances is being called to provide the hint
    let rand = Math.floor(Math.random() * options.length);
    setHint(result.push(options[rand](solution, synonymsString)));

    //it adds a point to the instance that has been called
    for (let i = 0; i < availableHints.length; i++) {
      if (availableHints[i].call.name === options[rand].name) {
        availableHints[i].points++;
      }
    }

    //randomly adds one point to the chances of any instance that will still be played after the game reaches 5
    let upcomingHints = hints.filter((x) => x.upperLimit > 5);
    rand = Math.floor(Math.random() * upcomingHints.length);
    upcomingHints[rand].chance++;

    //refreshes the options array for the next call
    options = [];

    return hints;
  };

  //HANDLERS FOR HINTS, REFRESH AND SUBMIT BUTTONS

  const handleHints = (e) => {
    getHints(riddleSolution, solutionSynonyms);
    let allHints = [...result];
    setHint(allHints);
    setPoints((points) => points - changePoints(gameSteps, 1, 3));
    e.preventDefault(); //I'm not seeing any effects(?)
  };

  const refreshHints = () => {
    result = [];
    setHint([]);
    setDisableHint(false);
    setInput("");
    //resets the points of each hint, as the process will start anew
    for (let hint in hints) {
      hints[hint].points = 0;
    }
  };

  const handleRefresh = (e) => {
    setShrinkRefresh(true);
    refreshHints();
    e.preventDefault(); //I'm not seeing any effects(?)
    setTimeout(() => {
      getRandomRiddle();
      setPoints((points) => points - 5);
      setGameSteps((gameSteps) => gameSteps + 1);
      setRefreshPopUp(false);
      setShrinkRefresh(false);
    }, 500);
  };

  const noticeDisplay = (notice) => {
    setNotice(notice);
    setTimeout(() => {
      setNotice("");
    }, 3000);
  };

  const handleSubmit = (e) => {
    if (checkSetSimilarity(input, riddleSolution) === true) {
      //CORRECT
      setGameSteps((gameSteps) => gameSteps + 1);
      setPoints((points) => points + changePoints(gameSteps, 7, 3));
      refreshHints();
      //displays the solution for timeout duration if image options are off, otherwise for the duration of loading
      const solutionArray = riddleSolution.split("");
      setRiddle(
        <span>
          <span className="solution-title"
          >Correct! The answer is</span>
          <br></br>
          <span className="solution">
            {solutionArray.map((s) => (
              <span
                key={solutionArray.indexOf(s)}
                className={winningWord.includes(s) ? "winning-puzzle" : ""}
              >
                {s.toUpperCase()}
              </span>
            ))}
          </span>
        </span>
      );

      setNotice("");
      setIsLoading(true);
      setTimeout(
        () => {
          getRandomRiddle();
          setNotice("");
        },
        imageOptions === "" ? 5000 : 0
      );
    } else if (checkSetSimilarity(input, riddleSolution) === 1) {
      noticeDisplay(`You're very close`);
    } else if (checkSetSimilarity(input, riddleSolution) === null) {
      noticeDisplay(`Field is empty`);
    } else if (checkSetSimilarity(input, riddleSolution) === undefined) {
      if (checkSynonymSimilarity(input, solutionSynonyms) === 2) {
        noticeDisplay(`You're on the right track`);
      } else {
        //INCORRECT!!
        noticeDisplay("Incorrect");
        setGameSteps((gameSteps) => gameSteps + 1);
        setPoints((points) => points - 5);
        setInput("");
      }
      e.preventDefault(); //I'm not seeing any effects(?)
    }

    if (input === winningWord) {
      setWin(true);
    }
  };

  //FINALLY, THE COMPONENT

  return (
    <div className={`game ${startEffect ? "start-effect" : ""}`}>
      <div className="image-container">
        <img
          src={!riddleImage || imageOptions === "" ? placeholder : riddleImage}
          alt={""}
          className="riddle-image"
        ></img>
        <img
          src={refreshButton}
          alt={""}
          className={`refresh-icon ${
            pictureIsLoading ? "picture-loading" : ""
          } ${imageOptions === "" ? "refresh-icon-disabled" : ""}`}
          aria-hidden={true}
          tabIndex="-1"
          onClick={handleImageRefresh}
        />

        <Draggable nodeRef={nodeRef}>
          <div
            ref={nodeRef}
            className={`points-container ${
              pointsVanish ? "points-container-vanish" : ""
            }`}
            onMouseOver={() => setPointsVanish(false)} //has been disabled - replaced by Draggable
            onFocus={() => setPointsVanish(false)} //same as above
            onMouseLeave={() => setPointsVanish(false)}
            role="button" //only to make to element "interactive"
            tabIndex="2"
          >
            <h3>{points}</h3>
            <p>points</p>
          </div>
        </Draggable>

        <div
          className={`hints-container ${
            hintsVanish ? "hints-container-vanish" : ""
          }`}
          onMouseOver={() => setHintsVanish(true)}
          onFocus={() => setHintsVanish(false)}
          onMouseLeave={() => setHintsVanish(false)}
        >
          <ul
            className="hints-list"
            tabIndex="1"
            aria-label="Hints"
            aria-live="polite"
          >
            {hint.map((h) => (
              <li key={hint.indexOf(h)} className="hints-item">
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Draggable nodeRef={nodeRef}>
        <p ref={nodeRef} className="riddle-container" tabIndex="2" aria-live="polite" >
          {riddle}
        </p>
      </Draggable>

      <div className="input-container">
        <input
          type="text"
          className="input-box"
          placeholder="answer me..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
          aria-label='Answer me'
          tabIndex='2'
        ></input>
        <p className="notice" aria-label={notice} aria-live={'assertive'}>{notice}</p>
        <button
          className={!isLoading ? "submit-button" : "submit-button-disabled"}
          onClick={(e) => handleSubmit(e)}
          disabled={isLoading}
          tabIndex='2'
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>

      <div className="control">
        <button
          className="control-buttons refresh-button"
          onClick={() => setRefreshPopUp(true)}
          disabled={isLoading}
          aria-label='Get a new riddle'
        >
          REFRESH
        </button>
        <button
          className="control-buttons hints-button"
          onClick={(e) => handleHints(e)}
          disabled={isLoading || disableHint}
          tabIndex='1'
        >
          HINTS
        </button>
      </div>

      {/* <p>{winningWord}</p> */}

      <RefreshPopUp
        trigger={refreshPopUp}
        shrinkRefresh={shrinkRefresh}
        // setTrigger={setRefreshPopUp}
      >
        <div
          className={`refresh-button-container ${
            shrinkRefresh ? "refresh-popup-shrink" : ""
          }`}
        >
          <button className="refresh-buttons" onClick={(e) => handleRefresh(e)}>
            YES
          </button>
          <button className="refresh-buttons" onClick={handleRefreshClose}>
            NO
          </button>
        </div>
      </RefreshPopUp>
    </div>
  );
};

export default Game;
