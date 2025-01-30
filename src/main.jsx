import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'
import App from './App.jsx'
import { Web3Provider } from "./web3modalConfig";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Web3Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Web3Provider>
  </StrictMode>,
)