import { clientPath } from "../lib/path";

import "./Lose.css";
import gameOver from "../assets/images/game_over.png";

//I have tried to route to '/' (which due to gameState would navigate directly to '/play') but due to uni-directional data flow I could not reset the hints, so I oped for a hard refresh on 'Play Again'

const Lose = () => {
  return (
    <div>
      <div className="game-over-container">
        <div className="game-over-image-container">
          <img
            src={gameOver}
            alt={"a cartoonish monster"}
            className="lose-image"
          ></img>

          <div className="sympathies-container">
            <h2>THOU HAST BEEN RIDDLETH!</h2>
            <h4>It stands written in the annals:</h4>
            <p>
              When the riddler runneth out of points, they have been riddleth.
            </p>
          </div>

          <a href={`${clientPath}`}>
            <button className="lose-go-back">Play again</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Lose;
