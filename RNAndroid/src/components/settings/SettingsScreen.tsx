import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppState } from '@/hooks/useAppState';
import { ThemeSelector } from './ThemeSelector';
import { LanguageSelector } from './LanguageSelector';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ThemeAwareLayout } from '@/components/layouts/ThemeAwareLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';

export const SettingsScreen = () => {
  const { colors } = useTheme();
  const { userPreferences, updateUserPreferences } = useAppState();
  const { translations } = useLanguage();
  const { startBitcoinNotifications, stopBitcoinNotifications } = useApp();

  if (!colors?.background?.default || 
      !colors?.text?.primary || 
      !colors?.text?.secondary || 
      !colors?.border || 
      !colors?.primary) {
    return <LoadingSpinner />;
  }

  const toggleNotifications = (value: boolean) => {
    console.log('SettingsScreen - zmiana powiadomień:', value);
    
    if (value) {
      startBitcoinNotifications();
    } else {
      stopBitcoinNotifications();
    }
    
    updateUserPreferences({ ...userPreferences, notifications: value });
  };

  const toggleWelcomeScreen = (value: boolean) => {
    console.log('SettingsScreen - zmiana ekranu powitalnego:', value);
    updateUserPreferences({ ...userPreferences, showWelcomeScreen: value });
  };

  return (
    <ThemeAwareLayout>
      <View 
        style={[styles.container, { backgroundColor: colors.background.default }]}
      >
        <View style={[styles.section, { borderBottomColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            {translations.settings.theme.title}
          </Text>
          
          <ThemeSelector />
          
          <Text style={[styles.notice, { color: colors.text.secondary }]}>
            {translations.settings.theme.notice}
          </Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingText, { color: colors.text.primary }]}>
              {translations.settings.welcomeScreen}
            </Text>
            <Switch
              value={userPreferences?.showWelcomeScreen ?? true}
              onValueChange={toggleWelcomeScreen}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={[styles.settingText, { color: colors.text.primary }]}>
              {translations.settings.notifications}
            </Text>
            <Switch
              value={userPreferences?.notifications}
              onValueChange={toggleNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          <LanguageSelector />
        </View>
        
        <Text style={[styles.version, { color: colors.text.secondary }]}>
          {translations.settings.version} 1.0.0
        </Text>
      </View>
    </ThemeAwareLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingText: {
    fontSize: 16,
  },
  notice: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  version: {
    fontSize: 14,
    textAlign: 'center',
  },
});