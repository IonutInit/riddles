import './RefreshPopUp.css'

const RefreshPopUp = (props, getRandomRiddle) => {
     return props.trigger ? (     
     <div className='refresh-popup'>
        <div className='refresh-display'>
           <h2>Are you sure?</h2>
           <p>This will cost you 5 points.</p>
           <div className='refresh-button-container'>
            <button className="refresh-buttons">YES</button>
        <button className="refresh-buttons" onClick={() => props.setTrigger(false)}>NO</button> 
           </div>
        
        </div>
        
      </div>
     ) : ("")
}

export default RefreshPopUp;