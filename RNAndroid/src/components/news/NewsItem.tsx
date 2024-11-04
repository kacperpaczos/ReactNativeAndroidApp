import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface NewsItemProps {
  id: number;
  title: string;
  summary: string;
  date: string;
  source: string;
}

export const NewsItem: React.FC<NewsItemProps> = ({ id, title, summary, date, source }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('NewsDetails', { id });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.summary} numberOfLines={2}>
        {summary}
      </Text>
      <Text style={styles.source}>{source}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  summary: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  source: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});