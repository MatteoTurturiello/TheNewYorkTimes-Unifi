import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  language: 'en' | 'it';
}

export const SearchBar: React.FC<SearchBarProps> = ({ language }) => {
  const [searchValue, setSearchValue] = useState('');

  const translations = {
    en: { placeholder: 'Search', go: 'Go' },
    it: { placeholder: 'Cerca', go: 'Vai' }
  };

  const t = translations[language];

  const handleSearch = () => {
    if (searchValue.trim()) {
      console.log('Search:', searchValue);
      // Implement search logic here
    }
  };

  return (
    <div className="search-bar-container">
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