import {useState} from 'react'

import CustomizedRating from './Rating';

import "./InfoPopUp.css";

const InfoPopUp = (props) => {

  const [imageOptions, setImageOptions] = useState("expressionist painting")
  const [accordion, setAccordion] = useState(false)
 
  const handleImageOptions = (e) => {
    setImageOptions(e.target.value)
  }

  return props.trigger ? (
    <div className="info-popup">
      <h2 className='rate'>RATE THIS RIDDLE</h2>
      <CustomizedRating />
        <p>Please rate this riddle. Its score will appear here when there are enough ratings.</p>
      <h2>IMAGE OPTIONS</h2>


        <div className="options-container">
          <button value='expressionist painting' className={`options-button ${imageOptions === 'expressionist painting' ? 'option-active' : ''}`} onClick={(e) => handleImageOptions(e)}>Expressionist</button>
          <button value='impressionist painting' className={`options-button ${imageOptions === 'impressionist painting' ? 'option-active' : ''}`} onClick={(e) => handleImageOptions(e)}>Impressionist</button>
          <button value='abstract cubist painting' className={`options-button ${imageOptions === 'abstract cubist painting' ? 'option-active' : ''}`} onClick={(e) => handleImageOptions(e)}>Abstract</button>
          <button value='renaissance painting' className={`options-button ${imageOptions === 'renaissance painting' ? 'option-active' : ''}`} onClick={(e) => handleImageOptions(e)}>Classical</button>
          <button value='photorealistic painting' className={`options-button ${imageOptions === 'photorealistic painting' ? 'option-active' : ''}`} onClick={(e) => handleImageOptions(e)}>Photorealist</button>
          <button value='cartoon style' className={`options-button ${imageOptions === 'cartoon style' ? 'option-active' : ''}`} onClick={(e) => handleImageOptions(e)}>Cartoonish</button>
        </div>

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
