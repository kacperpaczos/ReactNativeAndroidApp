import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WelcomeScreen } from '@components/WelcomeScreen';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import { useAppContext } from '@/contexts/AppContext';

export default function Welcome() {
  const { isFirstLaunch } = useAppContext();

  if (!isFirstLaunch) {
    return null;
  }

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <WelcomeScreen />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
