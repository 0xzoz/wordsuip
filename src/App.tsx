import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import FrontPage from './pages/FrontPage';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<FrontPage />} >
          
        </Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
