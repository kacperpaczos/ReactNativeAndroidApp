import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';

interface CryptoListFiltersProps {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (sortBy: string) => void;
  onDirectionChange: (direction: 'asc' | 'desc') => void;
}

export const CryptoListFilters: React.FC<CryptoListFiltersProps> = ({
  sortBy,
  sortDirection,
  onSortChange,
  onDirectionChange,
}) => {
  const { colors } = useTheme();
  const { translations } = useLanguage();

  const sortOptions = [
    { id: 'rank', label: translations.crypto.filters.options.rank },
    { id: 'price', label: translations.crypto.filters.options.price },
    { id: 'marketCap', label: translations.crypto.filters.options.marketCap },
    { id: 'volume', label: translations.crypto.filters.options.volume },
    { id: 'change', label: translations.crypto.filters.options.change }
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <Text style={[styles.label, { color: colors.text.secondary }]}>
        {translations.crypto.filters.sortBy}
      </Text>
      <View style={styles.optionsContainer}>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              { 
                backgroundColor: sortBy === option.id ? colors.primary : 'transparent',
                borderColor: colors.border
              }
            ]}
            onPress={() => onSortChange(option.id)}
          >
            <Text
              style={[
                styles.optionText,
                { color: sortBy === option.id ? colors.text.primary : colors.text.secondary }
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.directionButton}
        onPress={() => onDirectionChange(sortDirection === 'asc' ? 'desc' : 'asc')}
      >
        <MaterialIcons
          name={sortDirection === 'asc' ? 'arrow-upward' : 'arrow-downward'}
          size={24}
          color={colors.text.primary}
        />
        <Text style={[styles.directionText, { color: colors.text.primary }]}>
          {translations.crypto.filters.direction[sortDirection]}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 14,
  },
  directionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  directionText: {
    fontSize: 14,
  },
});