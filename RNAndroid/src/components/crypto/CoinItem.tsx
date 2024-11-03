import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { formatCurrency, formatPercentage, formatMarketCap } from '@/utils/formatters';
import { CryptoAsset } from '@/types/crypto';

interface CoinItemProps {
  asset: CryptoAsset;
  currentSortBy: string;
}

export const CoinItem: React.FC<CoinItemProps> = ({ asset, currentSortBy }) => {
  const { colors, themeVersion } = useTheme();
  
  useEffect(() => {
    console.log('CoinItem - zmiana motywu, themeVersion:', themeVersion);
  }, [themeVersion]);

  const price = asset.quotes?.USD?.price ?? 0;
  const change = asset.quotes?.USD?.percent_change_24h ?? 0;
  const marketCap = asset.quotes?.USD?.market_cap ?? 0;
  const volume = asset.quotes?.USD?.volume_24h ?? 0;
  
  const isHighlighted = (field: string) => currentSortBy === field;

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <View style={styles.mainContent}>
        <View style={styles.leftSection}>
          <View style={styles.rankContainer}>
            <Text style={[
              styles.rank,
              isHighlighted('rank') && styles.highlightedValue
            ]}>
              #{asset.rank}
            </Text>
          </View>
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
          <Text style={[
            styles.price,
            isHighlighted('price') && styles.highlightedValue
          ]}>
            {formatCurrency(price)}
          </Text>
          <Text style={[
            styles.change,
            isHighlighted('change') && styles.highlightedValue,
            { color: change >= 0 ? colors.crypto.positive : colors.crypto.negative }
          ]}>
            {formatPercentage(change)}
          </Text>
        </View>
      </View>
      
      <View style={styles.additionalInfo}>
        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>
            Kapitalizacja
          </Text>
          <Text style={[styles.infoValue, { color: colors.text.primary }]}>
            {formatMarketCap(marketCap)}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>
            Wolumen 24h
          </Text>
          <Text style={[styles.infoValue, { color: colors.text.primary }]}>
            {formatMarketCap(volume)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankContainer: {
    width: 30,
    alignItems: 'center',
  },
  rank: {
    fontSize: 12,
    fontWeight: '500',
  },
  nameSection: {
    flex: 1,
    marginLeft: 8,
  },
  symbol: {
    fontSize: 16,
    fontWeight: '600',
  },
  name: {
    fontSize: 13,
    marginTop: 2,
  },
  priceSection: {
    alignItems: 'flex-end',
    minWidth: 100,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
  },
  change: {
    fontSize: 14,
    marginTop: 2,
    fontWeight: '500',
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 2,
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '500',
  },
  highlightedValue: {
    color: '#2196F3',
    fontWeight: '600',
  }
});