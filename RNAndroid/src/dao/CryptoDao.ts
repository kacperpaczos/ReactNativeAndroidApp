import { CryptoAsset } from '@/types/crypto';
import { CryptoApi } from '@/services/api/CryptoApi';

export class CryptoDao {
  private static instance: CryptoDao;
  private cache: Map<string, CryptoAsset> = new Map();
  private lastUpdate: Date | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minut

  private constructor(
    private readonly api: CryptoApi
  ) {}

  public static getInstance(): CryptoDao {
    if (!CryptoDao.instance) {
      CryptoDao.instance = new CryptoDao(
        CryptoApi.getInstance()
      );
    }
    return CryptoDao.instance;
  }

  public async getCoins(options: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    category?: string;
  } = {}): Promise<CryptoAsset[]> {
    await this.refreshCacheIfNeeded();
    let coins = Array.from(this.cache.values());

    // Filtrowanie
    if (options?.search) {
      const searchLower = options.search.toLowerCase();
      coins = coins.filter(coin => 
        coin.name.toLowerCase().includes(searchLower) ||
        coin.symbol.toLowerCase().includes(searchLower)
      );
    }

    if (options?.category && options.category !== 'all') {
      coins = coins.filter(coin => coin.category === options.category);
    }

    // Sortowanie
    if (options?.sortBy) {
      coins.sort((a, b) => {
        const direction = options.sortDirection === 'desc' ? -1 : 1;
        switch (options.sortBy) {
          case 'rank':
            return (a.rank - b.rank) * direction;
          case 'price':
            return ((a.quotes?.USD?.price || 0) - (b.quotes?.USD?.price || 0)) * direction;
          case 'market_cap':
            return ((a.quotes?.USD?.market_cap || 0) - (b.quotes?.USD?.market_cap || 0)) * direction;
          case 'volume_24h':
            return ((a.quotes?.USD?.volume_24h || 0) - (b.quotes?.USD?.volume_24h || 0)) * direction;
          case 'percent_change_24h':
            return ((a.quotes?.USD?.percent_change_24h || 0) - (b.quotes?.USD?.percent_change_24h || 0)) * direction;
          default:
            return 0;
        }
      });
    }

    // Paginacja
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const start = (page - 1) * limit;
    return coins.slice(start, start + limit);
  }

  public async getCoinById(id: string): Promise<CryptoAsset | null> {
    await this.refreshCacheIfNeeded();
    return this.cache.get(id) || null;
  }

  private async refreshCacheIfNeeded(): Promise<void> {
    if (!this.lastUpdate || 
        (Date.now() - this.lastUpdate.getTime() > this.CACHE_DURATION)) {
      await this.refreshData();
    }
  }

  public async refreshData(): Promise<void> {
    try {
      const coins = await this.api.getCoins({ limit: 100 });
      this.cache.clear();
      coins.forEach(coin => {
        this.cache.set(coin.id, coin);
      });
      this.lastUpdate = new Date();
    } catch (error) {
      console.error('Błąd podczas odświeżania danych:', error);
      throw error;
    }
  }
}