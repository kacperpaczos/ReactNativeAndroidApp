import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { Colors } from '@/constants/Colors';
import { CryptoAsset } from '@/types/crypto';
import { EmptyState } from '@/components/common/EmptyState';

interface CoinItemProps {
  asset: CryptoAsset;
}

export const CoinItem: React.FC<CoinItemProps> = ({ asset }) => {
  const { colors } = useTheme();
  
  if (!asset) {
    return <EmptyState message="Brak danych" />;
  }
  
  const price = asset.quotes?.USD?.price ?? 0;
  const change = asset.quotes?.USD?.percent_change_24h ?? 0;
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.leftSection}>
        <Text style={[styles.rank, { color: colors.text.secondary }]}>
          #{asset.rank}
        </Text>
        <View style={styles.nameSection}>
          <Text style={[styles.name, { color: colors.text.primary }]}>
            {asset.name}
          </Text>
          <Text style={[styles.symbol, { color: colors.text.secondary }]}>
            {asset.symbol}
          </Text>
        </View>
      </View>
      
      <View style={styles.priceSection}>
        <Text style={[styles.price, { color: colors.text.primary }]}>
          {formatCurrency(price)}
        </Text>
        <Text style={[
          styles.change,
          { color: change > 0 
            ? Colors.crypto.positive 
            : Colors.crypto.negative 
          }
        ]}>
          {formatPercentage(change / 100)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    fontSize: 14,
    marginRight: 12,
  },
  nameSection: {
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  symbol: {
    fontSize: 12,
    marginTop: 4,
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
  },
  change: {
    fontSize: 14,
    marginTop: 4,
  },
});