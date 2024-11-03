import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from '@/theme/colors';
import { useAppState } from '@/hooks/useAppState';
import { ThemeColors, ThemeMode } from '@/types/theme';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'theme';
const DEFAULT_THEME: ThemeMode = 'dark';

interface UseThemeReturn {
  colors: ThemeColors;
  currentTheme: ThemeMode;
  updateTheme: (theme: ThemeMode) => Promise<void>;
  themeVersion: number;
}

const initializeThemePreference = async (
  updateUserPreferences: (prefs: any) => Promise<void>,
  userPreferences: any
): Promise<void> => {
  try {
    const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    const themeToSet = savedTheme || DEFAULT_THEME;
    
    if (!savedTheme) {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, DEFAULT_THEME);
    }
    
    await updateUserPreferences({ 
      ...userPreferences, 
      darkMode: themeToSet as ThemeMode 
    });
  } catch (error) {
    console.error('Błąd podczas inicjalizacji motywu:', error);
    throw error;
  }
};

export const useTheme = (): UseThemeReturn => {
  const systemColorScheme = useColorScheme();
  const { userPreferences, updateUserPreferences } = useAppState();
  const [isThemeInitialized, setIsThemeInitialized] = useState(false);
  const [themeVersion, setThemeVersion] = useState(0);

  useEffect(() => {
    if (!isThemeInitialized) {
      initializeThemePreference(updateUserPreferences, userPreferences)
        .finally(() => setIsThemeInitialized(true));
    }
  }, []);

  useEffect(() => {
    console.log('useTheme - zmiana preferencji motywu:', userPreferences.darkMode);
    setThemeVersion(prev => prev + 1);
  }, [userPreferences.darkMode]);

  const getThemeColors = (): ThemeColors => {
    const isDark = userPreferences.darkMode === 'dark' || 
      (userPreferences.darkMode === 'system' && systemColorScheme === 'dark');
    return isDark ? darkColors : lightColors;
  };

  return {
    colors: getThemeColors(),
    currentTheme: userPreferences.darkMode || DEFAULT_THEME,
    themeVersion,
    updateTheme: async (theme: ThemeMode) => {
      await updateUserPreferences({ ...userPreferences, darkMode: theme });
    }
  };
};
