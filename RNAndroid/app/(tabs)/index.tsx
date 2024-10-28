import { StyleSheet } from 'react-native';
import { View } from '@components/Themed';
import { CryptoList } from '@components/crypto/CryptoList';
import { CryptoProvider } from '@/contexts/CryptoContext';

export default function CryptoScreen() {
  return (
    <CryptoProvider>
      <View style={styles.container}>
        <CryptoList />
      </View>
    </CryptoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
