import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { NewsDetails } from '@/components/news/NewsDetails';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function NewsDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return null;

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <NewsDetails id={parseInt(id)} />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
