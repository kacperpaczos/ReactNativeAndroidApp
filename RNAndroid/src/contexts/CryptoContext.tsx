import React, { createContext, useContext, useState, useEffect } from 'react';
import { cryptoApi } from '@/services/api/crypto';
import { useNetwork } from '@/hooks/useNetwork';
import { useAppContext } from './AppContext';
import { CryptoAsset, CryptoState, CryptoContextType } from '@/types/crypto';

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CryptoState>({
    assets: [],
    loading: false,
    error: null,
    isTimeout: false
  });

  const { isConnected } = useNetwork();
  const { userPreferences } = useAppContext();
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const fetchData = async (pageNum: number = 1) => {
    if (!isConnected) {
      setState(prev => ({ ...prev, error: 'Brak połączenia z internetem' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null, isTimeout: false }));
    
    try {
      const response = await cryptoApi.getCoins({ 
        page: pageNum, 
        limit: ITEMS_PER_PAGE 
      });
      
      setState(prev => ({ 
        ...prev, 
        assets: pageNum === 1 ? response.data : [...prev.assets, ...response.data],
        loading: false 
      }));
      setPage(pageNum);
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Wystąpił błąd',
        loading: false
      }));
    }
  };

  const refreshData = () => fetchData(1);
  
  const loadMoreAssets = () => fetchData(page + 1);

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, userPreferences.refreshInterval);
    return () => clearInterval(interval);
  }, [userPreferences.refreshInterval, isConnected]);

  return (
    <CryptoContext.Provider value={{ 
      ...state, 
      refreshData, 
      loadMoreAssets 
    }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCryptoContext = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCryptoContext must be used within CryptoProvider');
  }
  return context;
};