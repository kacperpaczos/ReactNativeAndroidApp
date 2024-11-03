import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, ThemeColors } from '@/types/theme';
import { lightColors, darkColors } from '@/theme/colors';

interface ThemeContextType {
  colors: ThemeColors;
  currentTheme: ThemeMode;
  updateTheme: (theme: ThemeMode) => Promise<void>;
  themeVersion: number;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme musi być używany wewnątrz ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('system');
  const [themeVersion, setThemeVersion] = useState(0);
  const [colors, setColors] = useState<ThemeColors>(() => {
    const baseColors = systemColorScheme === 'dark' ? darkColors : lightColors;
    return {
      background: {
        default: baseColors.background?.default || '#ffffff',
        secondary: baseColors.background?.secondary || '#f5f5f5'
      },
      text: {
        default: baseColors.text?.default || '#000000',
        primary: baseColors.text?.primary || '#000000',
        secondary: baseColors.text?.secondary || '#666666'
      },
      button: {
        primary: {
          background: baseColors.button?.primary?.background || '#2f95dc',
          text: baseColors.button?.primary?.text || '#ffffff'
        }
      },
      crypto: {
        positive: baseColors.crypto?.positive || '#00c853',
        negative: baseColors.crypto?.negative || '#ff1744',
        changeBackground: {
          positive: baseColors.crypto?.changeBackground?.positive || '#e8f5e9',
          negative: baseColors.crypto?.changeBackground?.negative || '#ffebee'
        }
      },
      chart: {
        line: baseColors.chart?.line || '#2f95dc',
        gradient: {
          start: baseColors.chart?.gradient?.start || 'rgba(47,149,220,0.8)',
          end: baseColors.chart?.gradient?.end || 'rgba(47,149,220,0.1)'
        }
      },
      primary: baseColors.primary || '#2f95dc',
      border: baseColors.border || '#e0e0e0',
      error: baseColors.error || '#ff0000',
      success: baseColors.success || '#00c853'
    };
  });

  useEffect(() => {
    const themeColors = (() => {
      switch (currentTheme) {
        case 'light':
          return lightColors;
        case 'dark':
          return darkColors;
        case 'system':
          return systemColorScheme === 'dark' ? darkColors : lightColors;
        default:
          return lightColors;
      }
    })();
    
    console.log('ThemeProvider - Aktualizacja kolorów dla motywu:', currentTheme);
    setColors(themeColors);
  }, [currentTheme, systemColorScheme]);

  const updateTheme = useCallback(async (theme: ThemeMode) => {
    try {
      const existingPrefs = await AsyncStorage.getItem('userPreferences');
      const userPreferences = existingPrefs ? JSON.parse(existingPrefs) : {};
      
      await AsyncStorage.setItem('theme', theme);
      await AsyncStorage.setItem('userPreferences', JSON.stringify({ 
        ...userPreferences, 
        darkMode: theme 
      }));
      setCurrentTheme(theme);
      setThemeVersion(prev => prev + 1);
    } catch (error) {
      console.error('Błąd podczas zapisywania motywu:', error);
      throw new Error('Nie udało się zaktualizować motywu');
    }
  }, []);

  const value = {
    colors,
    currentTheme,
    updateTheme,
    themeVersion
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};