import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { SearchBar } from './SearchBar';
import { SortButtons } from './SortButtons';

interface CryptoListHeaderProps {
  onSearch: (text: string) => void;
  onSort: (sortBy: string, direction: 'asc' | 'desc') => void;
  currentSortBy: string;
  currentSortDirection: 'asc' | 'desc';
  defaultSearchValue?: string;
}

export const CryptoListHeader: React.FC<CryptoListHeaderProps> = ({
  onSearch,
  onSort,
  currentSortBy,
  currentSortDirection,
  defaultSearchValue = ''
}) => {
  const { colors, themeVersion } = useTheme();
  const { translations } = useLanguage();

  const SORT_OPTIONS = [
    { id: 'rank', field: 'rank', label: translations.crypto.filters.options.rank },
    { id: 'price_usd', field: 'price_usd', label: translations.crypto.filters.options.price },
    { id: 'market_cap_usd', field: 'market_cap_usd', label: translations.crypto.filters.options.marketCap },
    { id: 'volume_24h_usd', field: 'volume_24h_usd', label: translations.crypto.filters.options.volume },
    { id: 'percent_change_24h', field: 'percent_change_24h', label: translations.crypto.filters.options.change }
  ];

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
    marginBottom: 8,
  }
});