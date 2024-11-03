export interface UserPreferences {
    darkMode: 'light' | 'dark' | 'system';
    refreshInterval: number;
    showWelcomeScreen: boolean;
    notifications?: boolean;
  }
  
  export interface AppState {
    isOffline: boolean;
    lastUpdateTime: string | null;
    isFirstLaunch: boolean;
    userPreferences: UserPreferences;
  }
  
  export const DEFAULT_PREFERENCES: UserPreferences = {
    darkMode: 'system',
    refreshInterval: 300000,
    showWelcomeScreen: true,
    notifications: false
  };
  
  export interface AppStateManager {
    isOffline: boolean;
    lastUpdateTime: string | null;
    isFirstLaunch: boolean;
    userPreferences: UserPreferences;
    setIsOffline: (value: boolean) => void;
    setUserPreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
    resetState: () => Promise<void>;
  }