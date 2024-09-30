import 'core-js/stable'; // Polyfills for modern JS features like Promise, Object.assign, etc.
import 'regenerator-runtime/runtime'; // Polyfill for async/await and generators
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
