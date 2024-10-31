import React, { createContext, useContext, useState, useCallback } from 'react';

interface ModalsContextType {
  showAppInfoModal: () => void;
  hideAppInfoModal: () => void;
  isAppInfoModalVisible: boolean;
  showCryptoInfoModal: () => void;
  hideCryptoInfoModal: () => void;
  isCryptoInfoModalVisible: boolean;
}

const ModalsContext = createContext<ModalsContextType | undefined>(undefined);

export const ModalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAppInfoModalVisible, setIsAppInfoModalVisible] = useState(false);
  const [isCryptoInfoModalVisible, setCryptoInfoModalVisible] = useState(false);

  const showAppInfoModal = useCallback(() => {
    console.log('ModalsContext: Pokazywanie App modalu');
    setIsAppInfoModalVisible(true);
  }, []);

  const hideAppInfoModal = useCallback(() => {
    console.log('ModalsContext: Ukrywanie App modalu');
    setIsAppInfoModalVisible(false);
  }, []);

  const showCryptoInfoModal = useCallback(() => {
    console.log('ModalsContext: Pokazywanie Crypto modalu');
    setCryptoInfoModalVisible(true);
  }, []);

  const hideCryptoInfoModal = useCallback(() => {
    console.log('ModalsContext: Ukrywanie Crypto modalu');
    setCryptoInfoModalVisible(false);
  }, []);

  return (
    <ModalsContext.Provider 
      value={{
        isAppInfoModalVisible,
        showAppInfoModal,
        hideAppInfoModal,
        isCryptoInfoModalVisible,
        showCryptoInfoModal,
        hideCryptoInfoModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export const useModals = () => {
  const context = useContext(ModalsContext);
  if (!context) {
    throw new Error('useModals musi być używany wewnątrz ModalsProvider');
  }
  return context;
};