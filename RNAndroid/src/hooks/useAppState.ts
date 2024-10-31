import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DatabaseManager } from '@/database/DatabaseManager';

interface UserPreferences {
  darkMode: boolean;
  refreshInterval: number;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  darkMode: false,
  refreshInterval: 300000 // 5 minut
};

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

        if (storedLaunch !== null) {
          setIsFirstLaunch(storedLaunch === 'true');
        }

        if (storedPreferences) {
          setUserPreferences(JSON.parse(storedPreferences));
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
    const updatedPreferences = { ...userPreferences, ...newPreferences };
    await AsyncStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
    setUserPreferences(updatedPreferences);
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
