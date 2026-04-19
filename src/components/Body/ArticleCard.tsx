import React from 'react';
import './ArticleCard.css';

interface Article {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    date: string;
}

interface ArticleCardProps {
    article: Article;
    size?: 'featured' | 'medium' | 'sidebar';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, size = 'medium' }) => {
    return (
        <a href="#" className={`article-link article-link--${size}`}>
            <article className={`article-card article-card--${size}`}>
                <div className="article-image-container">
                    <img src={article.image} alt={article.title} className="article-image" />
                </div>
                <div className="article-content">
                    <span className="article-category">{article.category}</span>
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-description">{article.description}</p>
                    <div className="article-footer">
                        <span className="article-date">{article.date}</span>
                        <span className="article-read-more">Read More →</span>
                    </div>
                </div>
            </article>
        </a>
    );
};

export default ArticleCard;