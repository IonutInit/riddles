import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./main-components/Header";
import Footer from "./main-components/Footer";

import ErrorBoundary from "./main-components/ErrorBoundary";

import RiddleIdContext from "./components/RiddleIdContext";

import Start from "./pages/Start";
import Game from "./pages/Game";
import Win from "./pages/Win";
import Lose from "./pages/Lose";
import Mobile from "./pages/Mobile";

import { APIpath } from "./lib/path";
import { key } from "./lib/auth";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [gameStart, setGameStart] = useState(false);
  const [magicWord, setMagicWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [available, setAvailable] = useState([]);

  //entire hook, used to tranfer riddle id from game page to header modal
  const riddleId = useState(null);

  //placeholder for mobile optimization; based on the assumption that the initial screen size is the only criteria that matters (if they resize it afterwards--though real users rarely do--they can re-resize it)
  //useEffect is unnecessary, but I wanted to test the feature out
  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  }, [windowWidth]);

  //fetches the array of available riddles, which will be passed down as 'available'
  const getAvailable = () => {
    async function availableArray() {
      const arr = [];
      const response = await fetch(`${APIpath}/riddles/available`, {
        headers: {
          Authorization: `${key}`,
        },
      });
      const data = await response.json();
      for (let i = 0; i < data.data.length; i++) {
        arr.push(data.data[i].id);
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
      const response = await fetch(`${APIpath}/magicword`, {
        headers: {
          Authorization: `${key}`,
        },
      });
      const data = await response.json();
      setMagicWord(data.data[0].magicword);
    }
    magicWord();
  };

  const handleStart = () => {
    setGameStart(true);
    getMagicWord();
    getAvailable();
  };

  const [imageOptions, setImageOptions] = useState("");

  const handleImageOptions = (e) => {
    e.target.value === imageOptions
      ? setImageOptions("")
      : setImageOptions(e.target.value);
  };

  return (
    <div className="App">
      <Router>
        <RiddleIdContext.Provider value={riddleId}>
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
                  windowWidth={windowWidth}
                />
              }
            />

            {/* to be replaced with below when necessary */}
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
            <Route path="/win" element={<Win magicWord={magicWord} />} />
            <Route path="gameover" element={<Lose />} />
            {/* ----------------------------------- */}

            {/* KEEP THIS FOR EASIER HANDLING IN PRODUCTION */}
            {/* {gameStart && (
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
            {gameStart && <Route path="gameover" element={<Lose />} />} */}
            {/* END OF KEEP THIS */}

            <Route path="mobile" element={<Mobile />} />
          </Routes>
          <Footer />
        </RiddleIdContext.Provider>
      </Router>
    </div>
  );
}

function AppWithBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

export default AppWithBoundary;
