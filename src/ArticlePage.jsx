/*import { useLocation } from "react-router-dom"

const ArticlePage = () => {
    const location = useLocation()
    const { title, url } = location.state || {}

    return (
        <div className="article-page">
            <div className="page-heading">{title}</div>
            <p>{url}</p>
        </div>
    )
}

export default ArticlePage*/

import { useLocation } from "react-router-dom";

const ArticlePage = () => {
    const location = useLocation();
    const { title, content } = location.state || {};

    if (!title || !content) {
        return <div>Error: No content available</div>;
    }

    return (
        <div className="article-page">
            <div className="page-heading">{title}</div>
            <div className="article-content">
                <p>{content}</p>
            </div>
        </div>
    );
};

export default ArticlePage;