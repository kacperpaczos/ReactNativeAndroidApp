import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/contexts/AppContext';
import { CustomErrorBoundary } from '@components/common/ErrorBoundary';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { useTheme } from '@/hooks/useTheme';

export default function SplashScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { isFirstLaunch, isLoading, isDatabaseReady } = useAppContext();

  console.log('=== SplashScreen stan ===', {
    isFirstLaunch,
    isLoading,
    isDatabaseReady
  });

  useEffect(() => {
    const navigate = async () => {
      console.log('=== SplashScreen navigate start ===');
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (!isLoading && isDatabaseReady) {
          console.log('=== SplashScreen nawigacja ===', {
            isFirstLaunch,
            destination: isFirstLaunch ? '/(welcome)' : '/(tabs)'
          });
          
          if (isFirstLaunch) {
            router.replace('/(welcome)');
          } else {
            router.replace('/(tabs)');
          }
        }
      } catch (error) {
        console.error('=== SplashScreen błąd nawigacji ===', error);
      }
    };

    navigate();
  }, [isLoading, isFirstLaunch, isDatabaseReady]);

  return (
    <CustomErrorBoundary>
      <View style={[styles.container, { backgroundColor: colors.background.default }]}>
        <LoadingSpinner color={colors.primary} />
      </View>
    </CustomErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
