import { CryptoAsset } from '@/types/crypto';

export interface DatabaseCryptoAsset {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  price_usd: number;
  market_cap_usd: number;
  percent_change_24h: number;
  category: string;
  last_updated: string;
  volume_24h_usd: number;
}

export class CryptoDataAdapter {
  static toDatabase(apiData: CryptoAsset): DatabaseCryptoAsset {
    if (!apiData || typeof apiData !== 'object') {
      throw new Error('Nieprawidłowe dane wejściowe');
    }

    if (!apiData.quotes?.USD) {
      throw new Error('Brak wymaganych danych USD');
    }

    return {
      id: String(apiData.id),
      name: String(apiData.name || ''),
      symbol: String(apiData.symbol || ''),
      rank: Number(apiData.rank) || 0,
      price_usd: Number(apiData.quotes.USD.price) || 0,
      market_cap_usd: Number(apiData.quotes.USD.market_cap) || 0,
      percent_change_24h: Number(apiData.quotes.USD.percent_change_24h) || 0,
      category: String(apiData.category || 'other'),
      last_updated: String(apiData.last_updated || new Date().toISOString()),
      volume_24h_usd: Number(apiData.quotes.USD.volume_24h) || 0
    };
  }

  static fromDatabase(dbData: DatabaseCryptoAsset): CryptoAsset {
    const safeDbData = {
      id: String(dbData.id || ''),
      name: String(dbData.name || ''),
      symbol: String(dbData.symbol || ''),
      rank: Number(dbData.rank || 0),
      price_usd: Number(dbData.price_usd || 0),
      market_cap_usd: Number(dbData.market_cap_usd || 0),
      percent_change_24h: Number(dbData.percent_change_24h || 0),
      category: String(dbData.category || 'other'),
      last_updated: String(dbData.last_updated || new Date().toISOString()),
      volume_24h_usd: Number(dbData.volume_24h_usd || 0)
    };

    return {
      id: safeDbData.id,
      name: safeDbData.name,
      symbol: safeDbData.symbol,
      rank: safeDbData.rank,
      category: safeDbData.category,
      last_updated: safeDbData.last_updated,
      quotes: {
        USD: {
          price: safeDbData.price_usd,
          market_cap: safeDbData.market_cap_usd,
          percent_change_24h: safeDbData.percent_change_24h,
          volume_24h: safeDbData.volume_24h_usd
        }
      }
    };
  }
}