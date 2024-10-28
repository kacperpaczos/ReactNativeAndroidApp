import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/contexts/AppContext';
import { useTheme } from '@/hooks/useTheme';

export const WelcomeScreen = () => {
  const router = useRouter();
  const { setIsFirstLaunch } = useAppContext();
  const { colors } = useTheme();

  const handleStart = async () => {
    await setIsFirstLaunch(false);
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Witaj w CryptoNews!
        </Text>
        
        <Text style={[styles.description, { color: colors.text }]}>
          Śledź aktualne ceny kryptowalut oraz najnowsze wiadomości z rynku crypto.
        </Text>
        
        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>Rozpocznij</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
