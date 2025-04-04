'use client';

import { useState, useEffect } from 'react';

interface Language {
  code: string;
  name: string;
  region?: string;
}

interface LanguageSelectorProps {
  onLanguageChange: (languageCode: string) => void;
}

export default function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({ code: 'en', name: 'English', region: 'US' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState<Language[]>([]);

  // Main languages at the top, then Nova-3 supported languages, then AssemblyAI supported languages (without showing labels)
  const allLanguages: Language[] = [
    // Priority Languages
    { code: 'en', name: 'English', region: 'US' },
    { code: 'tr', name: 'Turkish' },
    
    // Languages supported by Deepgram Nova-3
    { code: 'es', name: 'Spanish', region: 'Spain' },
    { code: 'fr', name: 'French', region: 'France' },
    { code: 'de', name: 'German', region: 'Germany' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ar', name: 'Arabic' },
    { code: 'zh', name: 'Chinese', region: 'Mandarin, Simplified' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'hi', name: 'Hindi' },
    { code: 'pl', name: 'Polish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'cs', name: 'Czech' },
    { code: 'da', name: 'Danish' },
    { code: 'fi', name: 'Finnish' },
    { code: 'el', name: 'Greek' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'id', name: 'Indonesian' },
    { code: 'no', name: 'Norwegian' },
    { code: 'ro', name: 'Romanian' },
    { code: 'sk', name: 'Slovak' },
    { code: 'sv', name: 'Swedish' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'vi', name: 'Vietnamese' },
    
    // AssemblyAI supported languages
    { code: 'multi', name: 'Multilingual', region: 'Spanish + English' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'ca', name: 'Catalan' },
    { code: 'zh-TW', name: 'Chinese', region: 'Mandarin, Traditional' },
    { code: 'zh-Hant', name: 'Chinese', region: 'Mandarin, Traditional' },
    { code: 'zh-HK', name: 'Chinese', region: 'Cantonese, Traditional' },
    { code: 'et', name: 'Estonian' },
    { code: 'nl-BE', name: 'Flemish', region: 'Belgium' },
    { code: 'fr-CA', name: 'French', region: 'Canada' },
    { code: 'de-CH', name: 'German', region: 'Switzerland' },
    { code: 'lv', name: 'Latvian' },
    { code: 'lt', name: 'Lithuanian' },
    { code: 'ms', name: 'Malay' },
    { code: 'pt-BR', name: 'Portuguese', region: 'Brazil' },
    { code: 'pt-PT', name: 'Portuguese', region: 'Portugal' },
    { code: 'es-419', name: 'Spanish', region: 'Latin America' },
    { code: 'th', name: 'Thai' },
  ];

  // Update filtered languages whenever search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredLanguages(allLanguages);
      return;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = allLanguages.filter(lang => {
      const fullName = `${lang.name}${lang.region ? ` ${lang.region}` : ''}`;
      return fullName.toLowerCase().includes(lowerSearchTerm) || 
             lang.code.toLowerCase().includes(lowerSearchTerm);
    });
    
    setFilteredLanguages(filtered);
  }, [searchTerm]);
  
  // Initialize filtered languages with all languages
  useEffect(() => {
    setFilteredLanguages(allLanguages);
  }, []);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    onLanguageChange(language.code);
    setIsOpen(false);
    setSearchTerm('');
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Language
      </label>
      <div className="mt-1 relative">
        <button
          type="button"
          className="bg-white relative w-full border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-2.5 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center">
            <span className="block truncate">
              {selectedLanguage.name}
              {selectedLanguage.region && ` (${selectedLanguage.region})`}
            </span>
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <div className="sticky top-0 bg-white z-10 px-2 py-1.5">
              <input
                type="text"
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Search languages..."
                onChange={handleSearchChange}
                value={searchTerm}
                autoFocus
              />
            </div>
            <div>
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((language, index) => (
                  <div
                    key={`${language.code}-${index}`}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 text-gray-900"
                    onClick={() => handleLanguageSelect(language)}
                  >
                    <span className="font-normal block truncate">
                      {language.name}
                      {language.region && ` (${language.region})`}
                    </span>
                    {language.code === selectedLanguage.code && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-2 px-3 text-gray-500 italic">
                  No languages match your search
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
