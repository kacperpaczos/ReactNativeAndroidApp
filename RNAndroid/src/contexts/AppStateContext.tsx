import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DatabaseManager } from '@/database/DatabaseManager';
import { UserPreferences, DEFAULT_PREFERENCES } from '@/types/appState';

interface AppStateContextType {
  isLoading: boolean;
  isDatabaseReady: boolean;
  isFirstLaunch: boolean;
  userPreferences: UserPreferences;
  setFirstLaunch: (value: boolean) => Promise<void>;
  updateUserPreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
}

const AppStateContext = createContext<AppStateContextType | null>(null);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);
  const [isFirstLaunch, setIsFirstLaunchState] = useState(true);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const initApp = async () => {
      try {
        await DatabaseManager.getInstance().initialize();
        setIsDatabaseReady(true);

        const storedLaunch = await AsyncStorage.getItem('isFirstLaunch');
        const storedPreferences = await AsyncStorage.getItem('userPreferences');

        if (storedLaunch !== null) {
          setIsFirstLaunchState(storedLaunch === 'true');
        }

        if (storedPreferences) {
          setUserPreferences(JSON.parse(storedPreferences) as UserPreferences);
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
    setIsFirstLaunchState(value);
  };

  const updateUserPreferences = async (newPreferences: Partial<UserPreferences>) => {
    const updatedPreferences = { ...userPreferences, ...newPreferences };
    await AsyncStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
    setUserPreferences(updatedPreferences);
  };

  return (
    <AppStateContext.Provider 
      value={{
        isLoading,
        isDatabaseReady,
        isFirstLaunch,
        userPreferences,
        setFirstLaunch,
        updateUserPreferences
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState musi być używany wewnątrz AppStateProvider');
  }
  return context;
};