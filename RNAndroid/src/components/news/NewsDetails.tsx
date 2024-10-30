import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NewsDao } from '@/dao/NewsDao';
import { NewsItem } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { formatDate } from '@/utils/formatters';

interface NewsDetailsProps {
  id: number;
}

export const NewsDetails: React.FC<NewsDetailsProps> = ({ id }) => {
  const { colors } = useTheme();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNewsDetails = async () => {
      try {
        setLoading(true);
        const newsDao = NewsDao.getInstance();
        const newsDetails = await newsDao.getNewsById(id);
        if (newsDetails) {
          setNews(newsDetails);
        } else {
          setError('Nie znaleziono wiadomości');
        }
      } catch (err) {
        setError('Nie udało się załadować szczegółów wiadomości');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadNewsDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !news) {
    return (
      <View style={styles.container}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error || 'Nie znaleziono wiadomości'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        {news.title}
      </Text>
      <View style={styles.metadata}>
        <Text style={[styles.source, { color: colors.text.secondary }]}>
          {news.source}
        </Text>
        <Text style={[styles.date, { color: colors.text.secondary }]}>
          {formatDate(news.date)}
        </Text>
      </View>
      <Text style={[styles.content, { color: colors.text.primary }]}>
        {news.summary}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  source: {
    fontSize: 14,
  },
  date: {
    fontSize: 14,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
