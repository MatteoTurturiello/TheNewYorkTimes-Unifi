import React, { useState, useEffect, useRef } from 'react';
import { SearchBar } from './SearchBar';
import './HeaderDesktop.css';

interface MenuItem {
    title: string;
    items: string[];
}

interface HeaderDesktopProps {
    menuItems: MenuItem[];
    logo: string;
    language: 'en' | 'it';
    onLanguageToggle: (lang: 'en' | 'it') => void;
}

const NAV_HEIGHT = 48;

export const HeaderDesktop: React.FC<HeaderDesktopProps> = ({
    menuItems,
    language,
    onLanguageToggle,
}) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [navSticky, setNavSticky] = useState(false);
    const topRef = useRef<HTMLDivElement>(null);

    const dateString = new Date().toLocaleDateString('en-US', {
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
                {/* Top section: logo, search, buttons */}
                <div className="desktop-header-top" ref={topRef}>
                    <div className="desktop-header-left">
                        <button
                            className="search-toggle-btn"
                            onClick={() => setIsSearchOpen((v) => !v)}
                            aria-label="Toggle search"
                            aria-expanded={isSearchOpen}
                        >
                            <span className="material-symbols-outlined">
                                {isSearchOpen ? 'close' : 'search'}
                            </span>
                        </button>
                        <div className="date-section">
                            <span className="current-date">{dateString}</span>
                            <a href="#" className="todays-paper-link">
                                Today's Paper
                            </a>
                        </div>
                    </div>

                    <div className="desktop-header-center">
                        <h1 className="header-logo-text">The New York Times</h1>
                    </div>

                    <div className="desktop-header-right">
                        <button className="auth-btn subscribe-btn">SUBSCRIBE</button>
                        <button className="auth-btn login-btn">LOG IN</button>
                    </div>
                </div>

                {/* Search panel */}
                {isSearchOpen && (
                    <div className="desktop-search-panel">
                        <SearchBar language={language} />
                    </div>
                )}

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
