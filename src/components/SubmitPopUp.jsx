import { useState } from "react";

import "./SubmitPopUp.css";

const SubmitPopUp = (props) => {
  const [riddle, setRiddle] = useState("");
  const [solution, setSolution] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [warning, setWarning] = useState(false);
  const [thankYou, setThankYou] = useState(false);

  const handleSubmit = () => {
    if (riddle === "" || solution === "" || (email === "" || !email.includes('@'))) {
      setWarning(true);
      return;
    }
    //"required" didn't work!!!
    async function submitRiddle() {
      await fetch("https://the-path-of-riddles.onrender.com/api/v1/riddles/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          riddle,
          solution,
        }),
      });
    }
    submitRiddle();
    setRiddle("");
    setSolution("");
    setEmail("");
    setName("");
    setThankYou(true);
    setTimeout(() => {
      setThankYou(false);
      setWarning(false);
      props.setTrigger(false);
    }, 1500);
  };

  return props.trigger ? (
    <div
      className={
        props.setTrigger ? "submit-popup " : "submit-popup hide-submit"
      }
    >
      {/* <div className="=popup-inner"> */}
      <h3 className="riddle-title">Submit your own riddle</h3>

      <input
        className="riddle-solution"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <p className="fine-print">
        Name, nickname, or dog`s name. It's completely optional.
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
      <p className="fine-print">To prevent spam and maybe to say Thank you!</p>

      <input
        className={`riddle-solution ${
          warning === true && riddle === "" ? "warning" : ""
        }`}
        placeholder="riddle"
        value={riddle}
        onChange={(e) => setRiddle(e.target.value)}
      ></input>
      <p className="fine-print">Give me you best riddle!...</p>

      <input
        className={`riddle-solution ${
          warning === true && solution === "" ? "warning" : ""
        }`}
        type="text"
        placeholder="solution"
        value={solution}
        onChange={(e) => setSolution(e.target.value)}
        required
      ></input>
      <p className="fine-print">...but don't let me guess too much!</p>

      <button className="riddle-submit" onClick={handleSubmit}>
        Submit
      </button>

      {props.children}
      {/* </div> */}

      <button className="close-button" onClick={() => props.setTrigger(false)}>
        X
      </button>

      {thankYou && <p className="after-submission">THANK YOU</p>}
    </div>
  ) : (
    ""
  );
};

export default SubmitPopUp;
