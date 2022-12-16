import "./PopUp.css";

const PopUp = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="=popup-inner">
        <button
          className="close-button"
          onClick={() => props.setTrigger(false)}
        >
          Close me
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopUp;
