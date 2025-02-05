import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NewsPage from './NewsPage'
import './App.css'

function App() {
  

  return (
    <div className="App">
      <div className="header"></div>
      <div className="news-body">
        <NewsPage />
      </div>
    </div>
  )
}

export default App
