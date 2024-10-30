import React, { useRef, useCallback } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

interface SearchBarProps {
  onSearch: (text: string) => void;
  defaultValue?: string;
}

export const SearchBar = React.memo<SearchBarProps>(({ onSearch, defaultValue = '' }) => {
  const { colors } = useTheme();
  const inputRef = useRef<TextInput>(null);

  const handleChangeText = useCallback((text: string) => {
    onSearch(text);
  }, [onSearch]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MaterialIcons name="search" size={24} color={colors.text.secondary} />
      <TextInput
        ref={inputRef}
        style={[styles.input, { color: colors.text.primary }]}
        placeholder="Szukaj kryptowaluty..."
        placeholderTextColor={colors.text.secondary}
        defaultValue={defaultValue}
        onChangeText={handleChangeText}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
      />
    </View>
  );
});

SearchBar.displayName = 'SearchBar';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
});