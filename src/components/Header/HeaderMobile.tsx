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

const uiLabels: Record<Language, { readInApp: string; home: string }> = {
    en: { readInApp: 'Read in the App', home: 'Home' },
    it: { readInApp: 'Read in the App', home: 'Home' },
    es: { readInApp: 'Read in the App', home: 'Inicio' },
};

const dateLocale: Record<Language, string> = { en: 'en-US', it: 'it-IT', es: 'es-ES' };

export const HeaderMobile: React.FC<HeaderMobileProps> = ({
    menuItems,
    language,
    onLanguageToggle,
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const t = uiLabels[language];
    const dateString = new Date().toLocaleDateString(dateLocale[language], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const handleUserButtonClick = () => {
        window.open('https://www.nytimes.com/subscription', '_blank', 'noopener,noreferrer');
    };

    return (
        <header className="mobile-header">
            <div className="mobile-header-main-row">
                <button
                    className="mobile-square-icon-btn"
                    onClick={() => setIsSidebarOpen((open) => !open)}
                    aria-label="Open menu"
                    aria-expanded={isSidebarOpen}
                    aria-controls="mobile-sidebar-menu"
                >
                    ☰
                </button>
                <h1 className="mobile-logo-text">The New York Times</h1>
                <button
                    className="mobile-square-icon-btn"
                    onClick={handleUserButtonClick}
                    aria-label="Open subscribe and login page"
                >
                    👤
                </button>
            </div>

            <div className="mobile-header-bottom-row">
                <span className="mobile-current-date">{dateString}</span>
                <button className="mobile-read-app-btn">{t.readInApp}</button>
            </div>

            {isSidebarOpen && (
                <button
                    className="mobile-sidebar-overlay"
                    aria-label="Close menu overlay"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside
                id="mobile-sidebar-menu"
                className={`mobile-sidebar${isSidebarOpen ? ' mobile-sidebar--open' : ''}`}
                aria-hidden={!isSidebarOpen}
            >
                <div className="mobile-sidebar-search">
                    <SearchBar language={language} compact />
                </div>

                <button className="mobile-sidebar-home-btn">{t.home}</button>

                <div className="mobile-sidebar-sections">
                    {menuItems.map((item, index) => (
                        <button
                            key={item.title}
                            className={`mobile-sidebar-section-btn${activeDropdown === index ? ' mobile-sidebar-section-btn--active' : ''}`}
                            onClick={() =>
                                setActiveDropdown(activeDropdown === index ? null : index)
                            }
                            aria-expanded={activeDropdown === index}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>

                {activeDropdown !== null && (
                    <ul className="mobile-sidebar-subitems">
                        {menuItems[activeDropdown].items.map((sub) => (
                            <li key={sub} className="mobile-sidebar-subitem">
                                {sub}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mobile-sidebar-languages">
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
            </aside>
        </header>
    );
};
