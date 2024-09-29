import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { checkConnection, checkApiConnection } from '../services/api';
import { useAppContext } from '@/components/AppContext';

export default function SplashScreen() {
  const router = useRouter();
  const [dotCount, setDotCount] = useState(0);
  const colorAnim = useRef(new Animated.Value(0)).current;
  const { setIsOffline } = useAppContext();

  useEffect(() => {
    const checkConnectionAndNavigate = async () => {
      const isConnected = await checkConnection();
      if (isConnected) {
        const isApiConnected = await checkApiConnection();
        if (isApiConnected) {
          setIsOffline(false);
          setTimeout(() => {
            router.replace('/(tabs)');
          }, 3000);
        } else {
          setIsOffline(true);
          Alert.alert(
            'Brak połączenia z API',
            'Nie można połączyć się z serwerem. Aplikacja będzie działać w trybie offline.',
            [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
          );
        }
      } else {
        setIsOffline(true);
        Alert.alert(
          'Brak połączenia',
          'Nie można połączyć się z internetem. Aplikacja będzie działać w trybie offline.',
          [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
        );
      }
    };

    checkConnectionAndNavigate();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateColor = () => {
      Animated.timing(colorAnim, {
        toValue: 4,
        duration: 4000,
        useNativeDriver: false,
      }).start(() => {
        colorAnim.setValue(0);
        animateColor();
      });
    };

    animateColor();

    return () => {
      colorAnim.stopAnimation();
    };
  }, []);

  const colorInterpolation = colorAnim.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ['#F7931A', '#627EEA', '#1ff2a6', '#1599e3', '#F7931A'],
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { color: colorInterpolation }]}>
        CryptoNews
      </Animated.Text>
      <Text style={styles.subtitle}>
        Ładowanie{'.'.repeat(dotCount)}
      </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
  },
});
