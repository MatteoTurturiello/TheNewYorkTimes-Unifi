import React from 'react';
import './Body.css';
import ArticleCard from './ArticleCard';

interface Article {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    date: string;
}

interface BodyProps {
    articles: Article[];
}




const Body: React.FC<BodyProps> = ({ articles }) => {
    return (
        <div className="body-container">
            <div className="articles-grid">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default Body;