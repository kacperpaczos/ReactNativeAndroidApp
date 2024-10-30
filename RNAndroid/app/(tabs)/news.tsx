import { StyleSheet } from 'react-native';
import { View } from '@components/Themed';
import { NewsList } from '@components/news/NewsList';
import { CustomErrorBoundary } from '@/components/common/ErrorBoundary';

export default function NewsScreen() {
  return (
    <CustomErrorBoundary>
      <View style={styles.container}>
        <NewsList />
      </View>
    </CustomErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
