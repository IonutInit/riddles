import { useState } from "react";

import CustomizedRating from "./Rating";

import "./InfoPopUp.css";

//gameStart prop does not reach to here!

const InfoPopUp = (props, { imageOptions }) => {
  const [accordion, setAccordion] = useState(false);
  const [shrinkOnClose, setShrinkOnClose] = useState(false);

  const handleClose = () => {
    setShrinkOnClose(true);
    setTimeout(() => {
      props.setTrigger(false);
      setShrinkOnClose(false);
    }, 500);
  };

  return props.trigger ? (
    <div className={`info-popup ${shrinkOnClose ? "info-popup-shrink" : ""}`}>
      {props.gameStart && (
        <>
          <h2 className="rate info-titles">RATE THIS RIDDLE</h2>
          <CustomizedRating imageOptions={imageOptions} />

          <h2 className="info-titles">IMAGE OPTIONS</h2>
          {props.children}
        </>
      )}

      <div className={`accordion ${!props.gameStart ? "accordion-start" : ""}`}>
        <h2
          className="accordion-title info-titles"
          onClick={() => setAccordion(!accordion)}
        >
          HOW TO PLAY {accordion ? "-" : "+"}
        </h2>
        <div className="accordion-line"></div>

        {accordion && (
          <div className="accordion-text">
            <p>
              Solve the riddles that appear on the screen. You can ask for
              hints, but it will cost 1 point (or more), as the game advances. A
              succesful submission will earn you 7 points (or more), a wrong
              submission will cost you 5 points. If you misspell a correct
              solution, or submit a related word, you will be notified, and not
              be penalised.
            </p>
            <h3>THE MAGIC WORD</h3>
            <p>
              The final aim of the game is to guess a MAGIC WORD. If a solution
              that you guessed contains one or more letters of that word, they
              will be highlighted for a few seconds, before a new riddle
              appears. Submit the MAGIC WORD whenever you feel ready, but be
              aware that any incorrect submission will cost you the usual 5
              points!
            </p>
            <h3>THE IMAGES</h3>
            <p>
              The images accompanying each riddle is generated on the spot by
              OpenAI's DALL-E 2 engine. Each of them is unique. It did not exist
              before, and will stop existing once it dissapers. You can generate
              another image for the current riddle by pressing the refresh
              button the on the upper right corner of the image. You can also
              change the style of the images from the settings above.
            </p>
            <br></br>
            <p>It takes about 5-10 seconds to generate an image.</p>
            <p>Careful, though, each new image will cost you 1 point!</p>
            <br></br>
            <p className="image-tip">
              TIP: If you don't want to wait that much, or simply don't want any
              images generated, you can de-activate the feature by pressing once
              again the active button. If all buttons look the same, it means
              that the opton has been de-activated.
            </p>
            <p>Push on any button to re-activate it.</p>
          </div>
        )}
      </div>

      {!props.gameStart && (
        <div className="start-limerick">
          <p>There once was a man who loved riddles,</p>
          <p>He solved them with ease, and never did fiddle.</p>
          <p>He'd sit down and think</p>
          <p>Till the answer would sink</p>
          <p>And then he'd laugh and say...</p>
          <p className="start-limerick-last">That was quite the diddle!</p>
        </div>
      )}

      <button className="close-button" onClick={handleClose}>
        X
      </button>
    </div>
  ) : (
    ""
  );
};

export default InfoPopUp;
