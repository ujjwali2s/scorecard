import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./folder/Home"
import Video from "./components/components/ScoreCard"
import OddsSection  from './components/components/OddsData';


const App = () => {
  return (
    <div className="flex bg-black text-white items-center justify-center w-full h-full">
      <Router>
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/get_scorecard/:matchId" element={<Video />} />
        
        </Routes>
      </Router>
    </div>
  );
};

export default App;
