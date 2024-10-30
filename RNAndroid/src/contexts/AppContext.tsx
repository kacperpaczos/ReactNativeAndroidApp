import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DatabaseManager } from '@/database/DatabaseManager';
import { UserPreferences } from '@/types/app';

interface AppState {
  isLoading: boolean;
  isFirstLaunch: boolean;
  isDatabaseReady: boolean;
  userPreferences: UserPreferences;
}

interface AppContextType extends AppState {
  setIsFirstLaunch: (value: boolean) => Promise<void>;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  refreshInterval: 30000,
  theme: 'system',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    isLoading: true,
    isFirstLaunch: true,
    isDatabaseReady: false,
    userPreferences: DEFAULT_PREFERENCES,
  });

  const setIsFirstLaunch = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('isFirstLaunch', JSON.stringify(value));
      setState(prev => ({ ...prev, isFirstLaunch: value }));
    } catch (error) {
      console.error('Błąd podczas zapisywania stanu pierwszego uruchomienia:', error);
    }
  };

  const updateUserPreferences = async (preferences: Partial<UserPreferences>) => {
    try {
      const newPreferences = { ...state.userPreferences, ...preferences };
      await AsyncStorage.setItem('userPreferences', JSON.stringify(newPreferences));
      setState(prev => ({ ...prev, userPreferences: newPreferences }));
    } catch (error) {
      console.error('Błąd podczas aktualizacji preferencji:', error);
    }
  };

  useEffect(() => {
    const initApp = async () => {
      console.log('=== AppProvider initApp start ===');
      try {
        const [storedLaunch, storedPreferences] = await Promise.all([
          AsyncStorage.getItem('isFirstLaunch'),
          AsyncStorage.getItem('userPreferences'),
        ]);

        const dbManager = await DatabaseManager.getInstance();
        await dbManager.initialize();
        console.log('=== AppProvider: baza danych zainicjalizowana ===');

        setState(prev => ({
          ...prev,
          isLoading: false,
          isDatabaseReady: true,
          isFirstLaunch: storedLaunch === null ? true : JSON.parse(storedLaunch),
          userPreferences: storedPreferences ? JSON.parse(storedPreferences) : DEFAULT_PREFERENCES,
        }));
      } catch (error) {
        console.error('Błąd podczas inicjalizacji aplikacji:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          isDatabaseReady: false,
        }));
      }
    };

    initApp();
  }, []);

  useEffect(() => {
    console.log('=== AppProvider inicjalizacja ===');
    console.log('=== AppProvider stan ===', state);
  }, [state]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setIsFirstLaunch,
        updateUserPreferences,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext musi być używany wewnątrz AppProvider');
  }
  return context;
};