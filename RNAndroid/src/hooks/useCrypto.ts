import { useContext, useCallback } from 'react';
import { CryptoContext } from '@/contexts/CryptoContext';

interface CryptoAsset {
  id: string | number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume: number;
  quotes: {
    USD: {
      price: number;
      percent_change_24h: number;
      market_cap: number;
      volume_24h: number;
    }
  }
}

interface UseCryptoResult {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  fetchMore: () => Promise<void>;
  hasMoreItems: boolean;
  searchAssets: (query: string) => Promise<void>;
  sortAssets: (sortBy: string, direction: 'asc' | 'desc') => Promise<void>;
}

export const useCrypto = (): UseCryptoResult => {
  const context = useContext(CryptoContext);

  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }

  const { 
    assets, 
    loading, 
    error, 
    page,
    hasMoreItems,
    fetchData,
    setPage 
  } = context;

  const refreshData = useCallback(async () => {
    setPage(1);
    await fetchData(1);
  }, [fetchData, setPage]);

  const fetchMore = useCallback(async () => {
    if (!loading && hasMoreItems) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchData(nextPage);
    }
  }, [loading, hasMoreItems, page, fetchData, setPage]);

  const searchAssets = useCallback(async (query: string) => {
    setPage(1);
    await fetchData(1, { search: query });
  }, [fetchData, setPage]);

  const sortAssets = useCallback(async (sortBy: string, direction: 'asc' | 'desc') => {
    setPage(1);
    await fetchData(1, { sortBy, sortDirection: direction });
  }, [fetchData, setPage]);

  return {
    assets,
    loading,
    error,
    refreshData,
    fetchMore,
    hasMoreItems,
    searchAssets,
    sortAssets
  };
};
