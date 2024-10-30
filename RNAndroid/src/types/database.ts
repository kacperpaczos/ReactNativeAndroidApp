export interface DatabaseCryptoAsset {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    price_usd: number;
    market_cap_usd: number;
    volume_24h_usd: number;  // Dodane pole
    percent_change_24h: number;
    category: string;
    last_updated: string;
  }