import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { CryptoList } from '@/components/CryptoList';
import { CryptoDataProvider } from '@/components/CryptoDataProvider';

export default function TabOneScreen() {
  return (
    <CryptoDataProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Dane CoinPaprika</Text>
        <CryptoList />
      </View>
    </CryptoDataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
