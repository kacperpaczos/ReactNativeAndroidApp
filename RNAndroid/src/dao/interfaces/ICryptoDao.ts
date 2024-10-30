export interface ICryptoDao {
    getCoins(options: {
      page?: number;
      limit?: number;
      search?: string;
      sortBy?: string;
      sortDirection?: 'asc' | 'desc';
      category?: string;
    }): Promise<CryptoAsset[]>;
    
    getCoinById(id: string): Promise<CryptoAsset | null>;
    refreshData(): Promise<void>;
    getCachedCoins(): CryptoAsset[];
  }