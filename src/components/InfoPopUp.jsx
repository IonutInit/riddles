import "./InfoPopUp.css";

const InfoPopUp = (props) => {
  return props.trigger ? (
    <div className="info-popup">
      <h2>INFO</h2>

      <button onClick={() => props.setTrigger(false)}>Close</button>
    </div>
  ) : (
    ""
  );
};

export default InfoPopUp;
