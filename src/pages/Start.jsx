import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import placeholder2 from "../assets/images/placeholder2.jpg";

import "./Start.css";

const Start = ({ handleStart, isLoading, available, gameStart }) => {
  if (available.length > 0) {
    return <Navigate to={"/play"} />;
  }

  return (
    <div className={`start ${gameStart ? "start-start" : ""}`}>
      <h2 className="welcome-text">Welcome</h2>
      <img src={placeholder2} alt={"placeholder"} className="start-image"></img>
      <h2 className="welcome-text">to the Riddles Games</h2>
      <button className="start-button" onClick={handleStart}>
        {!isLoading ? "START GAME" : "Loading..."}
      </button>
    </div>
  );
};

export default Start;
