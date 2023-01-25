import { useState } from "react";

import CustomizedRating from "./Rating";
import YouTube from "react-youtube";

import { clientPath } from "../lib/path";

import "./InfoPopUp.css";
import "../pages/Game.css";

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

  const handleKeyDown = (e) => {
    if (e.key === "x") {
      handleClose();
    }
    if (e.key === "Enter") {
      setAccordion(!accordion);
    }
  };

  return props.trigger ? (
    <div className={`info-popup ${shrinkOnClose ? "info-popup-shrink" : ""}`}>
      {props.gameStart && (
        <>
          <h2 className="rate info-titles">RATE THIS RIDDLE</h2>
          <CustomizedRating imageOptions={imageOptions} />
          <h2 className="info-titles" aria-label="Image options">
            IMAGE OPTIONS
          </h2>
          {props.children}
        </>
      )}

      <div className={`accordion ${!props.gameStart ? "accordion-start" : ""}`}>
        <h2
          className="accordion-title info-titles"
          onClick={() => setAccordion(!accordion)}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          role="button"
          tabIndex="0"
          onKeyDown={(e) => handleKeyDown(e)}
          aria-label="How to play. Press Enter to expand."
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
            <p
              style={{
                textAlign: "center",
                fontSize: "larger",
                color: "var(--color2)",
                paddingTop: "5px",
              }}
            >
              Find the MAGIC WORD!
            </p>
            <YouTube
              className="video"
              videoId="9f5tJ60Ge2A"
              opts={{
                height: "390",
                width: "640",
              }}
            />
            <div className="accordion-line2"></div>
            <p>
              A correct solution will earn you 7 points. A wrong one costs 5
              points. These numbers may vary as the game advances.
            </p>
            <br></br>
            <p className="tip">
              TIP: If you misspell an otherwise correct solution, or submit a
              related word (even misspelled), you will not be penalised.
            </p>
            <br></br>

            <div className="accordion-line2"></div>
            <h3>THE IMAGES</h3>
            <div className="accordion-line2"></div>
            <p>
              The images accompanying each riddle are generated on the spot,
              based on the words of the riddle, by OpenAI&apos;s DALL-E 2 engine.
              Each of them is unique. It did not exist before, and will stop
              existing once it disappers. You can generate another image for the
              current riddle by pressing the refresh button on the upper right
              corner of the image. You can also change the style from the
              settings above.
            </p>
            <br></br>
            <p>Each new image costs 1 point!</p>
            <br></br>
            <p className="tip">
              TIP: It takes about 5-10 seconds to generate a new image. If you
              don&apos;t want to wait that long, or simply don&apos;t care about the
              images, you can deactivate them at any time by pressing the active
              style button (if all buttons look the same, it means that the
              opton has been deactivated).
            </p>
            <br></br>
            <p className="tip">
              Press on any button to reactivate image generation with your
              chosen style.
            </p>
            <br></br>

            <div className="accordion-line2"></div>
            <h3>THE HINTS</h3>
            <div className="accordion-line2"></div>
            <p>
              If you&apos;re stuck just press the HINTS button. The riddle fairies
              will give you one of several hints, at random, which will be more
              or less useful. These include the average letter of the solution
              (as if that&apos;s a thing), a random letter, ending or starting
              letters, or words that are similar in meaning.
            </p>
            <br></br>
            <p className="tip">
              Each hint initally costs 1 point, and will slightly (and randomly)
              increase from there on.
            </p>
            <br></br>
            <p className="tip">
              THE GOOD NEWS is that the hints get better as the game advances!
            </p>
            <br></br>

            <div className="accordion-line2"></div>
            <h3>THE MAGIC WORD</h3>
            <div className="accordion-line2"></div>
            <p>
              The final aim of the game is to guess the{" "}
              <span className="tip">MAGIC WORD</span>. If the solution of a
              riddle that you guessed correctly contains one or more letters of
              the magic word, they will be highlighted{"  "}
              <span
                className="winning-puzzle"
                style={{ background: "black", letterSpacing: "0.25em" }}
              >
                LIKE THIS
              </span>{" "}
              for a few seconds, before the next riddle appears.
            </p>
            <br></br>
            <p>
              Use that time to make a note of the letters. Then, whenever you&apos;re
              ready, SUBMIT THE MAGIC WORD as if it were the solution to the
              riddle that&apos;s currently displaying.
            </p>
            <br></br>
            <p className="tip">
              CAREFUL THOUGH! A wrong submission will cost you the usual 5
              points!
            </p>
          </div>
        )}
      </div>

      {!props.gameStart && (
        <div className="start-limerick">
          <p>There once was a man who loved riddles,</p>
          <p>He solved them with ease, and never did fiddle.</p>
          <p>He&apos;d sit down and think</p>
          <p>Till the answer would sink</p>
          <p>And then he&apos;d laugh and say...</p>
          <p className="start-limerick-last">That was quite the diddle!</p>
          <br></br>
        </div>
      )}

      <br></br>
      {props.gameStart && (
        <>
          <h2 className="info-titles">TROUBLESHOOT</h2>
          <a className="troubleshoot-button-div" href={`${clientPath}`}>
            <button className="troubleshoot-button">
              Press this button to refresh
            </button>
          </a>
        </>
      )}

      <button
        tabIndex="0"
        aria-label="Close"
        className="close-button"
        onClick={handleClose}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        X
      </button>
    </div>
  ) : (
    ""
  );
};

export default InfoPopUp;
