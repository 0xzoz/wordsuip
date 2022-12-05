
import React from 'react';
import suixceramiclogo from '../../assets/collaboration.png';
import Logo from '../../assets/wordsuip-text-logo.png';
import '../../App.css';
import { Link } from "react-router-dom";

function SplashPage() {
  return (
    // <Link to='home'>
    <div className="App">
      <header className="App-header">    
        <img src={Logo} className="word-suip-logo" alt="logo" /> 
        <img src={suixceramiclogo} className="sui-logo" alt="logo" />
      </header>
    </div>
    // </Link>
  );
}

export default SplashPage;
