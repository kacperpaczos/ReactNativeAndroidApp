export interface CoinResponse {
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
  
  export interface ApiError {
    message: string;
    code?: string;
    status?: number;
  }
  
  export interface PaginationParams {
    page: number;
    limit: number;
  }
  
  export interface ApiResponse<T> {
    data: T;
    meta?: {
      total: number;
      page: number;
      limit: number;
    };
  }