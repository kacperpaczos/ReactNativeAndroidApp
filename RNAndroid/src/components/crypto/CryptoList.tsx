import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useCrypto } from '@/hooks/useCrypto';
import { CryptoListItem } from './CryptoListItem';
import { CryptoListHeader } from './CryptoListHeader';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { CryptoListPlaceholder } from './CryptoListPlaceholder';
import { useTheme } from '@/hooks/useTheme';

export const CryptoList: React.FC = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const { 
    assets, 
    loading, 
    error, 
    hasMoreItems, 
    fetchData, 
    refreshData 
  } = useCrypto();

  useEffect(() => {
    fetchData({
      page: 1,
      search: searchQuery,
      sortBy,
      sortDirection
    });
  }, [searchQuery, sortBy, sortDirection]);

  const handleRefresh = async () => {
    await refreshData();
  };

  const handleLoadMore = () => {
    if (!loading && hasMoreItems) {
      fetchData({
        page: Math.ceil(assets.length / 20) + 1,
        search: searchQuery,
        sortBy,
        sortDirection
      });
    }
  };

  if (loading && assets.length === 0) {
    return <LoadingSpinner />;
  }

  if (error && assets.length === 0) {
    return <CryptoListPlaceholder onRetry={handleRefresh} message={error} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.default }}>
      <CryptoListHeader
        onSearch={setSearchQuery}
        onSort={(newSortBy, newDirection) => {
          setSortBy(newSortBy);
          setSortDirection(newDirection);
        }}
        currentSortBy={sortBy}
        currentSortDirection={sortDirection}
      />
      <FlatList
        data={assets}
        renderItem={({ item }) => (
          <CryptoListItem asset={item} currentSortBy={sortBy} />
        )}
        keyExtractor={item => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
          />
        }
      />
    </View>
  );
};
