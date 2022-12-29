import { useState } from "react";

import CustomizedRating from "./Rating";

import "./InfoPopUp.css";

const InfoPopUp = (props, { imageOptions }) => {
  // const [imageOptions, setImageOptions] = useState("expressionist painting")
  const [accordion, setAccordion] = useState(false);

  return props.trigger ? (
    <div className="info-popup">
      <h2 className="rate info-titles">RATE THIS RIDDLE</h2>
      <CustomizedRating imageOptions={imageOptions} />
      <h2 className="info-titles">IMAGE OPTIONS</h2>
      {props.children}

      <div className="accordion">
        <h2
          className="accordion-title info-titles"
          onClick={() => setAccordion(!accordion)}
        >
          HOW TO PLAY {accordion ? "-" : "+"}
        </h2>
        <div className="accordion-line"></div>

        {accordion && <div className="accordion-text">
          <p>Solve the riddles that appear on the screen. You can ask for hints, but it will cost 1 point (or more), as the game advances. A succesful submission will earn you 7 points (or more), a wrong submission will cost you 5 points. If you misspell a correct solution, or submit a related word, you will be notified, and not be penalised.</p>
          <h3>THE MAGIC WORD</h3>
          <p>The final aim of the game is to guess a MAGIC WORD. If a solution that you guessed contains one or more letters of that word, they will be highlighted for a few seconds, before a new riddle appears. Submit the MAGIC WORD whenever you feel ready, but be aware that any incorrect submission will cost you the usual 5 points!</p>
          <h3>THE IMAGES</h3>
          <p>The images accompanying each riddle is generated on the spot by OpenAI's DALL-E 2 engine. Each of them is unique, did not exist before, and will stop existing once it dissapers. You can generate another image for the current riddle by pressing the refresh button the on the upper right corner of the image. You can also change the style of the images from the settings above.</p>
          <p>Careful, though, each new image will cost you 1 point!</p>
        </div>        
        }
      </div>

      <button className="close-button" onClick={() => props.setTrigger(false)}>
        X
      </button>
    </div>
  ) : (
    ""
  );
};

export default InfoPopUp;
