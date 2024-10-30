import React, { createContext, useState, useContext, useEffect } from 'react';
import { DatabaseManager } from '@/database/DatabaseManager';
import { CoinsRepository } from '@/database/repositories/CoinsRepository';
import { useNetwork } from '@/hooks/useNetwork';
import { CryptoAsset } from '@/types/crypto';
import { cryptoApi } from '@/services/api/crypto';
import { CryptoDao } from '@/dao/CryptoDao';

interface CryptoContextType {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
  isTimeout: boolean;
  hasMoreItems: boolean;
  refreshData: () => void;
  loadMoreAssets: () => void;
  showLoadingOverlay: boolean;
  toastMessage: string | null;
}

const CryptoContext = createContext<CryptoContextType>({
  assets: [],
  loading: false,
  error: null,
  isTimeout: false,
  hasMoreItems: true,
  refreshData: () => {},
  loadMoreAssets: () => {},
  showLoadingOverlay: true,
  toastMessage: null,
});

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const { isConnected } = useNetwork();
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 20;

  const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minut

  const getDatabaseManager = async (): Promise<DatabaseManager> => {
    const dbManager = DatabaseManager.getInstance();
    if (!dbManager) {
      throw new Error('Menedżer bazy danych nie jest dostępny');
    }
    return dbManager;
  };

  const fetchData = async (pageNum: number = 1, filters?: {
    search?: string;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    category?: string;
  }) => {
    if (!isConnected) {
      setError('Brak połączenia z internetem');
      return;
    }

    setLoading(true);
    setError(null);
    setShowLoadingOverlay(true);
    
    try {
      const cryptoDao = CryptoDao.getInstance();
      await cryptoDao.refreshData();
      const assets = await cryptoDao.getCoins({ 
        page: pageNum, 
        limit: ITEMS_PER_PAGE,
        ...filters 
      });
      setAssets(pageNum === 1 ? assets : [...assets, ...assets]);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
      setError('Nie udało się załadować danych');
    } finally {
      setLoading(false);
      setShowLoadingOverlay(false);
    }
  };

  const refreshData = () => {
    setPage(1);
    fetchData(1);
  };

  const loadMoreAssets = () => {
    if (!loading && hasMoreItems) {
      fetchData(page + 1);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchData(1);
      } catch (error) {
        console.error('Błąd podczas inicjalizacji danych:', error);
        setError('Nie udało się zainicjalizować danych');
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (isConnected) {
        fetchData(1);
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(refreshInterval);
  }, [isConnected]);

  return (
    <CryptoContext.Provider value={{
      assets,
      loading,
      error,
      isTimeout: false,
      hasMoreItems,
      refreshData,
      loadMoreAssets,
      showLoadingOverlay,
      toastMessage
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