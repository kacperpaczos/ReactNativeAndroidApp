export interface CryptoAsset {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    category: string;
    last_updated: string;
    quotes: {
      USD: {
        price: number;
        market_cap: number;
        volume_24h: number;
        percent_change_24h: number;
      };
    };
  }
  
  export interface CryptoState {
    assets: CryptoAsset[];
    loading: boolean;
    error: string | null;
    isTimeout: boolean;
    hasMore: boolean;
  }
  
  export interface CryptoContextType extends CryptoState {
    hasMoreItems: boolean;
    refreshData: () => void;
    loadMoreAssets: () => void;
  }
  
  export interface PaginationParams {
    page: number;
    limit: number;
  }