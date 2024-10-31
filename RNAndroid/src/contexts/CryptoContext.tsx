import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNetwork } from '@/hooks/useNetwork';
import { CryptoDao } from '@/dao/CryptoDao';
import { CryptoAsset } from '@/types/crypto';

interface CryptoContextType {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  showLoadingOverlay: boolean;
  toastMessage: string | null;
}

export const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isConnected } = useNetwork();
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchData = async () => {
    if (!isConnected) {
      setError('Brak połączenia z internetem');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const cryptoDao = CryptoDao.getInstance();
      await cryptoDao.refreshData();
      const newAssets = await cryptoDao.getCoins({});
      setAssets(newAssets);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
      setError('Nie udało się załadować danych');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CryptoContext.Provider 
      value={{
        assets,
        loading,
        error,
        refreshData: fetchData,
        showLoadingOverlay,
        toastMessage
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};