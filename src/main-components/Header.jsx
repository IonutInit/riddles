import { useState, useRef } from "react";

import SubmitPopUp from "../components/SubmitPopUp";
import InfoPopUp from "../components/InfoPopUp";

import submit_button from "../assets/images/submit_button.svg";
import info_button from "../assets/images/info_button.svg";

import "./Header.css";

//toggle buttons disabled state
const buttonState = false;

const Header = ({ imageOptions, handleImageOptions, gameStart }) => {
  const [buttonSubmitPopUp, setButtonSubmitPopUp] = useState(false);
  const [buttonInfoPopUp, setButtonInfoPopUp] = useState(false);

  const inputRef = useRef()

  const handleKeyDown = (e) => {
    if (e.key === "i") {
      setButtonInfoPopUp(true);
      // console.log("you pressed i");
    }
    if (e.key === "s") {
      setButtonSubmitPopUp(true);
      // console.log("you pressed r");
    }
  };

  return (
    <div className="header">
      <div className="header-line"></div>
      <div className="header-title">The Riddle Fiddle</div>
      <div className="header-content">
        {gameStart && (
          <img
            src={submit_button}
            className="submissions submit-riddle"
            onClick={() => setButtonSubmitPopUp(true)}
            role='button'
            tabIndex="0"
            onKeyDown={(e) => handleKeyDown(e)}
            alt=""
            aria-label="Press s if you want to submit your own riddle."
            aria-haspopup='true'
          />
        )}

        <img
          src={info_button}
          className="submissions submissions-leftwards info"
          onClick={() => setButtonInfoPopUp(true)}
          role='button'
          tabIndex="0"
          onKeyDown={(e) => handleKeyDown(e)}
          alt=""
          aria-label="Press i for more info and options."
          aria-haspopup='true'
        />
      </div>

      <SubmitPopUp
        trigger={buttonSubmitPopUp}
        setTrigger={setButtonSubmitPopUp}
      ></SubmitPopUp>

      <InfoPopUp
        trigger={buttonInfoPopUp}
        setTrigger={setButtonInfoPopUp}
        imageOptions={imageOptions}
        gameStart={gameStart}
      >
        <div className="options-container">
          <button
            value="expressionist painting"
            className={`options-button ${
              imageOptions === "expressionist painting" ? "option-active" : ""
            }`}
            onClick={(e) => handleImageOptions(e)}
            disabled={buttonState}
            ref={inputRef}
          >
            Expressionist
          </button>
          <button
            value="impressionist painting"
            className={`options-button ${
              imageOptions === "impressionist painting" ? "option-active" : ""
            }`}
            onClick={(e) => handleImageOptions(e)}
            disabled={buttonState}
            ref={inputRef}
          >
            Impressionist
          </button>
          <button
            value="abstract cubist painting"
            className={`options-button ${
              imageOptions === "abstract cubist painting" ? "option-active" : ""
            }`}
            onClick={(e) => handleImageOptions(e)}
            disabled={buttonState}
            ref={inputRef}
          >
            Abstract
          </button>
          <button
            value="renaissance painting"
            className={`options-button ${
              imageOptions === "renaissance painting" ? "option-active" : ""
            }`}
            onClick={(e) => handleImageOptions(e)}
            disabled={buttonState}
            ref={inputRef}
          >
            Classical
          </button>
          <button
            value="photorealistic painting"
            className={`options-button ${
              imageOptions === "photorealistic painting" ? "option-active" : ""
            }`}
            onClick={(e) => handleImageOptions(e)}
            disabled={buttonState}
            ref={inputRef}
          >
            Photorealist
          </button>
          <button
            value="watercolour"
            className={`options-button ${
              imageOptions === "watercolour" ? "option-active" : ""
            }`}
            onClick={(e) => handleImageOptions(e)}
            disabled={buttonState}
            ref={inputRef}
          >
            Watercolour
          </button>
          <button
            value="pencil sketch"
            className={`options-button ${
              imageOptions === "pencil sketch" ? "option-active" : ""
            }`}
            onClick={(e) => handleImageOptions(e)}
            disabled={buttonState}
            ref={inputRef}
          >
            Pencil Sketch
          </button>
        </div>
      </InfoPopUp>
    </div>
  );
};

export default Header;
