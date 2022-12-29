import "./RefreshPopUp.css";

const RefreshPopUp = (props) => {
  return props.trigger ? (
    <div
      className={`refresh-popup ${
        props.shrinkRefresh ? "refresh-buttons-popup-shrink" : ""
      }`}
    >
      <div className="refresh-display">
        <h2 className="refresh-title">Are you sure?</h2>
        <p>This will cost you 5 points.</p>
        <div className="refresh-button-container">
          {props.children}
          {/* <button className="refresh-buttons" onClick={getRandomRiddle}>YES</button> */}
          {/* <button className="refresh-buttons" onClick={() => props.setTrigger(false)}>NO</button>  */}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default RefreshPopUp;
