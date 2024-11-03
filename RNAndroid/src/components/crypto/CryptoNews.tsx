import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { NewsDao } from '@/dao/NewsDao';
import { NewsItem } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { NewsListItem } from '../news/NewsListItem';

export const CryptoNews: React.FC = () => {
  const { colors, themeVersion } = useTheme();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const newsDao = NewsDao.getInstance();

  const loadNews = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const data = await newsDao.getNews();
      setNews(data);
      setError(null);
    } catch (err) {
      setError('Nie udało się załadować wiadomości');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await newsDao.refreshData();
    await loadNews(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    console.log('CryptoNews - zmiana motywu, themeVersion:', themeVersion);
    loadNews(false);
  }, [themeVersion]);

  if (loading && !refreshing) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background.default }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={news}
      renderItem={({ item }) => (
        <NewsListItem item={item} />
      )}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
      contentContainerStyle={[
        styles.listContent,
        { backgroundColor: colors.background.default }
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  listContent: {
    flexGrow: 1,
    paddingVertical: 8,
  },
});