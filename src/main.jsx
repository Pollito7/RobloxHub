import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Toaster position="bottom-right" toastOptions={{
          style:{
            background:'#12121e', color:'#f1f5f9',
            border:'1px solid rgba(0,229,255,0.25)',
            fontFamily:"'Syne',sans-serif", fontWeight:600,
            fontSize:'.9rem', borderRadius:'10px',
          }
        }}/>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
