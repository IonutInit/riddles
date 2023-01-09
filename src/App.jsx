import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Header from "./main-components/Header";
import Footer from "./main-components/Footer";

import Start from "./pages/Start";
import Game from "./pages/Game";
import Win from "./pages/Win";
import Lose from "./pages/Lose";

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [magicWord, setMagicWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [available, setAvailable] = useState([]);

  //fetches the array of available riddles, which will be passed down as 'available'
  const getAvailable = () => {
    async function availableArray() {
      const arr = [];
      const response = await fetch(
        "https://the-path-of-riddles.onrender.com/api/v1/riddles/available"
      );
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].id);
      }
      setAvailable(arr);
      setIsLoading(false);
    }
    availableArray();
  };

  //fetches the winning word
  const getMagicWord = () => {
    setIsLoading(true);
    async function magicWord() {
      const response = await fetch(
        "https://the-path-of-riddles.onrender.com/api/v1/magicword"
      );
      const data = await response.json();
      setMagicWord(data[0].magicword);
    }
    magicWord();
  };

  const handleStart = () => {
    setGameStart(true);
    getMagicWord();
    getAvailable();
  };

  const [imageOptions, setImageOptions] = useState("expressionist painting");

  const handleImageOptions = (e) => {
    e.target.value === imageOptions ? setImageOptions('') : setImageOptions(e.target.value);   
  };

  return (
    <div className="App">
      <Router>
        <Header
          imageOptions={imageOptions}
          handleImageOptions={handleImageOptions}
          gameStart={gameStart}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Start
                handleStart={handleStart}
                isLoading={isLoading}
                available={available}
                gameStart={gameStart}
              />
            }
          />
          {gameStart && (
            <Route
              path="/play"
              element={
                <Game
                  imageOptions={imageOptions}
                  available={available}
                  magicWord={magicWord}
                />
              }
            />
          )}
          {gameStart && (
            <Route path="/win" element={<Win magicWord={magicWord} />} />
          )}
          {gameStart && <Route path="gameover" element={<Lose />} />}
          {/* <Route
            path="/play"
            element={<Game imageOptions={imageOptions} available={available} magicWord={magicWord}/>}
          />
          <Route path="/win" element={<Win magicWord={magicWord}/>} />
          <Route path="gameover" element={<Lose />} /> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
