import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNetwork } from '@/hooks/useNetwork';
import { CryptoDao } from '@/dao/CryptoDao';
import { CryptoAsset } from '@/types/crypto';

interface FetchOptions {
  page?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

interface CryptoContextType {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
  hasMoreItems: boolean;
  refreshData: () => Promise<void>;
  fetchData: (options: FetchOptions) => Promise<void>;
}

export const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const { isConnected } = useNetwork();
  const cryptoDao = CryptoDao.getInstance();

  const fetchData = useCallback(async (options: FetchOptions = {}) => {
    if (!isConnected) {
      setError('Brak połączenia z internetem');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const validatedOptions = {
        ...options,
        sortDirection: options.sortDirection || 'asc',
        sortBy: options.sortBy || 'rank'
      };

      const data = await cryptoDao.getCoins(validatedOptions);
      const newAssets = Array.isArray(data) ? data : [];
      
      setAssets(prev => options.page === 1 ? newAssets : [...prev, ...newAssets]);
      setHasMoreItems(newAssets.length === 20);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
      setError('Nie udało się załadować danych');
    } finally {
      setLoading(false);
    }
  }, [isConnected]);

  const refreshData = useCallback(async () => {
    await cryptoDao.refreshData();
    await fetchData({ page: 1 });
  }, [fetchData]);

  return (
    <CryptoContext.Provider value={{
      assets,
      loading,
      error,
      hasMoreItems,
      refreshData,
      fetchData
    }}>
      {children}
    </CryptoContext.Provider>
  );
};