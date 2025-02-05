import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NewsPage from './NewsPage'
import './App.css'
import Header from './Header'

function App() {
  

  return (
    <div className="App">
      <Header />
      <div className="news-body">
        <NewsPage />
      </div>
    </div>
  )
}

export default App
