import {useState} from 'react'

import CustomizedRating from './Rating';

import "./InfoPopUp.css";

const InfoPopUp = (props) => {

  // const [imageOptions, setImageOptions] = useState("expressionist painting")
  const [accordion, setAccordion] = useState(false)
 
 

  return props.trigger ? (
    <div className="info-popup">
      <h2 className='rate'>RATE THIS RIDDLE</h2>
      <CustomizedRating />
        <p>Please rate this riddle. Its score will appear here when there are enough ratings.</p>
      <h2>IMAGE OPTIONS</h2>
        {props.children}       

      <div className='accordion'>
        <h2 className='accordion-title' onClick={() => setAccordion(!accordion)}>HOW TO PLAY {accordion ? '-' : '+'}</h2>
        <div className='accordion-line'></div>
        
        {accordion &&<p className='accordion-text'>How to play</p>}

      </div>
      
      <button className="close-button" onClick={() => props.setTrigger(false)}>X</button>
    </div>
  ) : (
    ""
  );
};

export default InfoPopUp;
