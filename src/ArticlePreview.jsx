/*import { useNavigate } from "react-router-dom"

const ArticlePreview = ({title, url}) => {

    
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/article/${encodeURIComponent(title)}`, { state: { title, url }})
    }
    return (
        <div className="article-preview" onClick={handleClick} style={{ cursor: "pointer"}}>
            <div className="article-preview-title">
                {title}
            </div>
        </div>
    )
}

export default ArticlePreview*/

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const ArticlePreview = ({ title, url }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);

        try {
            // Fetch the article content from the scraping server
            const response = await axios.get(`http://localhost:5002/scrape?url=${url}`);
            const articleContent = response.data.content;  // Assuming the backend sends a 'content' field



            // Navigate to the article page and pass both title and content in the state
            navigate(`/article/${encodeURIComponent(title)}`, {
                state: { title, content: articleContent }
            });
        } catch (error) {
            console.error("Error fetching article:", error);
            setLoading(false);
        }
    };

    return (
        <div className="article-preview" onClick={handleClick} style={{ cursor: "pointer" }}>
            <div className="article-preview-title">
                {loading ? "Loading..." : title}
            </div>
        </div>
    );
};

export default ArticlePreview;