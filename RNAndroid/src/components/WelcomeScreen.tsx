import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppState } from '@/hooks/useAppState';
import { useTheme } from '@/hooks/useTheme';
import { MotiView } from 'moti';

export const WelcomeScreen = () => {
  console.log('=== Renderowanie WelcomeScreen ===');
  const router = useRouter();
  const { setFirstLaunch } = useAppState();
  const { colors } = useTheme();
  const { userPreferences } = useAppState();

  useEffect(() => {
    const checkWelcomeScreen = async () => {
      if (!userPreferences.showWelcomeScreen) {
        await setFirstLaunch(false);
        router.replace('/(tabs)');
      }
    };

    checkWelcomeScreen();
  }, [userPreferences.showWelcomeScreen]);

  if (!colors) {
    return null;
  }

  const handleStart = async () => {
    console.log('WelcomeScreen - kliknięcie przycisku Start');
    await setFirstLaunch(false);
    console.log('WelcomeScreen - przekierowanie do (tabs)');
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <MotiView
        from={{ translateY: -50, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 1000 }}
      >
        <Image
          source={require('@assets/images/welcome.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </MotiView>

      <View style={styles.content}>
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 300 }}
        >
          <Text style={[styles.title, { color: colors.text.default }]}>
            Witaj w CryptoNews!
          </Text>
          
          <Text style={[styles.description, { color: colors.text.secondary }]}>
            Śledź aktualne ceny kryptowalut oraz najnowsze wiadomości z rynku crypto w jednym miejscu.
          </Text>
        </MotiView>

        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 600 }}
        >
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: colors.primary },
              pressed && { opacity: 0.8 }
            ]}
            onPress={handleStart}
          >
            <Text style={styles.buttonText}>Rozpocznij</Text>
          </Pressable>
        </MotiView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 32,
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
