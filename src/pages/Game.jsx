import "./Game.css";
import placeholder2 from "../assets/images/placeholder2.jpg";

import RefreshIcon from "@mui/icons-material/Refresh";

const Game = () => {
  return (
    <div className="game">
      {/* <div className="background" style={{backgroundImage: `url(${placeholder2})`,  opacity: '0.1'}}> */}
      <div className="image-container">
        <img
          src={placeholder2}
          alt={"rendered representation of the riddle"}
          className="riddle-image"
        ></img>
        <RefreshIcon className="refresh-icon" sx={{ fontSize: "64px" }} />

        <div className="points-container">
          <h3>21</h3>
          <p>points</p>
        </div>
      </div>

      <p>riddle</p>

      <div className="input-container">
        <input
          type="text"
          className="input-box"
          placeholder="tell me..."
        ></input>
        <button className="submit-button">Submit</button>
      </div>

      <p>hints</p>
    </div>
  );
  // </div>
};

export default Game;
