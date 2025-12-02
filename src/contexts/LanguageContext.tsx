import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'UZ' | 'RU' | 'EN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  languageCode: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languageMap: Record<Language, string> = {
  UZ: 'uz',
  RU: 'ru',
  EN: 'en',
};

const LANGUAGE_STORAGE_KEY = 'uft-academy-language';

// Get initial language from localStorage or default to UZ
const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
    if (saved && ['UZ', 'RU', 'EN'].includes(saved)) {
      return saved;
    }
  }
  return 'UZ'; // Default to UZ (uzbek)
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const languageCode = languageMap[language];

  // Save language to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, languageCode }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

