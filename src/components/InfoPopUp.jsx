import { useState } from "react";
import { Navigate } from "react-router-dom";

import CustomizedRating from "./Rating";
import YouTube from "react-youtube";

import "./InfoPopUp.css";
import "../pages/Game.css";

//gameStart prop does not reach to here!

const InfoPopUp = (props, { imageOptions }) => {
  const [accordion, setAccordion] = useState(false);
  const [shrinkOnClose, setShrinkOnClose] = useState(false);

  // //used for 'refreshing'
  // const linkRefresh = window.location.hostname;

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
            <p style={{ textAlign: "center", fontSize: "larger" }}>
              You start with 21 points. Solve the riddles that appear on screen,
              while keeping your positive score.
            </p>
            <YouTube
              className="video"
              videoId="j1smw1qbpoE"
              opts={{
                height: "390",
                width: "640",
              }}
            />
            <div className="accordion-line2"></div>
            <p>
              A correct solution will earn you 7 points. A wrong one will cost 5
              points. These numbers will change slightly as the game advances.
            </p>
            <br></br>
            <p className="tip">
              TIP: If you misspell an otherwise correct solution, or submit a
              related word (even misspelled), you will not penalised.
            </p>
            <br></br>

            <div className="accordion-line2"></div>
            <h3>THE IMAGES</h3>
            <div className="accordion-line2"></div>
            <p>
              The images accompanying each riddle are generated on the spot by
              OpenAI's DALL-E 2 engine. Each of them is unique. It did not exist
              before, and will stop existing once it dissapers. You can generate
              another image for the current riddle by pressing the refresh
              button the on the upper right corner of the image. You can also
              change the style of the images from the settings above.
            </p>
            <br></br>
            <p>Each new image costs 1 point!</p>
            <br></br>
            <p className="tip">
              TIP: It takes about 5-10 seconds to generate an image. If you
              don't want to wait that much, or simply don't care about the
              images, you can de-activate them at any time by pressing on the
              active button (if all buttons look the same, it means that the
              opton has been de-activated).
            </p>
            <br></br>
            <p className="tip">
              Press on any button to re-activate image generation with your
              chosen style.
            </p>
            <br></br>

            <div className="accordion-line2"></div>
            <h3>THE HINTS</h3>
            <div className="accordion-line2"></div>
            <p>
              If you're stuck just press the HINTS button. The riddle fairies
              will give you one of several random hints, at random, which will
              be more or less useful. These include the average letter of the
              solution (as if that's a thing), a random letter, ending or
              starting letters, or words that are similar in meaning.
            </p>
            <br></br>
            <p className="tip">
              Each hint initally costs 1 point, and will slightly (and randomly)
              increase from there on.
            </p>
            <br></br>
            <p className="tip">
              THE GOOD NEWS is that the hints will get better as you advance in
              the game!
            </p>
            <br></br>

            <div className="accordion-line2"></div>
            <h3>THE MAGIC WORD</h3>
            <div className="accordion-line2"></div>
            <p className="tip">There is an end to it all!</p>
            <br></br>
            <p>
              The final aim of the game is to guess the MAGIC WORD. If the
              solution of a riddle that you guessed correctly contains one or
              more letters of that word, they will be highlighted{"  "}
              <span
                className="winning-puzzle"
                style={{ background: "black", letterSpacing: "0.25em" }}
              >
                LIKE THIS
              </span>{" "}
              for a few seconds, before a new riddle appears.
            </p>
            <br></br>
            <p>
              Use that time to make a note of the letters. Then, whenever you're
              ready, SUBMIT THE MAGIC WORD as if it were the solution to the
              riddle that's currently displaying.
            </p>
            <br></br>
            <p className="tip">
              CAREFUL THOUGH! A wrng submission will cost you thye usual 5
              points!
            </p>
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
          <br></br>
        </div>
      )}

      <br></br>
      {props.gameStart && (
        <>
          <h2 className="info-titles">TROUBLESHOOT</h2>
          <button
            className="troubleshoot-button"
            onClick={() => window.location.assign(window.location.hostname)}
          >
            Press this button to refresh
          </button>
        </>
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
