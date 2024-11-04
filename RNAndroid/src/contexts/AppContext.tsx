import React, { createContext, useContext, useEffect } from 'react';
import { BitcoinNotificationService } from '../services/notifications/BitcoinNotificationService';
import { useAppState } from '@/hooks/useAppState';

interface AppContextType {
  startBitcoinNotifications: () => void;
  stopBitcoinNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userPreferences } = useAppState();
  const notificationService = BitcoinNotificationService.getInstance();

  useEffect(() => {
    const initializeNotifications = async () => {
      await notificationService.initialize();
      
      if (userPreferences.notifications) {
        notificationService.startBackgroundUpdates();
      }
    };

    initializeNotifications();

    return () => {
      notificationService.stopBackgroundUpdates();
    };
  }, []);

  const startBitcoinNotifications = () => {
    notificationService.startBackgroundUpdates();
  };

  const stopBitcoinNotifications = () => {
    notificationService.stopBackgroundUpdates();
  };

  return (
    <AppContext.Provider value={{
      startBitcoinNotifications,
      stopBitcoinNotifications,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp musi być używany wewnątrz AppProvider');
  }
  return context;
};