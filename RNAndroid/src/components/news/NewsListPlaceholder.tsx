import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Placeholder } from '../common/Placeholder';

export const NewsListPlaceholder = () => {
  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.item}>
          <View style={styles.header}>
            <Placeholder width="70%" height={20} style={styles.title} />
            <Placeholder width={80} height={16} style={styles.date} />
          </View>
          <Placeholder width="100%" height={40} style={styles.summary} />
          <Placeholder width={100} height={16} style={styles.source} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
  },
  date: {},
  summary: {
    marginBottom: 8,
  },
  source: {
    alignSelf: 'flex-end',
  },
});