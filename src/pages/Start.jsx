import { Navigate } from "react-router-dom";

import placeholder from "../assets/images/placeholder.png";

import "./Start.css";

const Start = ({
  handleStart,
  isLoading,
  available,
  gameStart,
  windowWidth,
}) => {
  if (windowWidth <= 1079) {
    return <Navigate to={"/mobile"} />;
  }

  if (available.length > 0) {
    return <Navigate to={"/play"} replace={true} />;
  }

  return (
    <div className={`start ${gameStart ? "start-start" : ""}`}>
      <img src={placeholder} alt={"placeholder"} className="start-image"></img>
      <button className="start-button" onClick={handleStart}>
        {!isLoading ? "START GAME" : "Loading..."}
      </button>
    </div>
  );
};

export default Start;
