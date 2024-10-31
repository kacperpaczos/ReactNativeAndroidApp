import React, { useState, useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useCrypto } from '@/contexts/CryptoContext';
import { CryptoListItem } from './CryptoListItem';
import { CryptoListHeader } from './CryptoListHeader';
import { CryptoListPlaceholder } from './CryptoListPlaceholder';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useTheme } from '@/hooks/useTheme';

export const CryptoList: React.FC = () => {
  const { colors } = useTheme();
  const { assets, loading, error, refreshData } = useCrypto();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleSort = useCallback((newSortBy: string, direction: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortDirection(direction);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <CryptoListPlaceholder onRetry={refreshData} message={error} />;
  }

  const filteredAssets = assets
    .filter(asset => 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const direction = sortDirection === 'desc' ? -1 : 1;
      switch (sortBy) {
        case 'rank':
          return (a.rank - b.rank) * direction;
        case 'price':
          return ((a.quotes?.USD?.price || 0) - (b.quotes?.USD?.price || 0)) * direction;
        case 'market_cap':
          return ((a.quotes?.USD?.market_cap || 0) - (b.quotes?.USD?.market_cap || 0)) * direction;
        case 'volume_24h':
          return ((a.quotes?.USD?.volume_24h || 0) - (b.quotes?.USD?.volume_24h || 0)) * direction;
        case 'percent_change_24h':
          return ((a.quotes?.USD?.percent_change_24h || 0) - (b.quotes?.USD?.percent_change_24h || 0)) * direction;
        default:
          return 0;
      }
    });

  return (
    <>
      <CryptoListHeader
        onSearch={handleSearch}
        onSort={handleSort}
        currentSortBy={sortBy}
        currentSortDirection={sortDirection}
        defaultSearchValue={searchQuery}
      />
      <FlatList
        data={filteredAssets}
        renderItem={({ item }) => <CryptoListItem asset={item} />}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
    </>
  );
};

