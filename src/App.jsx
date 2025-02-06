import NewsPage from './NewsPage'
import './App.css'
import Header from './Header'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ArticlePage from "./ArticlePage"

function App() {
  

  return (
    <div className="App">
      <Header />
      <div className="news-body">
      <Router>
        <Routes>
          <Route path="/" element={
              <NewsPage />
          } />
          <Route path="/article/:title" element={<ArticlePage />} />
        </Routes>
      </Router>
      </div>
    </div>
  )
}

export default App
