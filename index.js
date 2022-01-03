import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import CommunityCare from './components/communityCare/CommunityCare'
import 'normalize.css'
import './index.css'
import './components/fonts.css'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CommunityCare />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()