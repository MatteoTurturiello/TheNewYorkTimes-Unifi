
import { useState } from 'react';
import './App.css';
import { ScreenWidthProvider } from './Screen/UseScreenWidth';
import { Header } from './components/Header/Header';
import Body from './components/Body/Body';
import type { Language } from './types/Language';

interface MenuItem {
    title: string;
    items: string[];
}

interface Article {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    date: string;
}

const menuItems: Record<Language, MenuItem[]> = {
    en: [
        { title: "World", items: ["Politics", "Business", "Technology", "Science"] },
        { title: "Culture", items: ["Arts", "Books", "Food", "Travel"] },
        { title: "Opinion", items: ["Editorials", "Op-Ed", "Letters"] }
    ],
    it: [
        { title: "Mondo", items: ["Politica", "Economia", "Tecnologia", "Scienza"] },
        { title: "Cultura", items: ["Arte", "Libri", "Cucina", "Viaggi"] },
        { title: "Opinione", items: ["Editoriali", "Lettere", "Rubrica"] }
    ],
    es: [
        { title: "Mundo", items: ["Política", "Economía", "Tecnología", "Ciencia"] },
        { title: "Cultura", items: ["Arte", "Libros", "Gastronomía", "Viajes"] },
        { title: "Opinión", items: ["Editoriales", "Cartas", "Columnas"] }
    ]
};

