import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { CryptoListHeader } from './CryptoListHeader';
import { CryptoListItem } from './CryptoListItem';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { RetryError } from '../common/RetryError';
import { useTheme } from '@/hooks/useTheme';
import { CryptoDao } from '@/dao/CryptoDao';
import { CryptoAsset } from '@/types/crypto';
import debounce from 'lodash/debounce';

export const CryptoList: React.FC = () => {
  const { colors } = useTheme();
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    sortBy: 'rank',
    sortDirection: 'asc' as 'asc' | 'desc'
  });

  const cryptoDao = CryptoDao.getInstance();

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      loadData(true, text, filters.sortBy, filters.sortDirection);
    }, 300),
    [filters.sortBy, filters.sortDirection]
  );

  const handleSearch = useCallback((text: string) => {
    setSearchValue(text);
    debouncedSearch(text);
  }, [debouncedSearch]);

  const handleSort = useCallback((sortBy: string, direction: 'asc' | 'desc') => {
    setFilters({ sortBy, sortDirection: direction });
    loadData(true, searchValue, sortBy, direction);
  }, [searchValue]);

  const loadData = useCallback(async (
    showLoading: boolean,
    search: string,
    sortBy: string,
    sortDirection: 'asc' | 'desc'
  ) => {
    if (showLoading) setLoading(true);
    try {
      const data = await cryptoDao.getCoins({
        search,
        sortBy,
        sortDirection,
        limit: 50
      });
      setAssets(data);
      setError(null);
    } catch (err) {
      setError('Nie udało się załadować danych');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData(false, searchValue, filters.sortBy, filters.sortDirection);
    setRefreshing(false);
  }, [searchValue, filters.sortBy, filters.sortDirection]);

  useEffect(() => {
    loadData(true, searchValue, filters.sortBy, filters.sortDirection);
  }, []);

  if (loading && !refreshing) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <RetryError message={error} onRetry={handleRefresh} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CryptoListHeader
        onSearch={handleSearch}
        onSort={handleSort}
        currentSortBy={filters.sortBy}
        currentSortDirection={filters.sortDirection}
        defaultSearchValue={searchValue}
      />
      <FlatList
        data={assets}
        renderItem={({ item }) => (
          <CryptoListItem 
            asset={item} 
            currentSortBy={filters.sortBy}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
