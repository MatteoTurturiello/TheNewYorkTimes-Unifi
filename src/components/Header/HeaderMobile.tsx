import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import './HeaderMobile.css';

interface MenuItem {
    title: string;
    items: string[];
}

interface HeaderMobileProps {
    menuItems: MenuItem[];
    logo: string;
    language: 'en' | 'it';
    onLanguageToggle: (lang: 'en' | 'it') => void;
}

export const HeaderMobile: React.FC<HeaderMobileProps> = ({
    menuItems,
    language,
}) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

    return (
        <header className="mobile-header">
            {/* Logo row */}
            <div className="mobile-header-logo-row">
                <h1 className="mobile-logo-text">The New York Times</h1>
            </div>

            {/* Nav row */}
            <nav className="mobile-nav">
                <ul className="mobile-nav-list">
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className="mobile-nav-item"
                            onClick={() =>
                                setActiveDropdown(activeDropdown === index ? null : index)
                            }
                        >
                            <button className="mobile-nav-button">{item.title}</button>
                            {activeDropdown === index && (
                                <div className="mobile-dropdown">
                                    <ul className="mobile-dropdown-list">
                                        {item.items.map((sub, si) => (
                                            <li key={si} className="mobile-dropdown-item">
                                                {sub}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Bottom action row */}
            <div className="mobile-header-actions">
                <button
                    className="mobile-search-btn"
                    onClick={() => setIsSearchOpen((v) => !v)}
                    aria-label="Toggle search"
                    aria-expanded={isSearchOpen}
                >
                    <span className="material-symbols-outlined">
                        {isSearchOpen ? 'close' : 'search'}
                    </span>
                </button>
                <div className="mobile-auth-buttons">
                    <button className="mobile-auth-btn mobile-subscribe-btn">SUBSCRIBE</button>
                    <button className="mobile-auth-btn mobile-login-btn">LOG IN</button>
                </div>
            </div>

            {/* Search panel */}
            {isSearchOpen && (
                <div className="mobile-search-panel">
                    <SearchBar language={language} />
                </div>
            )}
        </header>
    );
};
