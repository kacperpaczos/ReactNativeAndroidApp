import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppState } from '@/hooks/useAppState';

export const SettingsScreen = () => {
  console.log('=== Renderowanie SettingsScreen ===');
  const { colors } = useTheme();
  const { userPreferences, updateUserPreferences } = useAppState();

  useEffect(() => {
    console.log('SettingsScreen - aktualne preferencje:', userPreferences);
  }, [userPreferences]);

  const toggleNotifications = (value: boolean) => {
    console.log('SettingsScreen - zmiana powiadomień:', value);
    updateUserPreferences({ ...userPreferences, notifications: value });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <View style={[styles.section, { borderBottomColor: colors.border }]}>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: colors.text.primary }]}>
            Powiadomienia
          </Text>
          <Switch
            value={userPreferences?.notifications}
            onValueChange={toggleNotifications}
            trackColor={{ false: colors.border, true: colors.primary }}
          />
        </View>
      </View>
      
      <Text style={[styles.version, { color: colors.text.secondary }]}>
        Wersja aplikacji: 1.0.0
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
  },
  version: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    fontSize: 14,
  },
});