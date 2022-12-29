import { Navigate } from "react-router-dom";

import placeholder from "../assets/images/placeholder.png";

import "./Start.css";

const Start = ({ handleStart, isLoading, available, gameStart}) => {
  if (available.length > 0) {
    return <Navigate to={"/play"} />;
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
