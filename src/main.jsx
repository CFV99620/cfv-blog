import { StrictMode } from 'react'// esto es para que el codigo sea mas estricto
import { createRoot } from 'react-dom/client'// esto es para crear el root
import './index.css'// esto es para importar el css
import App from './App.jsx'// esto es para importar el app

createRoot(document.getElementById('root')).render( // esto es para renderizar el app
  <StrictMode>
    <App />
  </StrictMode>,
)
