import React, { useState } from 'react';
import './Footer.css';
import type { Language } from '../../types/Language';

interface MenuItem {
    title: string;
    items: string[];
}

interface FooterProps {
    menuItems: MenuItem[];
    language: Language;
}

const footerLinks: Record<Language, string[]> = {
    en: ['Contact Us', 'Help', 'Privacy', 'Terms of Service', 'Accessibility', 'Sitemap'],
    it: ['Contattaci', 'Aiuto', 'Privacy', 'Termini di servizio', 'Accessibilità', 'Mappa del sito'],
    es: ['Contáctenos', 'Ayuda', 'Privacidad', 'Términos de servicio', 'Accesibilidad', 'Mapa del sitio'],
};

export const Footer: React.FC<FooterProps> = ({ menuItems, language }) => {
    const [activeSection, setActiveSection] = useState<number | null>(null);
    const links = footerLinks[language];

    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-sections">
                    {menuItems.map((item, index) => (
                        <div key={`${item.title}-${index}`} className="footer-section">
                            <button
                                className="footer-section-btn"
                                onClick={() =>
                                    setActiveSection(activeSection === index ? null : index)
                                }
                                aria-expanded={activeSection === index}
                            >
                                <span>{item.title}</span>
                                <span className="footer-section-arrow">
                                    {activeSection === index ? '▲' : '▼'}
                                </span>
                            </button>
                            {activeSection === index && (
                                <ul className="footer-subitems">
                                    {item.items.map((sub) => (
                                        <li key={sub} className="footer-subitem">
                                            {sub}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                <p className="footer-copyright">© 2026 The New York Times</p>

                <div className="footer-links">
                    {links.map((link) => (
                        <a key={link} href="#" className="footer-link">
                            {link}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};
