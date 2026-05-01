import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <Toaster
  toastOptions={{
    style:{
         background: '#ffffff',
          color: 'black',
          border: '1px solid white',
          fontSize: '13px',
          padding:'16px'
    },
    success:{
      iconTheme:{
        primary:'green',
        secondary:"#fff",
      },
    },
    error:{
      iconTheme:{
        primary:'red',
        secondary:'#fff'
      },
    },

  }}
  />
    <App />
  </BrowserRouter>
)
