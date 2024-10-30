import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SortButtonsProps {
  options: Array<{ id: string; label: string }>;
  currentSortBy: string;
  currentSortDirection: 'asc' | 'desc';
  onSort: (sortBy: string, direction: 'asc' | 'desc') => void;
  colors: any;
}

export const SortButtons: React.FC<SortButtonsProps> = ({
  options,
  currentSortBy,
  currentSortDirection,
  onSort,
  colors
}) => {
  return (
    <View style={styles.sortContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.sortButton,
            currentSortBy === option.id && styles.activeSortButton,
            { borderColor: colors.border }
          ]}
          onPress={() => {
            const newDirection = currentSortBy === option.id && currentSortDirection === 'asc' ? 'desc' : 'asc';
            onSort(option.id, newDirection);
          }}
        >
          <Text style={[
            styles.sortButtonText,
            { color: currentSortBy === option.id ? colors.primary : colors.text }
          ]}>
            {option.label}
          </Text>
          {currentSortBy === option.id && (
            <MaterialCommunityIcons
              name={currentSortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
              size={16}
              color={colors.primary}
              style={styles.sortIcon}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
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