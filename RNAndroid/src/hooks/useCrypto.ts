import { useContext, useCallback } from 'react';
import { CryptoContext } from '@/contexts/CryptoContext';

export const useCrypto = () => {
  const context = useContext(CryptoContext);

  if (!context) {
    throw new Error('useCrypto musi być używany wewnątrz CryptoProvider');
  }

  return {
    assets: context.assets,
    loading: context.loading,
    error: context.error,
    hasMoreItems: context.hasMoreItems,
    fetchData: context.fetchData,
    refreshData: context.refreshData
  };
};
