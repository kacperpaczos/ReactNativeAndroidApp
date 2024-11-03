import React, { useCallback, useEffect } from 'react';
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
  { id: 'price_usd', label: 'Cena' },
  { id: 'market_cap_usd', label: 'Kapitalizacja' },
  { id: 'volume_24h_usd', label: 'Wolumen 24h' },
  { id: 'percent_change_24h', label: 'Zmiana 24h' }
];

export const CryptoListHeader: React.FC<CryptoListHeaderProps> = ({
  onSearch,
  onSort,
  currentSortBy,
  currentSortDirection,
  defaultSearchValue = ''
}) => {
  const { colors, themeVersion } = useTheme();

  useEffect(() => {
    console.log('CryptoListHeader - zmiana motywu, themeVersion:', themeVersion);
  }, [themeVersion]);

  const handleSearch = useCallback((text: string) => {
    onSearch(text);
  }, [onSearch]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <SearchBar 
        onSearch={handleSearch}
        defaultValue={defaultSearchValue}
        key={`search-${themeVersion}`} 
      />
      <SortButtons
        options={SORT_OPTIONS}
        currentSortBy={currentSortBy}
        currentSortDirection={currentSortDirection}
        onSort={onSort}
        colors={colors}
        key={`sort-${themeVersion}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
  },
  searchContainer: {
    marginBottom: 12,
  },
  sortContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
  }
});