import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { CryptoList } from '@/components/crypto/CryptoList';
import { CryptoProvider } from '@/contexts/CryptoContext';

export default function TabOneScreen() {
  return (
    <CryptoProvider>
      <View style={styles.container}>
        <CryptoList />
      </View>
    </CryptoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
