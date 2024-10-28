import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNewsData } from '@/hooks/useNewsData';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { Colors } from '@/constants/Colors';

interface NewsDetailsProps {
  id: number;
}

export const NewsDetails: React.FC<NewsDetailsProps> = ({ id }) => {
  const { news, loading, error } = useNewsData();
  const newsItem = news.find(item => item.id === id);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!newsItem) {
    return <ErrorMessage message="Nie znaleziono wiadomości" />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{newsItem.title}</Text>
        <Text style={styles.date}>
          {new Date(newsItem.date).toLocaleDateString()}
        </Text>
        <Text style={styles.source}>{newsItem.source}</Text>
        <Text style={styles.text}>{newsItem.summary}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.text.primary,
  },
  date: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  source: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text.primary,
  },
});
