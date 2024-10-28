import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserPreferences {
  refreshInterval: number;
  darkMode: boolean;
}

interface AppContextType {
  isFirstLaunch: boolean;
  setIsFirstLaunch: (value: boolean) => Promise<void>;
  userPreferences: UserPreferences;
  setUserPreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
  isLoading: boolean;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  refreshInterval: 300000, // 5 minut
  darkMode: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFirstLaunch, setIsFirstLaunchState] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userPreferences, setUserPreferencesState] = useState<UserPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const [firstLaunchValue, savedPreferences] = await Promise.all([
        AsyncStorage.getItem('isFirstLaunch'),
        AsyncStorage.getItem('userPreferences'),
      ]);

      if (firstLaunchValue !== null) {
        setIsFirstLaunchState(JSON.parse(firstLaunchValue));
      }

      if (savedPreferences !== null) {
        setUserPreferencesState(JSON.parse(savedPreferences));
      }
    } catch (error) {
      console.error('Błąd podczas inicjalizacji aplikacji:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setIsFirstLaunch = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('isFirstLaunch', JSON.stringify(value));
      setIsFirstLaunchState(value);
    } catch (error) {
      console.error('Błąd podczas zapisywania stanu pierwszego uruchomienia:', error);
    }
  };

  const setUserPreferences = async (prefs: Partial<UserPreferences>) => {
    try {
      const newPreferences = { ...userPreferences, ...prefs };
      await AsyncStorage.setItem('userPreferences', JSON.stringify(newPreferences));
      setUserPreferencesState(newPreferences);
    } catch (error) {
      console.error('Błąd podczas zapisywania preferencji:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isFirstLaunch,
        setIsFirstLaunch,
        userPreferences,
        setUserPreferences,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};