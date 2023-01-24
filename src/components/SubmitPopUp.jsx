import { useState } from "react";
import { checkEmail } from "../lib/checkEmail";

import { key } from "../lib/auth";

import "./SubmitPopUp.css";

const SubmitPopUp = (props) => {
  const [riddle, setRiddle] = useState("");
  const [solution, setSolution] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [warning, setWarning] = useState(false);
  const [thankYou, setThankYou] = useState(false);

  const [shrinkOnClose, setShrinkOnClose] = useState(false);

  const handleClose = () => {
    setShrinkOnClose(true);
    setTimeout(() => {
      props.setTrigger(false);
      setShrinkOnClose(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    if (riddle === "" || solution === "" || !checkEmail(email)) {
      setWarning(true);
      return;
    }
    //"required" didn't work!!!
    async function submitRiddle() {
      await fetch("https://the-path-of-riddles.onrender.com/api/v1/riddles/", {
        method: "POST",
        headers: {
          Authorization: `${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          riddle,
          solution,
        }),
      });
    }
    setWarning(false);
    submitRiddle();
    setRiddle("");
    setSolution("");
    setEmail("");
    setName("");
    setThankYou(true);

    setTimeout(() => {
      setThankYou(false);
      setWarning(false);
      handleClose();
    }, 1500);
    e.preventDefault(); //I'm not seeing any effects(?)
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
    if (e.key === "x") {
      handleClose();
    }
  };

  return props.trigger ? (
    <div
      className={`submit-popup ${shrinkOnClose ? "submit-popup-shrink" : ""}`}
    >
      <h3 className="riddle-title">Submit your own riddle</h3>
      <input
        aria-label="Sumit your name"
        className="riddle-solution"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <p className="fine-print" aria-hidden="true">
        Name, nickname, or dog`s name. It's completely optional.
      </p>
      <p className="fine-print" aria-hidden="true">
        I'll use it for attribution.
      </p>

      <input
        className={`riddle-solution ${
          warning === true && email === "" ? "warning" : ""
        }`}
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <p className="fine-print" aria-hidden="true">
        To prevent spam and maybe to say thank you!
      </p>

      <input
        className={`riddle-solution ${
          warning === true && riddle === "" ? "warning" : ""
        }`}
        placeholder="riddle"
        value={riddle}
        onChange={(e) => setRiddle(e.target.value)}
      ></input>
      <p className="fine-print" aria-hidden="true">
        Give me you best riddle!...
      </p>

      <input
        className={`riddle-solution ${
          warning === true && solution === "" ? "warning" : ""
        }`}
        type="text"
        placeholder="solution"
        value={solution}
        onChange={(e) => setSolution(e.target.value)}
      ></input>
      <p className="fine-print" aria-hidden="true">
        ...but don't let me guess too much!
      </p>

      <button
        tabIndex="0"
        className="riddle-submit"
        onClick={(e) => handleSubmit(e)}
        onKeyDown={(e) => handleKeyDown(e)}
        aria-label="Press Enter to submit."
      >
        Submit
      </button>

      {props.children}

      <button
        tabIndex="0"
        className="close-button"
        onClick={handleClose}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        X
      </button>

      {thankYou && <p className="after-submission">THANK YOU</p>}
    </div>
  ) : (
    ""
  );
};

export default SubmitPopUp;
