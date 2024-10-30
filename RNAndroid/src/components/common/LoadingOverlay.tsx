import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface LoadingOverlayProps {
  message: string;
  appName?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message, 
  appName = 'CryptoNews' 
}) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.appName, { color: colors.text.primary }]}>
        {appName}
      </Text>
      <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
      <Text style={[styles.message, { color: colors.text.secondary }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  spinner: {
    marginVertical: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
});