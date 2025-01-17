import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/poppins'; // Defaults to weight 400
import '@fontsource/poppins/600.css'; // Specific weight and style
import Landing from './pages/Landing.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
