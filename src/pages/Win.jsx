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
          <p>{`You figured out ${magicWord}!`}</p>
          <p>Well, it won&apos;t be so easy next time...</p> */
        </div>

        <a href={`${clientPath}`}>
          <button className="win-go-back">Play again</button>
        </a>
      </div>
    </div>
  );
};

export default Win;
