import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useAppState } from '@/hooks/useAppState';
import { ThemeMode } from '@/types/theme';

const THEME_OPTIONS: { id: ThemeMode; label: string; icon: string }[] = [
  { id: 'light', label: 'Jasny', icon: 'light-mode' },
  { id: 'dark', label: 'Ciemny', icon: 'dark-mode' },
  { id: 'system', label: 'Systemowy', icon: 'settings-brightness' }
];

export const ThemeSelector = () => {
  const { colors } = useTheme();
  const { userPreferences, updateUserPreferences } = useAppState();
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  const handleThemeChange = async (theme: ThemeMode) => {
    await updateUserPreferences({ ...userPreferences, darkMode: theme });
    forceUpdate();
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        Motyw aplikacji
      </Text>
      <View style={styles.optionsContainer}>
        {THEME_OPTIONS.map((option) => (
          <Pressable
            key={option.id}
            style={({ pressed }) => [
              styles.option,
              { 
                backgroundColor: colors.background.secondary,
                borderColor: userPreferences.darkMode === option.id ? colors.primary : 'transparent',
                opacity: pressed ? 0.7 : 1
              }
            ]}
            onPress={() => handleThemeChange(option.id)}
          >
            <MaterialIcons
              name={option.icon as any}
              size={24}
              color={userPreferences.darkMode === option.id ? colors.primary : colors.text.secondary}
            />
            <Text
              style={[
                styles.optionText,
                { color: userPreferences.darkMode === option.id ? colors.primary : colors.text.primary }
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  option: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
  },
  optionText: {
    marginTop: 8,
    fontSize: 14,
  },
});