// hooks/useAppStateManager.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Config } from '@constants/Config';

export interface UserPreferences {
  darkMode: boolean;
  refreshInterval: number;
}

export interface AppState {
  isOffline: boolean;
  lastUpdateTime: string | null;
  isFirstLaunch: boolean;
  userPreferences: UserPreferences;
}

const DEFAULT_STATE: AppState = {
  isOffline: false,
  lastUpdateTime: null,
  isFirstLaunch: true,
  userPreferences: {
    darkMode: false,
    refreshInterval: 300000 // 5 minut w milisekundach
  }
};

export interface AppStateManager {
  isOffline: boolean;
  lastUpdateTime: string | null;
  isFirstLaunch: boolean;
  userPreferences: {
    darkMode: boolean;
    refreshInterval: number;
  };
  setIsOffline: (value: boolean) => void;
  setUserPreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
  resetState: () => Promise<void>;
}

const useAppStateManager = (): AppStateManager => {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);

  useEffect(() => {
    loadInitialState();
  }, []);

  const loadInitialState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(Config.storage.keys.appState);
      if (savedState) {
        setState(JSON.parse(savedState));
      }
    } catch (error) {
      console.error('Błąd podczas ładowania stanu:', error);
    }
  };

  const saveState = async (newState: AppState) => {
    try {
      await AsyncStorage.setItem(Config.storage.keys.appState, JSON.stringify(newState));
    } catch (error) {
      console.error('Błąd podczas zapisywania stanu:', error);
    }
  };

  const setIsOffline = (value: boolean) => {
    const newState = { ...state, isOffline: value };
    setState(newState);
    saveState(newState);
  };

  const setUserPreferences = async (prefs: Partial<UserPreferences>) => {
    const newState = {
      ...state,
      userPreferences: {
        ...state.userPreferences,
        ...prefs
      }
    };
    setState(newState);
    await saveState(newState);
  };

  const resetState = async () => {
    setState(DEFAULT_STATE);
    await AsyncStorage.removeItem(Config.storage.keys.appState);
  };

  return {
    ...state,
    setIsOffline,
    setUserPreferences,
    resetState
  };
};

export default useAppStateManager;
