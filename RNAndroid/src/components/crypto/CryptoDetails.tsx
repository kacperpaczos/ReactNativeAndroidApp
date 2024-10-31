import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '@/hooks/useTheme';
import { CryptoAsset } from '@/types/crypto';
import { formatPrice, formatPercentage, formatMarketCap } from '@/utils/formatters';

interface CryptoDetailsProps {
  asset: CryptoAsset;
}

export const CryptoDetails: React.FC<CryptoDetailsProps> = ({ asset }) => {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('window').width;
  
  // Konwersja koloru z hex na rgba
  const chartLineColor = '46, 149, 220'; // Odpowiednik #2f95dc w RGB
  
  const chartConfig = {
    backgroundColor: colors.background.default,
    backgroundGradientFrom: colors.background.default,
    backgroundGradientTo: colors.background.default,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(46, 149, 220, ${opacity})`,
    labelColor: () => colors.text.primary,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "rgba(46, 149, 220, 1)"
    },
    strokeWidth: 2,
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: colors.border || 'rgba(0, 0, 0, 0.1)',
      strokeDasharray: "0",
    }
  };

  const generateChartData = (basePrice: number) => {
    const randomVariation = () => 0.95 + Math.random() * 0.1; // Generuje liczby między 0.95 a 1.05
    
    return {
      labels: ['1h', '2h', '3h', '4h', '5h', '6h'],
      datasets: [{
        data: Array(6).fill(0).map(() => basePrice * randomVariation())
      }]
    };
  };

  const chartData = generateChartData(asset.quotes.USD.price);

  useEffect(() => {
    console.log('CryptoDetails - aktualizacja danych:', {
      name: asset.name,
      price: asset.quotes.USD.price
    });
  }, [asset]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.default }]}>
      <View style={styles.header}>
        <Text style={[styles.symbol, { color: colors.text.primary }]}>
          {asset.symbol}
        </Text>
        <Text style={[styles.name, { color: colors.text.secondary }]}>
          {asset.name}
        </Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={[styles.price, { color: colors.text.primary }]}>
          {formatPrice(asset.quotes.USD.price)}
        </Text>
        <Text style={[
          styles.change,
          { color: asset.quotes.USD.percent_change_24h >= 0 
            ? colors.crypto.positive 
            : colors.crypto.negative 
          }
        ]}>
          {formatPercentage(asset.quotes.USD.percent_change_24h)}
        </Text>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withDots={true}
          withInnerLines={false}
          withOuterLines={true}
          withVerticalLines={false}
          withHorizontalLines={true}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
            Kapitalizacja rynkowa
          </Text>
          <Text style={[styles.statValue, { color: colors.text.primary }]}>
            {formatMarketCap(asset.quotes.USD.market_cap)}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
            Wolumen 24h
          </Text>
          <Text style={[styles.statValue, { color: colors.text.primary }]}>
            {formatMarketCap(asset.quotes.USD.volume_24h)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 12,
  },
  change: {
    fontSize: 18,
    fontWeight: '500',
  },
  chartContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsContainer: {
    marginTop: 16,
  },
  statItem: {
    marginBottom: 16,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '500',
  },
});