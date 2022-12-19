import { useState } from "react";

import SubmitPopUp from "../components/SubmitPopUp";
import InfoPopUp from "../components/InfoPopUp";

import submit_button from "../assets/images/submit_button.svg";
import info_button from "../assets/images/info_button.svg";

import "./Header.css";

const Header = () => {
  const [buttonSubmitPopUp, setButtonSubmitPopUp] = useState(false);
  const [buttonInfoPopUp, setButtonInfoPopUp] = useState(false);

  return (
    <div className="header">
      <div className="header-line"></div>
      <div className="header-content">
        <img
          src={submit_button}
          className="submissions submit-riddle"
          onClick={() => setButtonSubmitPopUp(true)}
          alt="submit your own riddle"
        />
        <img
          src={info_button}
          className=" submissions info"
          onClick={() => setButtonInfoPopUp(true)}
          alt="how to play the game"
        />
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

      <InfoPopUp trigger={buttonInfoPopUp} setTrigger={setButtonInfoPopUp} />
    </div>
  );
};

export default Header;
