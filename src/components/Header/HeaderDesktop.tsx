import React, { useState, useEffect, useRef } from 'react';
import { SearchBar } from './SearchBar';
import './HeaderDesktop.css';
import type { Language } from '../../types/Language';

interface MenuItem {
    title: string;
    items: string[];
}

interface HeaderDesktopProps {
    menuItems: MenuItem[];
    logo: string;
    language: Language;
    onLanguageToggle: (lang: Language) => void;
}

const NAV_HEIGHT = 48;

const uiLabels: Record<Language, { todaysPaper: string; subscribe: string; logIn: string }> = {
    en: { todaysPaper: "Today's Paper", subscribe: 'SUBSCRIBE', logIn: 'LOG IN' },
    it: { todaysPaper: "Edizione di oggi", subscribe: 'ABBONATI', logIn: 'ACCEDI' },
    es: { todaysPaper: "Edición de hoy", subscribe: 'SUSCRIBIRSE', logIn: 'ENTRAR' },
};

const dateLocale: Record<Language, string> = { en: 'en-US', it: 'it-IT', es: 'es-ES' };

export const HeaderDesktop: React.FC<HeaderDesktopProps> = ({
    menuItems,
    language,
    onLanguageToggle,
}) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [navSticky, setNavSticky] = useState(false);
    const topRef = useRef<HTMLDivElement>(null);

    const t = uiLabels[language];

    const dateString = new Date().toLocaleDateString(dateLocale[language], {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    useEffect(() => {
        const handleScroll = () => {
            if (topRef.current) {
                setNavSticky(window.scrollY >= topRef.current.offsetHeight);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = menuItems.map((item, index) => (
        <li
            key={index}
            className="nav-item"
            onMouseEnter={() => setActiveDropdown(index)}
            onMouseLeave={() => setActiveDropdown(null)}
        >
            <button className="nav-button">{item.title}</button>
            {activeDropdown === index && (
                <div className="dropdown-container">
                    <table className="dropdown-table">
                        <tbody>
                            {item.items.map((sub, si) => (
                                <tr key={si}>
                                    <td className="dropdown-cell">
                                        <span className="dropdown-text">{sub}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </li>
    ));

    return (
        <>
            <header className="desktop-header">
                {/* Top section: left info, logo, auth buttons */}
                <div className="desktop-header-top" ref={topRef}>
                    {/* Left: search toggle + inline search bar + date */}
                    <div className="desktop-header-left">
                        <button
                            className="search-toggle-btn"
                            onClick={() => setIsSearchOpen((v) => !v)}
                            aria-label="Toggle search"
                            aria-expanded={isSearchOpen}
                        >
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        <div className="desktop-left-content">
                            {isSearchOpen && (
                                <div className="desktop-inline-search">
                                    <SearchBar language={language} compact />
                                </div>
                            )}
                            <div className="date-section">
                                <span className="current-date">{dateString}</span>
                                <a href="#" className="todays-paper-link">
                                    {t.todaysPaper}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Center: language buttons + logo */}
                    <div className="desktop-header-center">
                        <div className="lang-buttons">
                            {(['en', 'it', 'es'] as Language[]).map((lang) => (
                                <button
                                    key={lang}
                                    className={`lang-btn${language === lang ? ' lang-btn--active' : ''}`}
                                    onClick={() => onLanguageToggle(lang)}
                                >
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        <h1 className="header-logo-text">The New York Times</h1>
                    </div>

                    {/* Right: auth buttons */}
                    <div className="desktop-header-right">
                        <button className="auth-btn subscribe-btn">{t.subscribe}</button>
                        <button className="auth-btn login-btn">{t.logIn}</button>
                    </div>
                </div>

                {/* Nav bar – always rendered here to occupy space when not sticky */}
                <nav className={`desktop-nav${navSticky ? ' desktop-nav--hidden' : ''}`}>
                    <ul className="nav-list nav-list--centered">{navItems}</ul>
                </nav>
            </header>

            {/* Fixed sticky nav bar – shown only when scrolled past top section */}
            {navSticky && (
                <nav className="desktop-nav desktop-nav--fixed">
                    <ul className="nav-list nav-list--centered">{navItems}</ul>
                </nav>
            )}

            {/* Spacer to compensate for the fixed nav height */}
            {navSticky && <div style={{ height: NAV_HEIGHT }} />}
        </>
    );
};
