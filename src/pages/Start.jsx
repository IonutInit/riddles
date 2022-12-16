import { useState } from "react";
import { Navigate } from "react-router-dom";
import placeholder2 from '../assets/images/placeholder2.jpg'

import './Start.css'

const Start = () => {
  const [goToGame, setGoToGame] = useState(false);

  if (goToGame) {
    return <Navigate to={"/play"} />;
  }

  return (
    <div className="start">
      <h2 className="welcome-text">Welcome</h2>
      <img src={placeholder2} alt={'placeholder'} className='start-image'></img>
      <h2 className="welcome-text">to the Riddles Games</h2>
      <button onClick={() => setGoToGame(true)} className='start-button'>START GAME</button>
      
    </div>
  );
};

export default Start;
