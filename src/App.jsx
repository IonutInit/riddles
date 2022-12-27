import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useState} from 'react'

import Header from "./main-components/Header";
import Footer from "./main-components/Footer";

import Start from "./pages/Start";
import Game from "./pages/Game";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [available, setAvailable] = useState([])
  const [startingRiddle, setStartingRiddle] = useState([])
  

  const getAvailable = () => {   
    async function availableArray() {
      const arr = []
      const response = await fetch('https://the-path-of-riddles.onrender.com/api/v1/riddles/available')
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
              arr.push(data[i].id);
            }
      setAvailable(arr)
    } 
    availableArray()    
  }


  const getFirstRiddle = () => {
    let id = available[Math.floor(Math.random() * available.length)]

    async function firstRiddle() {
      const response = await fetch(`https://the-path-of-riddles.onrender.com/api/v1/riddles/${id}`)
      const data = await response.json()
      setStartingRiddle(data[0].riddle)
    }
    firstRiddle()
  }

  const handleStart = () => {
    setIsLoading(true)
    getAvailable()    
    getFirstRiddle()
    setIsLoading(false)
    console.log(startingRiddle)
   
  }







  const [imageOptions, setImageOptions] = useState("expressionist painting")
  
  const handleImageOptions = (e) => {
    setImageOptions(e.target.value)
  }

  return (
    <div className="App">
      <Router>
        <Header imageOptions={imageOptions} handleImageOptions={handleImageOptions}/>
        <Routes>
          <Route path="/" element={<Start handleStart={handleStart} isLoading={isLoading} available={available}/>} />
          <Route path="/play" element={<Game imageOptions={imageOptions} available={available} startingRiddle={startingRiddle}/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
