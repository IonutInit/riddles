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
  if (windowWidth <= 767) {
    return <Navigate to={"/mobile"} />;
  }

  if (available.length > 0) {
    return <Navigate to={"/play"} replace={true} />;
  }

  const handleKeyDown = (e) => {
    if (e.key === "s") {
      handleStart();
    }
  };

  return (
    <div className={`start ${gameStart ? "start-start" : ""}`}>
      <img src={placeholder} alt={"placeholder"} className="start-image"></img>
      <button
        // eslint-disable-next-line jsx-a11y/tabindex-no-positive
        tabIndex="1"
        className="start-button"
        onClick={handleStart}
        onKeyDown={(e) => handleKeyDown(e)}
        aria-label={!isLoading ? "Start game" : "Game loading"}
      >
        {!isLoading ? "START GAME" : "Loading..."}
      </button>
    </div>
  );
};

export default Start;
