import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { ThemeMode } from '@/types/theme';
import { useLanguage } from '@/contexts/LanguageContext';

const THEME_OPTIONS: { id: ThemeMode; label: 'light' | 'dark' | 'system' }[] = [
  { id: 'light', label: 'light' },
  { id: 'dark', label: 'dark' },
  { id: 'system', label: 'system' }
];

const getThemeIcon = (theme: ThemeMode): keyof typeof MaterialIcons.glyphMap => {
  switch (theme) {
    case 'light':
      return 'light-mode';
    case 'dark':
      return 'dark-mode';
    case 'system':
      return 'settings-suggest';
    default:
      return 'light-mode';
  }
};

export const ThemeSelector = () => {
  const { colors, currentTheme, updateTheme } = useTheme();
  const { translations } = useLanguage();

  const handleThemeChange = async (theme: ThemeMode) => {
    console.log('ThemeSelector - zmiana motywu na:', theme);
    try {
      await updateTheme(theme);
      console.log('ThemeSelector - motyw zaktualizowany pomyślnie');
    } catch (error) {
      console.error('ThemeSelector - błąd podczas aktualizacji motywu:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        {translations.settings.theme.title}
      </Text>
      <View style={styles.optionsContainer}>
        {THEME_OPTIONS.map((option) => (
          <Pressable
            key={option.id}
            style={({ pressed }) => [
              styles.option,
              { 
                backgroundColor: colors.background.secondary,
                borderColor: currentTheme === option.id ? colors.primary : 'transparent',
                opacity: pressed ? 0.7 : 1
              }
            ]}
            onPress={() => handleThemeChange(option.id)}
          >
            <MaterialIcons
              name={getThemeIcon(option.id)}
              size={24}
              color={currentTheme === option.id ? colors.primary : colors.text.secondary}
            />
            <Text
              style={[
                styles.optionText,
                { color: currentTheme === option.id ? colors.primary : colors.text.primary }
              ]}
            >
              {translations.settings.theme[option.label]}
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