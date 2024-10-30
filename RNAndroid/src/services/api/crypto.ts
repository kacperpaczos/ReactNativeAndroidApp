import { api } from './config';
import { CryptoAsset, PaginationParams } from '@/types/crypto';
import { ApiResponse } from '@/types/api';
import { getAssetCategory } from '@/utils/cryptoCategories';

export class CryptoApi {
  private static instance: CryptoApi;
  private static TIMEOUT = 5000;

  private constructor() {}

  static getInstance(): CryptoApi {
    if (!CryptoApi.instance) {
      CryptoApi.instance = new CryptoApi();
    }
    return CryptoApi.instance;
  }

  async getCoins(params: PaginationParams): Promise<ApiResponse<CryptoAsset[]>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CryptoApi.TIMEOUT);

      const { page, limit } = params;
      const start = (page - 1) * limit;
      
      const response = await api.get<CryptoAsset[]>('/tickers', {
        params: { 
          start, 
          limit,
          quotes: 'USD'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.data) {
        throw new Error('Brak danych w odpowiedzi API');
      }

      const assetsWithCategories = response.data.map(asset => ({
        ...asset,
        category: getAssetCategory(asset.id),
        last_updated: new Date().toISOString()
      }));

      return {
        data: assetsWithCategories,
        meta: {
          page,
          limit,
          total: parseInt(response.headers['x-total-count'] || '0')
        }
      };
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Przekroczono czas oczekiwania na odpowiedź');
      }
      console.error('Błąd podczas pobierania danych z API:', error);
      throw error;
    }
  }

  async getCoinDetails(coinId: string): Promise<CryptoAsset> {
    try {
      const response = await api.get<CryptoAsset>(`/tickers/${coinId}`);
      
      if (!response.data) {
        throw new Error('Brak danych o monecie');
      }

      return {
        ...response.data,
        category: getAssetCategory(response.data.id),
        last_updated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Błąd podczas pobierania szczegółów monety:', error);
      throw error;
    }
  }
}

export const cryptoApi = CryptoApi.getInstance();

