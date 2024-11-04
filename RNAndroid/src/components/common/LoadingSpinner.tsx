// components/common/LoadingSpinner.tsx
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export const LoadingSpinner: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator 
        size="large" 
        color={colors?.primary || '#0000ff'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
});
