import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { NewsItem } from './NewsItem';
import { useNewsData } from '@/hooks/useNewsData';
import { NewsListPlaceholder } from './NewsListPlaceholder';
import { ErrorMessage } from '../common/ErrorMessage';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useTheme } from '@/hooks/useTheme';

export const NewsList: React.FC = () => {
  const { colors } = useTheme();
  const { news, loading, error, isTimeout, refreshNews } = useNewsData();

  if (loading && !news.length) {
    return <LoadingSpinner />;
  }

  if (isTimeout || error) {
    return <NewsListPlaceholder />;
  }

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      data={news}
      renderItem={({ item }) => <NewsItem {...item} />}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl 
          refreshing={loading} 
          onRefresh={refreshNews}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
      ListEmptyComponent={
        <ErrorMessage 
          message="Brak dostępnych wiadomości" 
          onRetry={refreshNews} 
        />
      }
    />
  );
};