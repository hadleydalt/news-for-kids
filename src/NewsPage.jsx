import { useState, useEffect } from 'react'
import axios from 'axios'

export default function NewsPage() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5001/api/news/environment')
            .then(response => setArticles(response.data.data || []))
            .catch(error => console.error(error))
    }, [])

    return (
        <div>
            <h1>Popular News</h1>
            {articles.map(article => (
                <div key={article.id}>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                </div>
            ))}
        </div>
    )
}