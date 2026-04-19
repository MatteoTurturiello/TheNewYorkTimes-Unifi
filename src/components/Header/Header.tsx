import React, { useState, useEffect, useRef } from 'react';


import './Header.css';

interface MenuItem {
    title: string;
    items: string[];
}


interface HeaderProps {
    menuItems: MenuItem[];
    logo: string;
    language: 'en' | 'it';
    onLanguageToggle: (newLanguage: 'en' | 'it') => void;  // ✅ Aggiungi il parametro
}
export const Header: React.FC<HeaderProps> = ({
                                                  menuItems = [],
                                                  logo = "logo.png"
                                              }) => {
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky-header ${isSticky ? 'is-sticky' : ''}`}>
            <div className="header-container">
                {/* Logo */}
                <div className="header-logo">
                    <img src={logo} alt="Logo" />
                </div>


                {/* Barra di navigazione con dropdown */}
                <nav className="header-nav">
                    <ul className="nav-list">
                        {menuItems.map((item, index) => (
                            <li key={index} className="nav-item">
                                <button
                                    className="nav-button"
                                    onMouseEnter={() => setActiveDropdown(index)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    {item.title}
                                </button>

                                {/* Dropdown container */}
                                {activeDropdown === index && (
                                    <div
                                        className="dropdown-container"
                                        onMouseEnter={() => setActiveDropdown(index)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <table className="dropdown-table">
                                            <tbody>
                                            {item.items.map((subItem, subIndex) => (
                                                <tr key={subIndex}>
                                                    <td className="dropdown-cell">
                                                        <span className="dropdown-text">{subItem}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>


                {/* Search icon */}
                <div className="header-search">
                    <button className="search-button" aria-label="Search">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                </div>
            </div>
        </header>
    );
};
