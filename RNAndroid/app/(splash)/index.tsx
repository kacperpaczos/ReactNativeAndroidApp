import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppState } from '@/hooks/useAppState';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { useTheme } from '@/hooks/useTheme';
import { MotiView } from 'moti';

export default function SplashScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { isLoading, isFirstLaunch, isDatabaseReady } = useAppState();

  useEffect(() => {
    const navigate = async () => {
      if (!isLoading && isDatabaseReady) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const destination = isFirstLaunch ? '/(welcome)' : '/(tabs)';
        router.replace(destination);
      }
    };

    navigate();
  }, [isLoading, isFirstLaunch, isDatabaseReady]);

  return (
    <View style={[styles.container, { backgroundColor: colors?.background?.default }]}>
      <MotiView 
        from={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'timing', duration: 1000 }}
      >
        <Image
          source={require('@assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </MotiView>
      <LoadingSpinner color={colors?.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
});
