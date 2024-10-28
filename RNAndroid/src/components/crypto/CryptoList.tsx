import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { CoinItem } from './CoinItem';
import { useCryptoContext } from '@/contexts/CryptoContext';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { useTheme } from '@/hooks/useTheme';

export const CryptoList: React.FC = () => {
  const { colors } = useTheme();
  const { 
    assets, 
    loading, 
    error, 
    isTimeout, 
    refreshData, 
    loadMoreAssets 
  } = useCryptoContext();

  if (loading && !assets.length) {
    return <LoadingSpinner />;
  }

  if (isTimeout || error) {
    return (
      <ErrorMessage 
        message={error || 'Przekroczono czas oczekiwania'} 
        onRetry={refreshData}
      />
    );
  }

  return (
    <FlatList
      data={assets}
      renderItem={({ item }) => <CoinItem asset={item} />}
      keyExtractor={item => item.id}
      refreshing={loading}
      onRefresh={refreshData}
      onEndReached={loadMoreAssets}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={
        <ErrorMessage 
          message="Brak dostępnych danych" 
          onRetry={refreshData}
        />
      }
      style={[styles.list, { backgroundColor: colors.background }]}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  }
});
