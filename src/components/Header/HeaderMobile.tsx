import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import './HeaderMobile.css';
import type { Language } from '../../types/Language';

interface MenuItem {
    title: string;
    items: string[];
}

interface HeaderMobileProps {
    menuItems: MenuItem[];
    logo: string;
    language: Language;
    onLanguageToggle: (lang: Language) => void;
}

const uiLabels: Record<Language, { subscribe: string; logIn: string }> = {
    en: { subscribe: 'SUBSCRIBE', logIn: 'LOG IN' },
    it: { subscribe: 'ABBONATI', logIn: 'ACCEDI' },
    es: { subscribe: 'SUSCRIBIRSE', logIn: 'ENTRAR' },
};

export const HeaderMobile: React.FC<HeaderMobileProps> = ({
    menuItems,
    language,
    onLanguageToggle,
}) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const t = uiLabels[language];

    return (
        <header className="mobile-header">
            {/* Language buttons */}
            <div className="mobile-lang-row">
                {(['en', 'it', 'es'] as Language[]).map((lang) => (
                    <button
                        key={lang}
                        className={`mobile-lang-btn${language === lang ? ' mobile-lang-btn--active' : ''}`}
                        onClick={() => onLanguageToggle(lang)}
                    >
                        {lang.toUpperCase()}
                    </button>
                ))}
            </div>

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
                    <span className="material-symbols-outlined">search</span>
                </button>
                <div className="mobile-auth-buttons">
                    <button className="mobile-auth-btn mobile-subscribe-btn">{t.subscribe}</button>
                    <button className="mobile-auth-btn mobile-login-btn">{t.logIn}</button>
                </div>
            </div>

            {/* Search panel */}
            {isSearchOpen && (
                <div className="mobile-search-panel">
                    <SearchBar language={language} compact />
                </div>
            )}
        </header>
    );
};
