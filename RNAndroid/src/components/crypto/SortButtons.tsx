import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SortOption {
  id: string;
  label: string;
}

interface SortButtonsProps {
  options: SortOption[];
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
  colors,
}) => {
  const handleSort = (sortBy: string) => {
    if (currentSortBy === sortBy) {
      onSort(sortBy, currentSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(sortBy, 'asc');
    }
  };

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isActive = currentSortBy === option.id;
        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.button,
              { 
                backgroundColor: isActive ? colors.primary : 'transparent',
                borderColor: isActive ? colors.primary : colors.text.secondary,
              }
            ]}
            onPress={() => handleSort(option.id)}
          >
            <Text
              style={[
                styles.buttonText,
                { 
                  color: isActive ? colors.button.primary.text : colors.text.secondary,
                }
              ]}
            >
              {option.label}
              {isActive && (currentSortDirection === 'asc' ? ' ↑' : ' ↓')}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});