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
    const featuredArticle = articles[0];
    const mainArticles = articles.slice(1, 9);
    const sidebarArticles = articles.slice(9);

    return (
        <div className="body-container">
            <div className="body-layout">
                {/* Left main column */}
                <main className="body-main">
                    <div className="featured-wrapper">
                        <ArticleCard article={featuredArticle} size="featured" />
                    </div>
                    <div className="main-articles-grid">
                        {mainArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} size="medium" />
                        ))}
                    </div>
                </main>

                {/* Right sidebar */}
                <aside className="body-sidebar">
                    {sidebarArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} size="sidebar" />
                    ))}
                </aside>
            </div>
        </div>
    );
};

export default Body;