import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useState} from 'react'

import Header from "./main-components/Header";
import Footer from "./main-components/Footer";

import Start from "./pages/Start";
import Game from "./pages/Game";

function App() {
  const [imageOptions, setImageOptions] = useState("expressionist painting")

  const handleImageOptions = (e) => {
    setImageOptions(e.target.value)
  }

  return (
    <div className="App">
      <Router>
        <Header imageOptions={imageOptions} handleImageOptions={handleImageOptions}/>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/play" element={<Game imageOptions={imageOptions}/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
