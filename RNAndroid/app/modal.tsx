import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>O aplikacji</Text>
      <View style={styles.separator} />
      <Text style={styles.text}>
        CryptoNews to aplikacja do śledzenia cen kryptowalut i najnowszych wiadomości z rynku crypto.
      </Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
