import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language, TranslationKeys } from '@/types/language';
import pl from '@/i18n/pl';
import en from '@/i18n/en';

interface LanguageContextType {
  language: Language;
  translations: TranslationKeys;
  setLanguage: (lang: Language) => Promise<void>;
  isLanguageLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const TRANSLATIONS: Record<Language, TranslationKeys> = {
  pl,
  en
};

const STORAGE_KEY = 'app_language';
const DEFAULT_LANGUAGE: Language = 'en';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState<TranslationKeys>(TRANSLATIONS[DEFAULT_LANGUAGE]);
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(STORAGE_KEY) as Language;
        if (savedLanguage && TRANSLATIONS[savedLanguage]) {
          setLanguageState(savedLanguage);
          setTranslations(TRANSLATIONS[savedLanguage]);
        }
      } catch (error) {
        console.error('Błąd podczas ładowania języka:', error);
      } finally {
        setIsLanguageLoaded(true);
      }
    };

    loadLanguage();
  }, []);

  const setLanguage = async (newLanguage: Language) => {
    try {
      if (!TRANSLATIONS[newLanguage]) {
        throw new Error(`Nieobsługiwany język: ${newLanguage}`);
      }

      await AsyncStorage.setItem(STORAGE_KEY, newLanguage);
      setLanguageState(newLanguage);
      setTranslations(TRANSLATIONS[newLanguage]);
    } catch (error) {
      console.error('Błąd podczas zmiany języka:', error);
      throw error;
    }
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        translations, 
        setLanguage,
        isLanguageLoaded 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage musi być używany wewnątrz LanguageProvider');
  }
  return context;
};