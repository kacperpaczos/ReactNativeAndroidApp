import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CryptoList } from '@/components/crypto/CryptoList';
import { useTheme } from '@/hooks/useTheme';

export default function CryptoScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <CryptoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});