import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useSWR from 'swr';

interface NewsItem {
  id: number;
  title: string;
  // dodaj inne pola według potrzeb
}

export const CryptoNews = () => {
  const { data, error } = useSWR<NewsItem[]>('/api/crypto-news');

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Wystąpił błąd: {error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Ładowanie...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={styles.newsItem}>
          <Text style={styles.newsTitle}>{item.title}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
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
    color: 'red',
  },
  newsItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});