import { useState } from "react";

import SubmitPopUp from "../components/SubmitPopUp";
import InfoPopUp from "../components/InfoPopUp";

import submit_button from "../assets/images/submit_button.svg";
import info_button from "../assets/images/info_button.svg";

import "./Header.css";

const Header = ({imageOptions, handleImageOptions, gameStart}) => {
  const [buttonSubmitPopUp, setButtonSubmitPopUp] = useState(false);
  const [buttonInfoPopUp, setButtonInfoPopUp] = useState(false);

  const handleKeyDown = (e) => {
    if(e.key === 'i') {
      setButtonInfoPopUp(true)
      console.log('you pressed i')
    }
    if(e.key === 'r') {
      setButtonSubmitPopUp(true)
      console.log('you pressed r')
    }
  }

   return (
    <div className="header">
      <div className="header-line"></div>
      <div className="header-content">
       { gameStart && <img
          src={submit_button}
          className="submissions submit-riddle"
          onClick={() => setButtonSubmitPopUp(true)}
          tabIndex='0'
          onKeyDown={(e) => handleKeyDown(e)}
        />}
        {gameStart && <img
          src={info_button}
          className=" submissions info"
          onClick={() => setButtonInfoPopUp(true)}
          tabIndex='0'
          onKeyDown={(e) => handleKeyDown(e)}
        />}
      </div>

      {/* <button className="submit-riddle" onClick={() => setButtonPopUp(true)}>
        Open PopUp
      </button> */}

      <SubmitPopUp
        trigger={buttonSubmitPopUp}
        setTrigger={setButtonSubmitPopUp}
      >
        {/* <h1>My popup</h1>
        <p>this is my popup</p> */}
      </SubmitPopUp>

      <InfoPopUp trigger={buttonInfoPopUp} setTrigger={setButtonInfoPopUp} > 
      <div className="options-container">
          <button value='expressionist painting' className={`options-button ${imageOptions === 'expressionist painting' ? 'option-active' : ''}`} onClick={(e) => handleImageOptions(e)}>Expressionist</button>
          <button value='impressionist painting' className={`options-button ${imageOptions === 'impressionist painting' ? 'option-active' : ''}`} onClick={(e) => handleImageOptions(e)}>Impressionist</button>
          <button value='abstract cubist painting' className={`options-button ${imageOptions === 'abstract cubist painting' ? 'option-active' : ''}`} onClick={(e) => handleImageOptions(e)}>Abstract</button>
          <button value='renaissance painting' className={`options-button ${imageOptions === 'renaissance painting' ? 'option-active' : ''}`} onClick={(e) => handleImageOptions(e)}>Classical</button>
          <button value='photorealistic painting' className={`options-button ${imageOptions === 'photorealistic painting' ? 'option-active' : ''}`} onClick={(e) => handleImageOptions(e)}>Photorealist</button>
          <button value='cartoon style' className={`options-button ${imageOptions === 'cartoon style' ? 'option-active' : ''}`} onClick={(e) => handleImageOptions(e)}>Cartoonish</button>
        </div>

        

      </InfoPopUp>
    </div>
  );
};

export default Header;
