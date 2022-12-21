import "./SubmitPopUp.css";

const SubmitPopUp = (props) => {
  return props.trigger ? (
    <div className={props.setTrigger ? "submit-popup " : "submit-popup hide-submit"}>
      {/* <div className="=popup-inner"> */}
      <h3 className="riddle-title">Submit your own riddle</h3>
      <input className="riddle-text" placeholder="riddle"></input>
      <input
        className="riddle-solution"
        type="text"
        placeholder="solution"
      ></input>
      <button className="riddle-submit">Submit</button>

      {props.children}
      {/* </div> */}

      <button className="close-button" onClick={() => props.setTrigger(false)}>X</button>

      {/* <button className="close-button" onClick={
        setTimeout(() => props.setTrigger(false), 3000)}>
        X
        </button> */}
    </div>
  ) : (
    ""
  );
};

export default SubmitPopUp;
