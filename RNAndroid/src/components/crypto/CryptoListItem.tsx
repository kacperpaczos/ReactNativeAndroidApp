import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { formatPrice, formatPercentage, formatMarketCap } from '@/utils/formatters';
import { CryptoAsset } from '@/types/crypto';
import { useRouter } from 'expo-router';

interface CryptoListItemProps {
  asset: CryptoAsset;
  currentSortBy: string;
}

export const CryptoListItem: React.FC<CryptoListItemProps> = 
  ({ asset, currentSortBy }) => {
    const router = useRouter();
    const { colors } = useTheme();
    const isPositive = asset.quotes.USD.percent_change_24h >= 0;
    const change = asset.quotes.USD.percent_change_24h;

    const getHighlightedValue = () => {
      switch (currentSortBy) {
        case 'price':
          return formatPrice(asset.quotes.USD.price);
        case 'market_cap':
          return formatMarketCap(asset.quotes.USD.market_cap);
        case 'volume_24h':
          return formatMarketCap(asset.quotes.USD.volume_24h);
        case 'percent_change_24h':
          return formatPercentage(change);
        default:
          return `#${asset.rank}`;
      }
    };

    const handlePress = () => {
      router.push({
        pathname: '/crypto/[id]',
        params: { id: asset.id }
      });
    };

    return (
      <TouchableOpacity 
        style={[
          styles.container, 
          { backgroundColor: colors.list.item.background }
        ]}
        onPress={handlePress}
      >
        <View style={styles.mainContent}>
          <View style={styles.leftSection}>
            <Text style={[styles.symbol, { color: colors.text.primary }]}>
              {asset.symbol}
            </Text>
            <Text style={[styles.name, { color: colors.text.secondary }]}>
              {asset.name}
            </Text>
          </View>

          <View style={styles.rightSection}>
            <Text style={[
              styles.highlightedValue,
              { color: colors.text.primary },
              currentSortBy === 'percent_change_24h' && {
                color: isPositive ? colors.crypto.positive : colors.crypto.negative
              }
            ]}>
              {getHighlightedValue()}
            </Text>

            <View style={[
              styles.changeContainer,
              { 
                backgroundColor: isPositive 
                  ? colors.crypto.changeBackground.positive 
                  : colors.crypto.changeBackground.negative 
              }
            ]}>
              <MaterialCommunityIcons
                name={isPositive ? 'trending-up' : 'trending-down'}
                size={16}
                color={isPositive ? colors.crypto.positive : colors.crypto.negative}
                style={styles.trendIcon}
              />
              <Text style={[
                styles.change,
                { color: isPositive ? colors.crypto.positive : colors.crypto.negative }
              ]}>
                {formatPercentage(change)}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.details, { borderTopColor: colors.border }]}>
          <Text style={[styles.price, { color: colors.text.primary }]}>
            {formatPrice(asset.quotes.USD.price)}
          </Text>
          <Text style={[styles.marketCap, { color: colors.text.secondary }]}>
            Kapitalizacja: {formatMarketCap(asset.quotes.USD.market_cap)}
          </Text>
        </View>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
  },
  highlightedValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  trendIcon: {
    marginRight: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: '500',
  },
  details: {
    borderTopWidth: 1,
    padding: 12,
  },
  price: {
    fontSize: 14,
    marginBottom: 4,
  },
  marketCap: {
    fontSize: 12,
  },
});