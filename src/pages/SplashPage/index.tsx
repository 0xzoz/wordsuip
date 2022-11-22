
import React from 'react';
import suixceramiclogo from '../../assets/collaboration.png';
import '../../App.css';
import { Link } from "react-router-dom";

function SplashPage() {
  return (
    <Link to='home'>
    <div className="App">
      <header className="App-header">    
        <h1> Wordsuip Weekly</h1>
        <img src={suixceramiclogo} className="sui-logo" alt="logo" />
      </header>
    </div>
    </Link>
  );
}

export default SplashPage;
