import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import ArticlePreview from './ArticlePreview'

const categories = ["politics", "technology", "health", "culture", "environment", "education", "art", "sports"];
const dictionary = {
    "politics": "Leaders and Laws 🪙 📄",
    "technology": "Inventions 🛰️ 💻",
    "health": "Health and Medicine 💊 🩻",
    "culture": "Life Around the World 🕌 🪭",
    "environment": "Our Planet 🌎 ❄️", 
    "education": "School and Learning 👩‍🏫 ✏️", 
    "art": "Art 🎨 🎭",
    "sports": "Sports 🚴‍♂️ 🏈"
};

export default function NewsPage() {

    const scrollRefs = useRef({}); 
  const [scrollPositions, setScrollPositions] = useState(
    categories.reduce((acc, category) => ({ ...acc, [category]: 0 }), {})
  );

  const scrollAmount = 24; 

  const handleScroll = (category, direction) => {
    const newMargin =
      direction === "left"
        ? scrollPositions[category] - scrollAmount
        : scrollPositions[category] + scrollAmount;

    if (newMargin <= 0 && newMargin >= -72) {
      setScrollPositions((prev) => ({ ...prev, [category]: newMargin }));
    }
  };

    const [articlesByCategory, setArticlesByCategory] = useState({});

    useEffect(() => {
        /*const fetchArticles = async () => {
            const fetchedArticles = {};

            await Promise.all(
                categories.map(async (category) => {
                    try {
                        const response = await axios.get(`http://localhost:5001/api/news/${category}`);
                        fetchedArticles[category] = response.data.data || [];
                    } catch (error) {
                        console.error(`Error fetching news for ${category}:`, error);
                        fetchedArticles[category] = [];
                    }
                })
            );

            setArticlesByCategory(fetchedArticles);
        };*/

        // delay to avoid overloading:

        const fetchArticles = async () => {
            const fetchedArticles = {};
        
            for (const category of categories) {
                try {
                    const response = await axios.get(`http://localhost:5001/api/news/${category}`);
                    fetchedArticles[category] = response.data.data || [];
                } catch (error) {
                    console.error(`Error fetching news for ${category}:`, error);
                    fetchedArticles[category] = [];
                }
                await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay to avoid rate limits
            }
        
            setArticlesByCategory(fetchedArticles);
        };

        fetchArticles();
    }, []);

    return (
        <div>
            <div className="page-heading">Explore Bookshelf</div>
            {categories.map((category) => (
                <div key={category}>
                    <div className="articles-wrapper-header">
                        <div className="page-subheading">{dictionary[category]}</div>
                        <div className="h-scroll-buttons-container">
                            <button
                className="h-scroll-button"
                onClick={() => handleScroll(category, "right")}
                disabled={scrollPositions[category] === 0}
              >
                ←
              </button>
              <button
                className="h-scroll-button"
                onClick={() => handleScroll(category, "left")}
                disabled={scrollPositions[category] === -72}
              >
                →
              </button>
                        </div>
                    </div>
                    <div className="articles-wrapper"
                    ref={(el) => (scrollRefs.current[category] = el)}
                    style={{ marginLeft: `${scrollPositions[category]}vw`, transition: "margin-left 0.5s ease" }}
                    >
                    {articlesByCategory[category]?.length > 0 ? (
                        articlesByCategory[category].map((article, index) => (
                            <ArticlePreview title={article.title} url={article.article_link}/>
                        ))
                    ) : (
                        <p>Loading articles...</p>
                    )}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ideal one (netflix style)
/*export default function NewsPage() {

    const scrollRefs = useRef({}); 
  const [scrollPositions, setScrollPositions] = useState(
    categories.reduce((acc, category) => ({ ...acc, [category]: 0 }), {})
  );

  const scrollAmount = 24; 

  const handleScroll = (category, direction) => {
    const newMargin =
      direction === "left"
        ? scrollPositions[category] - scrollAmount
        : scrollPositions[category] + scrollAmount;

    if (newMargin <= 0 && newMargin >= -72) {
      setScrollPositions((prev) => ({ ...prev, [category]: newMargin }));
    }
  };

    const [articlesByCategory, setArticlesByCategory] = useState({});

    useEffect(() => {
        const fetchArticles = async () => {
            const fetchedArticles = {};

            await Promise.all(
                categories.map(async (category) => {
                    try {
                        const response = await axios.get(`http://localhost:5001/api/news/${category}`);
                        fetchedArticles[category] = response.data.data || [];
                    } catch (error) {
                        console.error(`Error fetching news for ${category}:`, error);
                        fetchedArticles[category] = [];
                    }
                })
            );

            setArticlesByCategory(fetchedArticles);
        };

        fetchArticles();
    }, []);

    return (
        <div>
            <div className="page-heading">Explore Bookshelf</div>
            {categories.map((category) => (
                <div key={category}>
                    <div className="articles-wrapper-header">
                        <div className="page-subheading">{dictionary[category]}</div>
                        <div className="h-scroll-buttons-container">
                            <button
                className="h-scroll-button"
                onClick={() => handleScroll(category, "right")}
                disabled={scrollPositions[category] === 0}
              >
                ←
              </button>
              <button
                className="h-scroll-button"
                onClick={() => handleScroll(category, "left")}
                disabled={scrollPositions[category] === -72}
              >
                →
              </button>
                        </div>
                    </div>
                    <div className="articles-wrapper"
                    ref={(el) => (scrollRefs.current[category] = el)}
                    style={{ marginLeft: `${scrollPositions[category]}vw`, transition: "margin-left 0.5s ease" }}
                    >
                    {articlesByCategory[category]?.length > 0 ? (
                        articlesByCategory[category].map((article, index) => (
                            <ArticlePreview title={article.title} description={article.description} />
                        ))
                    ) : (
                        <p>Loading articles...</p>
                    )}
                    </div>
                </div>
            ))}
        </div>
    );
} */



// article info
/*

                                /*<div key={article.id || index}>
                                <h3>{index + 1}. {article.title}</h3>
                                <p>{article.description}</p>
                                <a href={article.article_link} target="_blank" rel="noopener noreferrer">Read More</a>
                        </div>*/
                        


// simple fetch
/*export default function NewsPage() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5001/api/news/culture')
            .then(response => setArticles(response.data.data || []))
            .catch(error => console.error(error))
    }, [])

    return (
        <div>
            <div className="page-heading">Explore Bookshelf</div>
            {articles.map((article, index) => (
                <div key={article.id || index}>
                    <h2>{index + 1}. {article.title}</h2>
                    <p>{article.description}</p>
                    <a href={article.article_link} target="_blank" rel="noopener noreferrer">Read More</a>
                </div>
            ))}
        </div>
    )
}*/