import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from '@/theme/colors';
import { useAppState } from '@/hooks/useAppState';
import { ThemeColors } from '@/types/theme';

interface ThemeContextType {
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const { userPreferences } = useAppState();
  
  const colors = useMemo(() => {
    switch (userPreferences.darkMode) {
      case 'light':
        return lightColors;
      case 'dark':
        return darkColors;
      case 'system':
      default:
        return systemColorScheme === 'dark' ? darkColors : lightColors;
    }
  }, [userPreferences.darkMode, systemColorScheme]);

  return (
    <ThemeContext.Provider value={{ colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme musi być używany wewnątrz ThemeProvider');
  }
  return context;
};