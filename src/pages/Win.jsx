import { clientPath } from "../lib/path";

import "./Win.css";
import win from "../assets/images/win.png";

//see comment in Loose.jsx regarding navigation

const Win = ({ magicWord }) => {
  return (
    <div className="win-container">
      <div className="win-image-container">
        <img
          src={win}
          alt={"an abstract painting with a flower in the middle"}
          className="win-image"
        ></img>
        <div className="congratulations-container">
          <h2>Congratulations!</h2>
          <h4>You made it!</h4>
          <p>{`How did you manage to figure out ${magicWord}?!`}</p>
          <p>Well cheers to you!!!</p>
        </div>

        <a href={`${clientPath}`}>
          <button className="win-go-back">Play again</button>
        </a>
      </div>
    </div>
  );
};

export default Win;
