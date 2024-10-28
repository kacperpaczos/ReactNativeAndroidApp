import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/contexts/AppContext';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { Colors } from '@constants/Colors';

export default function SplashScreen() {
  const router = useRouter();
  const { isFirstLaunch, isLoading } = useAppContext();

  useEffect(() => {
    const initialize = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (!isLoading) {
          router.replace(isFirstLaunch ? '/(welcome)' : '/(tabs)');
        }
      } catch (error) {
        console.error('Błąd podczas inicjalizacji:', error);
      }
    };

    initialize();
  }, [isLoading, isFirstLaunch]);

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <LoadingSpinner color={Colors.primary} />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.default,
  },
});
