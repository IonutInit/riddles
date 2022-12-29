import {useState} from 'react'
import { Navigate } from "react-router-dom";

import './Lose.css'
import gameOver from '../assets/images/game_over.png'

//For the time being, on win/lose conditions gamseState is not reset, which means '/' navigates directly to '/play'
//This might actually better, at least for losing. If kept like that, check that all the other parameters are reset

const Lose = () => {
  const [goBack, setGoBack] = useState(false)

  if(goBack) {    
      return <Navigate to={'/'}/>   
  }


  return (
    <div>
      <div className="game-over-container">
        <div className="game-over-image-container">
          <img
          src={gameOver}
          alt={'a cartoonish monster'}
          className='lose-image'
          >
          </img>

        <div className='sympathies-container'>
          <h2>THOU HAST BEEN RIDDLETH!</h2>
          <h4>It stands written in the annals:</h4>
          <p>When the riddler runneth out of points, they have been riddleth.</p>
        </div>

        <button className='lose-go-back' onClick={() => setGoBack(true)}>
            Play again
        </button>
        </div>
      </div>
    </div>
  );
};

export default Lose;
