import { StrictMode, createElement } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'

createRoot(document.getElementById('root')).render(
  createElement(StrictMode, null, createElement(App)),
)
