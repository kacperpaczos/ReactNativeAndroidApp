import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/hooks/useTheme';
import { Language } from '@/types/language';

export const LanguageSelector = () => {
  const { language, setLanguage, translations } = useLanguage();
  const { colors } = useTheme();

  const languages: { code: Language; label: string }[] = [
    { code: 'pl', label: translations.settings.language.pl },
    { code: 'en', label: translations.settings.language.en }
  ];

  const handleLanguageChange = async (newLanguage: Language) => {
    try {
      await setLanguage(newLanguage);
    } catch (error) {
      console.error('Błąd podczas zmiany języka:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        {translations.settings.language.title}
      </Text>
      <View style={styles.languageButtons}>
        {languages.map(({ code, label }) => (
          <TouchableOpacity
            key={code}
            style={[
              styles.languageButton,
              { 
                backgroundColor: language === code ? colors.primary : colors.background.secondary,
                borderColor: colors.border
              }
            ]}
            onPress={() => handleLanguageChange(code)}
          >
            <Text
              style={[
                styles.languageButtonText,
                { color: language === code ? colors.text.primary : colors.text.secondary }
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});