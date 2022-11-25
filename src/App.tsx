import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import FrontPage from './pages/FrontPage';
import SplashPage from './pages/SplashPage';
import { Dashboard }  from './pages/Dashboard';





function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="home" element={<FrontPage />} />
          <Route path="acc" element={<Dashboard />} />

        </Routes>
      </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
