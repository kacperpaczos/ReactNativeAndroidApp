export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  source: string;
}

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  quotes: {
    USD: {
      price: number;
      market_cap: number;
      volume_24h: number;
      percent_change_24h: number;
    };
  };
}

export interface UserPreferences {
  darkMode: boolean;
  refreshInterval: number;
  isFirstLaunch: boolean;
}
