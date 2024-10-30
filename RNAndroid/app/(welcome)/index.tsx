import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { CustomErrorBoundary } from '@/components/common/ErrorBoundary';
import { useAppContext } from '@/contexts/AppContext';

export default function Welcome() {
  const { isFirstLaunch } = useAppContext();

  if (!isFirstLaunch) {
    return null;
  }

  return (
    <CustomErrorBoundary>
      <View style={styles.container}>
        <WelcomeScreen />
      </View>
    </CustomErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
