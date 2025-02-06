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

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    async function simplifyText(text) {
        try {

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}` 
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "system", content: "You are a helpful assistant that simplifies text into simple words." },
                           { role: "user", content: `Simplify this text: ${text}` }],
                max_tokens: 100
            })
        });
    
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error simplifying text:", error);
        return "Error simplifying text. Please try again.";
    }
    }

    const handleClick = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:5002/scrape?url=${url}`);
            const articleContent = response.data.content;  


            const simplifiedText = await simplifyText(articleContent)
            navigate(`/article/${encodeURIComponent(title)}`, {
                state: { title, content: simplifiedText } // articleContent
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