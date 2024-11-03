import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DatabaseManager } from '@/database/DatabaseManager';
import { UserPreferences, DEFAULT_PREFERENCES } from '@/types/appState';

export const useAppState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const initApp = async () => {
      try {
        await DatabaseManager.getInstance().initialize();
        setIsDatabaseReady(true);

        const storedLaunch = await AsyncStorage.getItem('isFirstLaunch');
        const storedPreferences = await AsyncStorage.getItem('userPreferences');
        const storedTheme = await AsyncStorage.getItem('theme');

        if (storedLaunch !== null) {
          setIsFirstLaunch(storedLaunch === 'true');
        }

        if (storedPreferences) {
          const preferences = JSON.parse(storedPreferences);
          setUserPreferences(preferences);
        }

        if (!storedTheme) {
          await AsyncStorage.setItem('theme', 'system');
          await updateUserPreferences({ ...userPreferences, darkMode: 'system' });
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Błąd inicjalizacji:', error);
        setIsLoading(false);
      }
    };

    initApp();
  }, []);

  const setFirstLaunch = async (value: boolean) => {
    await AsyncStorage.setItem('isFirstLaunch', String(value));
    setIsFirstLaunch(value);
  };

  const updateUserPreferences = async (newPreferences: Partial<UserPreferences>) => {
    console.log('useAppState - aktualizacja preferencji:', {
      obecne: userPreferences,
      nowe: newPreferences
    });

    try {
      const updatedPreferences = { ...userPreferences, ...newPreferences };
      
      console.log('useAppState - zapisywanie preferencji:', updatedPreferences);
      await AsyncStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
      
      console.log('useAppState - aktualizacja stanu');
      setUserPreferences(updatedPreferences);
      
      console.log('useAppState - preferencje zaktualizowane pomyślnie');
    } catch (error) {
      console.error('useAppState - błąd podczas aktualizacji preferencji:', error);
      throw new Error('Nie udało się zaktualizować preferencji użytkownika');
    }
  };

  return {
    isLoading,
    isDatabaseReady,
    isFirstLaunch,
    userPreferences,
    setFirstLaunch,
    updateUserPreferences
  };
};
