import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { CryptoAsset } from '@/types/crypto';

interface CryptoListItemProps {
  asset: CryptoAsset;
  currentSortBy: string;
}

export const CryptoListItem: React.FC<CryptoListItemProps> = React.memo(({ asset, currentSortBy }) => {
  const { colors } = useTheme();
  const router = useRouter();

  if (!asset.rank || !asset.category || !asset.last_updated) {
    console.warn('Brakujące wymagane pola w asset:', {
      rank: asset.rank,
      category: asset.category,
      last_updated: asset.last_updated
    });
    
    asset = {
      ...asset,
      rank: asset.rank || 0,
      category: asset.category || 'other',
      last_updated: asset.last_updated || new Date().toISOString()
    };
  }

  const handlePress = useCallback(() => {
    router.push(`/crypto/${asset.id}`);
  }, [asset.id, router]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors.background.default },
        pressed && { opacity: 0.7 }
      ]}
      onPress={handlePress}
    >
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text.primary }]}>
          {asset.name}
        </Text>
        <Text style={[styles.symbol, { color: colors.text.secondary }]}>
          {asset.symbol}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={[styles.price, { color: colors.text.primary }]}>
          ${asset.quotes.USD.price.toFixed(2)}
        </Text>
        <Text
          style={[
            styles.change,
            { color: asset.quotes.USD.percent_change_24h >= 0 ? colors.crypto.positive : colors.crypto.negative }
          ]}
        >
          {asset.quotes.USD.percent_change_24h >= 0 ? '+' : ''}
          {asset.quotes.USD.percent_change_24h.toFixed(2)}%
        </Text>
      </View>
    </Pressable>
  );
}, (prevProps, nextProps) => {
  return prevProps.asset.id === nextProps.asset.id && 
         prevProps.currentSortBy === nextProps.currentSortBy;
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  symbol: {
    fontSize: 14,
    marginTop: 4,
  },
  priceContainer: {
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