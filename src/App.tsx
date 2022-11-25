import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import './App.css';
import FrontPage from './pages/FrontPage';
import SplashPage from './pages/SplashPage';
import { Dashboard }  from './pages/Dashboard';





function App() {
  return (
    <ThemeProvider theme={theme}>
      <WalletProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<SplashPage />} />
              <Route path="home" element={<FrontPage />} />
              <Route path="acc" element={<Dashboard />} />

            </Routes>
          </div>
        </Router>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;
