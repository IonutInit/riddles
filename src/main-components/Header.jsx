import { useState } from "react";

import PopUp from "../components/PopUp";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import "./Header.css";

const Header = () => {
  const [buttonPopUp, setButtonPopUp] = useState(false);

  return (
    <div className="header">
      <div className="header-line"></div>
      <div className="header-content">
        <AddCircleIcon />
      </div>

      <button className="submit-riddle" onClick={() => setButtonPopUp(true)}>
        Open PopUp
      </button>

      <PopUp trigger={buttonPopUp} setTrigger={setButtonPopUp}>
        <h1>My popup</h1>
        <p>this is my popup</p>
      </PopUp>
    </div>
  );
};

export default Header;
