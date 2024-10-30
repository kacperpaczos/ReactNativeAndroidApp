import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, useWindowDimensions } from 'react-native';
import { NewsDao } from '@/dao/NewsDao';
import { NewsListItem } from './NewsListItem';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { RetryError } from '../common/RetryError';
import { useTheme } from '@/hooks/useTheme';
import { NewsItem } from '@/types';

export const NewsList: React.FC = () => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const numColumns = width >= 1024 ? 2 : 1;
  const newsDao = NewsDao.getInstance();

  const loadNews = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const data = await newsDao.getNews(20);
      setNews(data);
      setError(null);
    } catch (err) {
      setError('Nie udało się załadować wiadomości');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [newsDao]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await newsDao.refreshData();
    await loadNews(false);
    setRefreshing(false);
  }, [newsDao, loadNews]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  if (loading && !refreshing) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <RetryError message={error} onRetry={loadNews} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={news}
        renderItem={({ item }) => <NewsListItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  columnWrapper: {
    paddingHorizontal: 8,
  },
});