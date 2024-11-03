import React, { createContext, useContext, useState } from 'react';
import { ModalsContextType } from '@/types/modals';

const ModalsContext = createContext<ModalsContextType | undefined>(undefined);

export const useModals = () => {
  const context = useContext(ModalsContext);
  if (!context) {
    throw new Error('useModals musi być używany wewnątrz ModalsProvider');
  }
  return context;
};

export const ModalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAppInfoModalVisible, setIsAppInfoModalVisible] = useState(false);
  const [isCryptoInfoModalVisible, setIsCryptoInfoModalVisible] = useState(false);

  const showAppInfoModal = () => setIsAppInfoModalVisible(true);
  const hideAppInfoModal = () => setIsAppInfoModalVisible(false);
  const showCryptoInfoModal = () => setIsCryptoInfoModalVisible(true);
  const hideCryptoInfoModal = () => setIsCryptoInfoModalVisible(false);

  return (
    <ModalsContext.Provider
      value={{
        isAppInfoModalVisible,
        isCryptoInfoModalVisible,
        showAppInfoModal,
        hideAppInfoModal,
        showCryptoInfoModal,
        hideCryptoInfoModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};