import "./SubmitPopUp.css";

const SubmitPopUp = (props) => {
  return props.trigger ? (
    <div className="submit-popup">
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

      <button className="close-button" onClick={() => props.setTrigger(false)}>
        X
      </button>
    </div>
  ) : (
    ""
  );
};

export default SubmitPopUp;
