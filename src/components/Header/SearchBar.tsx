import React, { useState } from 'react';
import './SearchBar.css';
import type { Language } from '../../types/Language';

interface SearchBarProps {
  language: Language;
  compact?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ language, compact = false }) => {
  const [searchValue, setSearchValue] = useState('');

  const translations: Record<Language, { placeholder: string; go: string }> = {
    en: { placeholder: 'Search', go: 'Go' },
    it: { placeholder: 'Cerca', go: 'Vai' },
    es: { placeholder: 'Buscar', go: 'Ir' }
  };

  const t = translations[language];

  const handleSearch = () => {
    if (searchValue.trim()) {
      console.log('Search:', searchValue);
    }
  };

  return (
    <div className={`search-bar-container${compact ? ' search-bar-container--compact' : ''}`}>
      <div className="search-bar-content">
        <input
          type="text"
          className="search-input"
          placeholder={t.placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          className={`search-go-btn ${searchValue.trim() ? 'enabled' : 'disabled'}`}
          onClick={handleSearch}
          disabled={!searchValue.trim()}
        >
          {t.go}
        </button>
      </div>
    </div>
  );
};