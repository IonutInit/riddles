import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./main-components/Header";
import Footer from "./main-components/Footer";

import Start from "./pages/Start";
import Game from "./pages/Game";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/play" element={<Game />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
