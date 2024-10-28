import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, RefreshControl } from 'react-native';
import { useCryptoData } from './CryptoDataProvider';

export const CryptoList = () => {
  const { coins, loading, error, refreshData } = useCryptoData();

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={coins}
        renderItem={({ item }) => (
          <View style={styles.coinItem}>
            <Text style={styles.coinRank}>{item.rank}</Text>
            <View style={styles.coinInfo}>
              <Text style={styles.coinName}>{item.name} ({item.symbol})</Text>
              <Text style={styles.coinPrice}>${parseFloat(item.price_usd).toFixed(2)}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshData} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  coinItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  coinRank: {
    width: 30,
    fontWeight: 'bold',
  },
  coinInfo: {
    flex: 1,
  },
  coinName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  coinPrice: {
    fontSize: 14,
    color: 'gray',
  },
});