import { StyleSheet } from 'react-native';
import { View } from '@components/Themed';
import { NewsList } from '@components/news/NewsList';
import { ErrorBoundary } from '@components/common/ErrorBoundary';

export default function NewsScreen() {
  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <NewsList />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
