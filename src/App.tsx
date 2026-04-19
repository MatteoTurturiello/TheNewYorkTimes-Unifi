
import { useState } from 'react';
import './App.css';
import { ScreenWidthProvider } from './Screen/UseScreenWidth';
import {Header} from './components/Header/Header';

import Body from './components/Body/Body';

const menuItems = [
    {
        title: "Sezione 1",
        items: ["Articolo 1", "Articolo 2", "Articolo 3"]
    },
    {
        title: "Sezione 2",
        items: ["Notizia A", "Notizia B", "Notizia C", "Notizia D"]
    },
    {
        title: "Sezione 3",
        items: ["Item X", "Item Y"]
    }
];

const articles = [
    {
        id: 1,
        title: "Breaking News: Technology Revolution Accelerates",
        description: "New developments in AI and machine learning are reshaping industries worldwide with unprecedented speed.",
        category: "Technology",
        image: "https://via.placeholder.com/400x300?text=Tech+News+1",
        date: "April 13, 2026"
    },
    {
        id: 2,
        title: "Global Markets React to Economic Shifts",
        description: "Stock markets worldwide show volatile trends as investors adjust to changing economic indicators.",
        category: "Business",
        image: "https://via.placeholder.com/400x300?text=Business+News",
        date: "April 12, 2026"
    },
    {
        id: 3,
        title: "Climate Summit Reaches Historic Agreement",
        description: "World leaders announce ambitious targets for carbon reduction and renewable energy adoption.",
        category: "Environment",
        image: "https://via.placeholder.com/400x300?text=Climate+News",
        date: "April 11, 2026"
    },
    {
        id: 4,
        title: "Sports: Championship Finals Coming Soon",
        description: "Teams prepare for the most anticipated championship match of the season.",
        category: "Sports",
        image: "https://via.placeholder.com/400x300?text=Sports+News",
        date: "April 10, 2026"
    },
    {
        id: 5,
        title: "Entertainment Industry Celebrates Award Season",
        description: "Major awards ceremony highlights the best performances and productions of the year.",
        category: "Entertainment",
        image: "https://via.placeholder.com/400x300?text=Entertainment",
        date: "April 9, 2026"
    },
    {
        id: 6,
        title: "Health Research: Breakthrough in Medical Science",
        description: "Scientists announce a major discovery that could revolutionize treatment for common diseases.",
        category: "Health",
        image: "https://via.placeholder.com/400x300?text=Health+News",
        date: "April 8, 2026"
    },
    {
        id: 7,
        title: "Travel: Top Destinations for Summer 2026",
        description: "Explore the most recommended travel destinations for your upcoming vacation.",
        category: "Travel",
        image: "https://via.placeholder.com/400x300?text=Travel+News",
        date: "April 7, 2026"
    },
    {
        id: 8,
        title: "Science: New Space Exploration Milestones",
        description: "Space agencies announce plans for exciting new missions to distant parts of the universe.",
        category: "Science",
        image: "https://via.placeholder.com/400x300?text=Science+News",
        date: "April 6, 2026"
    },
    {
        id: 9,
        title: "Arts and Culture: Museum Exhibition Breaks Records",
        description: "Popular exhibition attracts record-breaking attendance numbers from art enthusiasts.",
        category: "Arts",
        image: "https://via.placeholder.com/400x300?text=Arts+News",
        date: "April 5, 2026"
    },
    {
        id: 10,
        title: "Politics: Government Implements New Policies",
        description: "Legislative body passes comprehensive reforms affecting millions of citizens.",
        category: "Politics",
        image: "https://via.placeholder.com/400x300?text=Politics+News",
        date: "April 4, 2026"
    },
    {
        id: 11,
        title: "Education: Universities Announce Scholarship Programs",
        description: "Major educational institutions expand financial aid opportunities for deserving students.",
        category: "Education",
        image: "https://via.placeholder.com/400x300?text=Education+News",
        date: "April 3, 2026"
    },
    {
        id: 12,
        title: "Food and Lifestyle: Culinary Trends for 2026",
        description: "Chef experts share the most exciting food trends and recipes for the upcoming season.",
        category: "Lifestyle",
        image: "https://via.placeholder.com/400x300?text=Lifestyle+News",
        date: "April 2, 2026"
    }
];
type Language = 'en' | 'it';

export default function App() {
    const [language, setLanguage] = useState<'en' | 'it'>('en');

    const handleLanguageToggle = (newLanguage: 'en' | 'it') => {
        setLanguage(newLanguage);
        // Cambia l'attributo lang dell'HTML
        document.documentElement.lang = newLanguage;
    };

    return (
        <ScreenWidthProvider>
            <Header
                menuItems={menuItems}
                logo="/path-to-logo.png"
                language={language}
                onLanguageToggle={handleLanguageToggle}

            />
            <Body articles={articles} />
        </ScreenWidthProvider>
    );
}