const allArticles: Record<Language, Article[]> = {
    en: [
        { id: 1, title: "Breaking News: Technology Revolution Accelerates", description: "New developments in AI and machine learning are reshaping industries worldwide with unprecedented speed.", category: "Technology", image: "https://placehold.co/1200x675?text=Tech+News", date: "April 19, 2026" },
        { id: 2, title: "Global Markets React to Economic Shifts", description: "Stock markets worldwide show volatile trends as investors adjust to changing economic indicators.", category: "Business", image: "https://placehold.co/600x450?text=Business", date: "April 19, 2026" },
        { id: 3, title: "Climate Summit Reaches Historic Agreement", description: "World leaders announce ambitious targets for carbon reduction and renewable energy adoption.", category: "Environment", image: "https://placehold.co/600x450?text=Climate", date: "April 18, 2026" },
        { id: 4, title: "Sports: Championship Finals Coming Soon", description: "Teams prepare for the most anticipated championship match of the season.", category: "Sports", image: "https://placehold.co/600x450?text=Sports", date: "April 18, 2026" },
        { id: 5, title: "Entertainment Industry Celebrates Award Season", description: "Major awards ceremony highlights the best performances and productions of the year.", category: "Entertainment", image: "https://placehold.co/600x450?text=Entertainment", date: "April 17, 2026" },
        { id: 6, title: "Health Research: Breakthrough in Medical Science", description: "Scientists announce a major discovery that could revolutionize treatment for common diseases.", category: "Health", image: "https://placehold.co/600x450?text=Health", date: "April 17, 2026" },
        { id: 7, title: "Travel: Top Destinations for Summer 2026", description: "Explore the most recommended travel destinations for your upcoming vacation.", category: "Travel", image: "https://placehold.co/600x450?text=Travel", date: "April 16, 2026" },
        { id: 8, title: "Science: New Space Exploration Milestones", description: "Space agencies announce plans for exciting new missions to distant parts of the universe.", category: "Science", image: "https://placehold.co/600x450?text=Science", date: "April 16, 2026" },
        { id: 9, title: "Arts and Culture: Museum Exhibition Breaks Records", description: "Popular exhibition attracts record-breaking attendance numbers from art enthusiasts.", category: "Arts", image: "https://placehold.co/600x450?text=Arts", date: "April 15, 2026" },
        { id: 10, title: "Politics: Government Implements New Policies", description: "Legislative body passes comprehensive reforms affecting millions of citizens.", category: "Politics", image: "https://placehold.co/400x300?text=Politics", date: "April 15, 2026" },
        { id: 11, title: "Education: Universities Announce Scholarship Programs", description: "Major educational institutions expand financial aid opportunities for deserving students.", category: "Education", image: "https://placehold.co/400x300?text=Education", date: "April 14, 2026" },
        { id: 12, title: "Food and Lifestyle: Culinary Trends for 2026", description: "Chef experts share the most exciting food trends and recipes for the upcoming season.", category: "Lifestyle", image: "https://placehold.co/400x300?text=Lifestyle", date: "April 14, 2026" },
        { id: 13, title: "Technology: Renewable Energy Investments Surge", description: "Governments and private sectors accelerate funding for solar and wind energy projects across the globe.", category: "Technology", image: "https://placehold.co/400x300?text=Energy", date: "April 13, 2026" },
        { id: 14, title: "Culture: New Generation of Authors Reshapes Literature", description: "Emerging writers from diverse backgrounds bring fresh perspectives to the global literary scene.", category: "Culture", image: "https://placehold.co/400x300?text=Culture", date: "April 13, 2026" }
    ],
    it: [
        { id: 1, title: "Ultime Notizie: La Rivoluzione Tecnologica Accelera", description: "Nuovi sviluppi nell'intelligenza artificiale e nel machine learning stanno trasformando le industrie mondiali a velocità senza precedenti.", category: "Tecnologia", image: "https://placehold.co/1200x675?text=Tecnologia", date: "19 aprile 2026" },
        { id: 2, title: "I Mercati Globali Reagiscono ai Cambiamenti Economici", description: "Le borse mondiali mostrano andamenti volatili mentre gli investitori si adattano ai nuovi indicatori economici.", category: "Economia", image: "https://placehold.co/600x450?text=Economia", date: "19 aprile 2026" },
        { id: 3, title: "Il Vertice sul Clima Raggiunge uno Storico Accordo", description: "I leader mondiali annunciano ambiziosi obiettivi per la riduzione del carbonio e l'adozione di energie rinnovabili.", category: "Ambiente", image: "https://placehold.co/600x450?text=Clima", date: "18 aprile 2026" },
        { id: 4, title: "Sport: Finali del Campionato in Arrivo", description: "Le squadre si preparano per il match di campionato più atteso della stagione.", category: "Sport", image: "https://placehold.co/600x450?text=Sport", date: "18 aprile 2026" },
        { id: 5, title: "L'Industria dello Spettacolo Festeggia la Stagione dei Premi", description: "La grande cerimonia di premiazione celebra le migliori performance e produzioni dell'anno.", category: "Spettacolo", image: "https://placehold.co/600x450?text=Spettacolo", date: "17 aprile 2026" },
        { id: 6, title: "Ricerca Medica: Svolta nella Scienza", description: "Gli scienziati annunciano una scoperta che potrebbe rivoluzionare il trattamento delle malattie più comuni.", category: "Salute", image: "https://placehold.co/600x450?text=Salute", date: "17 aprile 2026" },
        { id: 7, title: "Viaggi: Le Migliori Destinazioni per l'Estate 2026", description: "Scopri le destinazioni di viaggio più raccomandate per le tue prossime vacanze.", category: "Viaggi", image: "https://placehold.co/600x450?text=Viaggi", date: "16 aprile 2026" },
        { id: 8, title: "Scienza: Nuovi Traguardi nell'Esplorazione Spaziale", description: "Le agenzie spaziali annunciano piani per nuove emozionanti missioni verso i confini dell'universo.", category: "Scienza", image: "https://placehold.co/600x450?text=Scienza", date: "16 aprile 2026" },
        { id: 9, title: "Arte e Cultura: La Mostra Batte Ogni Record", description: "L'esposizione più popolare attrae un numero record di visitatori appassionati d'arte.", category: "Arte", image: "https://placehold.co/600x450?text=Arte", date: "15 aprile 2026" },
        { id: 10, title: "Politica: Il Governo Implementa Nuove Riforme", description: "Il parlamento approva riforme complete che riguardano milioni di cittadini.", category: "Politica", image: "https://placehold.co/400x300?text=Politica", date: "15 aprile 2026" },
        { id: 11, title: "Istruzione: Nuovi Programmi di Borse di Studio", description: "Le principali istituzioni educative espandono le opportunità di aiuto finanziario per gli studenti meritevoli.", category: "Istruzione", image: "https://placehold.co/400x300?text=Istruzione", date: "14 aprile 2026" },
        { id: 12, title: "Cibo e Stile di Vita: Le Tendenze Culinarie del 2026", description: "Gli chef esperti condividono le tendenze gastronomiche più entusiasmanti per la stagione imminente.", category: "Stile di vita", image: "https://placehold.co/400x300?text=Cucina", date: "14 aprile 2026" },
        { id: 13, title: "Tecnologia: Gli Investimenti nelle Energie Rinnovabili Crescono", description: "Governi e settore privato accelerano i finanziamenti per i progetti di energia solare ed eolica in tutto il mondo.", category: "Tecnologia", image: "https://placehold.co/400x300?text=Energia", date: "13 aprile 2026" },
        { id: 14, title: "Cultura: La Nuova Generazione di Autori Rinnova la Letteratura", description: "Scrittori emergenti da contesti diversi portano prospettive fresche sulla scena letteraria mondiale.", category: "Cultura", image: "https://placehold.co/400x300?text=Cultura", date: "13 aprile 2026" }
    ],
    es: [
        { id: 1, title: "Última Hora: La Revolución Tecnológica se Acelera", description: "Los nuevos desarrollos en inteligencia artificial y aprendizaje automático están transformando industrias en todo el mundo a una velocidad sin precedentes.", category: "Tecnología", image: "https://placehold.co/1200x675?text=Tecnologia", date: "19 de abril de 2026" },
        { id: 2, title: "Los Mercados Globales Reaccionan a los Cambios Económicos", description: "Las bolsas mundiales muestran tendencias volátiles mientras los inversores se adaptan a los nuevos indicadores económicos.", category: "Economía", image: "https://placehold.co/600x450?text=Economia", date: "19 de abril de 2026" },
        { id: 3, title: "La Cumbre del Clima Alcanza un Histórico Acuerdo", description: "Los líderes mundiales anuncian ambiciosos objetivos para la reducción del carbono y la adopción de energías renovables.", category: "Medio Ambiente", image: "https://placehold.co/600x450?text=Clima", date: "18 de abril de 2026" },
        { id: 4, title: "Deportes: Las Finales del Campeonato se Aproximan", description: "Los equipos se preparan para el partido de campeonato más esperado de la temporada.", category: "Deportes", image: "https://placehold.co/600x450?text=Deportes", date: "18 de abril de 2026" },
        { id: 5, title: "La Industria del Entretenimiento Celebra los Premios", description: "La gran ceremonia de premiación destaca las mejores actuaciones y producciones del año.", category: "Entretenimiento", image: "https://placehold.co/600x450?text=Entretenimiento", date: "17 de abril de 2026" },
        { id: 6, title: "Investigación Médica: Gran Avance en la Ciencia", description: "Los científicos anuncian un descubrimiento que podría revolucionar el tratamiento de enfermedades comunes.", category: "Salud", image: "https://placehold.co/600x450?text=Salud", date: "17 de abril de 2026" },
        { id: 7, title: "Viajes: Los Mejores Destinos para el Verano 2026", description: "Descubre los destinos de viaje más recomendados para tus próximas vacaciones.", category: "Viajes", image: "https://placehold.co/600x450?text=Viajes", date: "16 de abril de 2026" },
        { id: 8, title: "Ciencia: Nuevos Hitos en la Exploración Espacial", description: "Las agencias espaciales anuncian planes para emocionantes nuevas misiones hacia los confines del universo.", category: "Ciencia", image: "https://placehold.co/600x450?text=Ciencia", date: "16 de abril de 2026" },
        { id: 9, title: "Arte y Cultura: La Exposición Bate Récords", description: "La popular exposición atrae un número récord de visitantes apasionados del arte.", category: "Arte", image: "https://placehold.co/600x450?text=Arte", date: "15 de abril de 2026" },
        { id: 10, title: "Política: El Gobierno Implementa Nuevas Reformas", description: "El parlamento aprueba reformas integrales que afectan a millones de ciudadanos.", category: "Política", image: "https://placehold.co/400x300?text=Politica", date: "15 de abril de 2026" },
        { id: 11, title: "Educación: Universidades Anuncian Programas de Becas", description: "Las principales instituciones educativas amplían las oportunidades de ayuda financiera para estudiantes meritorios.", category: "Educación", image: "https://placehold.co/400x300?text=Educacion", date: "14 de abril de 2026" },
        { id: 12, title: "Gastronomía: Tendencias Culinarias para 2026", description: "Los chefs expertos comparten las tendencias gastronómicas más emocionantes para la temporada que se avecina.", category: "Estilo de vida", image: "https://placehold.co/400x300?text=Gastronomia", date: "14 de abril de 2026" },
        { id: 13, title: "Tecnología: Las Inversiones en Energías Renovables se Disparan", description: "Gobiernos y sector privado aceleran la financiación de proyectos de energía solar y eólica en todo el mundo.", category: "Tecnología", image: "https://placehold.co/400x300?text=Energia", date: "13 de abril de 2026" },
        { id: 14, title: "Cultura: Una Nueva Generación de Autores Renueva la Literatura", description: "Escritores emergentes de orígenes diversos aportan perspectivas frescas a la escena literaria mundial.", category: "Cultura", image: "https://placehold.co/400x300?text=Cultura", date: "13 de abril de 2026" }
    ]
};

export default function App() {
    const [language, setLanguage] = useState<Language>('en');

    const handleLanguageToggle = (newLanguage: Language) => {
        setLanguage(newLanguage);
        document.documentElement.lang = newLanguage;
    };

    return (
        <ScreenWidthProvider>
            <Header
                menuItems={menuItems[language]}
                logo="/path-to-logo.png"
                language={language}
                onLanguageToggle={handleLanguageToggle}
            />
            <Body articles={allArticles[language]} />
        </ScreenWidthProvider>
    );
}