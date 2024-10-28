export interface CryptoAsset {
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
    lastUpdated: string;
  }
  
  export interface CryptoState {
    assets: CryptoAsset[];
    loading: boolean;
    error: string | null;
    isTimeout: boolean;
  }
  
  export interface CryptoContextType extends CryptoState {
    refreshData: () => Promise<void>;
    loadMoreAssets: () => Promise<void>;
  }
  
  export interface PaginationParams {
    page: number;
    limit: number;
  }