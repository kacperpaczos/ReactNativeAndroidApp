import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useAppState } from '@/hooks/useAppState';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';

export default function InitialScreen() {
  const { isLoading, isFirstLaunch, isDatabaseReady } = useAppState();
  const { colors } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const navigate = async () => {
      if (!isLoading && isDatabaseReady) {
        await new Promise(resolve => setTimeout(resolve, 500));
        router.replace('/(welcome)');
      }
    };

    navigate();
  }, [isLoading, isDatabaseReady]);

  return (
    <View style={styles.container}>
      <LoadingSpinner color={colors?.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});