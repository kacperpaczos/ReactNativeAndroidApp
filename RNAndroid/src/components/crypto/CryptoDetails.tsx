import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '@/hooks/useTheme';
import { CryptoAsset } from '@/types/crypto';
import { formatPrice, formatPercentage, formatMarketCap } from '@/utils/formatters';
import { ThemeAwareLayout } from '@/components/layouts/ThemeAwareLayout';
import { ThemeColors } from '@/types/theme';

interface CryptoDetailsProps {
  asset: CryptoAsset;
}

const generateChartData = (basePrice: number) => {
  const randomVariation = () => 0.95 + Math.random() * 0.1;
  
  return {
    labels: ['1h', '2h', '3h', '4h', '5h', '6h'],
    datasets: [{
      data: Array(6).fill(0).map(() => basePrice * randomVariation())
    }]
  };
};

const getChartConfig = (colors: any) => ({
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
});

const PriceHeader: React.FC<{asset: CryptoAsset, colors: ThemeColors}> = ({asset, colors}) => (
  <View style={styles.header}>
    <Text style={[styles.name, { color: colors.text.primary }]}>
      {asset.name} ({asset.symbol})
    </Text>
    <Text style={[styles.price, { color: colors.text.primary }]}>
      ${asset.quotes.USD.price.toFixed(2)}
    </Text>
    <Text
      style={[
        styles.change,
        { 
          color: asset.quotes.USD.percent_change_24h >= 0 
            ? colors.crypto.positive 
            : colors.crypto.negative 
        }
      ]}
    >
      {asset.quotes.USD.percent_change_24h >= 0 ? '+' : ''}
      {asset.quotes.USD.percent_change_24h.toFixed(2)}%
    </Text>
  </View>
);

const StatsSection: React.FC<{asset: CryptoAsset, colors: any}> = ({asset, colors}) => (
  <View style={[styles.statsContainer, { borderColor: colors.border }]}>
    <View style={styles.statRow}>
      <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
        Kapitalizacja rynkowa
      </Text>
      <Text style={[styles.statValue, { color: colors.text.primary }]}>
        ${formatMarketCap(asset.quotes.USD.market_cap)}
      </Text>
    </View>
    <View style={styles.statRow}>
      <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
        Wolumen (24h)
      </Text>
      <Text style={[styles.statValue, { color: colors.text.primary }]}>
        ${formatMarketCap(asset.quotes.USD.volume_24h)}
      </Text>
    </View>
  </View>
);

export const CryptoDetails: React.FC<CryptoDetailsProps> = ({ asset }) => {
  const { colors, themeVersion } = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const chartData = generateChartData(asset.quotes.USD.price);
  const chartConfig = getChartConfig(colors);

  useEffect(() => {
    console.log('CryptoDetails - aktualizacja danych:', {
      name: asset.name,
      price: asset.quotes.USD.price
    });
  }, [asset]);

  useEffect(() => {
    console.log('CryptoDetails - zmiana motywu, themeVersion:', themeVersion);
  }, [themeVersion]);

  return (
    <ThemeAwareLayout>
      <ScrollView 
        style={[styles.container, { backgroundColor: colors.background.default }]}
      >
        <PriceHeader asset={asset} colors={colors} />

        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <StatsSection asset={asset} colors={colors} />
      </ScrollView>
    </ThemeAwareLayout>
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
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
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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