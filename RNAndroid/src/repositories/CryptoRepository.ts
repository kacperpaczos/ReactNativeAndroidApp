import { ICryptoRepository } from './interfaces/ICryptoRepository';
import { CryptoAsset } from '@/types/crypto';
import { CryptoApi } from '@/services/api/crypto';

export class CryptoRepository implements ICryptoRepository {
  private api: CryptoApi;

  constructor() {
    this.api = new CryptoApi();
  }

  async getCoins(options: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    category?: string;
  }): Promise<CryptoAsset[]> {
    try {
      const response = await this.api.getCoins({
        page: options.page || 1,
        limit: options.limit || 20
      });

      let coins = response.data || [];

      // Filtrowanie
      if (options.search) {
        const searchLower = options.search.toLowerCase();
        coins = coins.filter(coin => 
          coin.name.toLowerCase().includes(searchLower) ||
          coin.symbol.toLowerCase().includes(searchLower)
        );
      }

      if (options.category && options.category !== 'all') {
        coins = coins.filter(coin => coin.category === options.category);
      }

      // Sortowanie
      if (options.sortBy) {
        coins.sort((a, b) => {
          const direction = options.sortDirection === 'desc' ? -1 : 1;
          switch (options.sortBy) {
            case 'rank':
              return (a.rank - b.rank) * direction;
            case 'price':
              return ((a.quotes?.USD?.price || 0) - (b.quotes?.USD?.price || 0)) * direction;
            default:
              return 0;
          }
        });
      }

      return coins;
    } catch (error) {
      console.error('Błąd podczas pobierania monet:', error);
      throw error;
    }
  }

  async getCoinById(id: string): Promise<CryptoAsset | null> {
    try {
      const response = await this.api.getCoinDetails(id);
      return response || null;
    } catch (error) {
      console.error('Błąd podczas pobierania szczegółów monety:', error);
      throw error;
    }
  }
}