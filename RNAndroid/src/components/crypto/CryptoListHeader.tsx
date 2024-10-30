import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { SearchBar } from './SearchBar';
import { SortButtons } from './SortButtons';

interface CryptoListHeaderProps {
  onSearch: (text: string) => void;
  onSort: (sortBy: string, direction: 'asc' | 'desc') => void;
  currentSortBy: string;
  currentSortDirection: 'asc' | 'desc';
  defaultSearchValue?: string;
}

const SORT_OPTIONS = [
  { id: 'rank', label: 'Ranking' },
  { id: 'price', label: 'Cena' },
  { id: 'market_cap', label: 'Kapitalizacja' },
  { id: 'volume_24h', label: 'Wolumen 24h' },
  { id: 'percent_change_24h', label: 'Zmiana 24h' }
];

export const CryptoListHeader = React.memo<CryptoListHeaderProps>(({
  onSearch,
  onSort,
  currentSortBy,
  currentSortDirection,
  defaultSearchValue = ''
}) => {
  const { colors } = useTheme();
  
  const handleSearch = useCallback((text: string) => {
    onSearch(text);
  }, [onSearch]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <SearchBar 
        onSearch={handleSearch} 
        defaultValue={defaultSearchValue}
      />
      <SortButtons 
        options={SORT_OPTIONS}
        currentSortBy={currentSortBy}
        currentSortDirection={currentSortDirection}
        onSort={onSort}
        colors={colors}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  sortContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  activeSortButton: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sortIcon: {
    marginLeft: 4,
  }
});