import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image } from 'react-native';
import { Text, View } from '@components/Themed';
import { useTheme } from '@/hooks/useTheme';

export default function ModalScreen() {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <Image 
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: colors.text.primary }]}>
        O aplikacji CryptoNews
      </Text>
      <View style={[styles.separator, { backgroundColor: colors.border }]} />
      <Text style={[styles.text, { color: colors.text.primary }]}>
        CryptoNews to kompleksowe narzędzie do śledzenia rynku kryptowalut. 
        Monitoruj ceny, sprawdzaj trendy i bądź na bieżąco z najnowszymi 
        wiadomościami ze świata kryptowalut.
      </Text>
      <Text style={[styles.version, { color: colors.text.secondary }]}>
        Wersja 1.0.0
      </Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  separator: {
    marginVertical: 24,
    height: 1,
    width: '80%',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  version: {
    fontSize: 14,
    marginTop: 'auto',
    marginBottom: 20,
  },
});
