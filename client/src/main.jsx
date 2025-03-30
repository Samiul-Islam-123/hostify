import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material"
import darkTheme from './utils/Theme';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>

    <BrowserRouter>
    <CssBaseline />
        <App />
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
