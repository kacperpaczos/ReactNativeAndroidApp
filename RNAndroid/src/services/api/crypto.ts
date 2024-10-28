import { api } from './config';
import { CryptoAsset, PaginationParams } from '@/types/crypto';
import { ApiResponse } from '@/types/api';

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
        params: { start, limit },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      return {
        data: response.data,
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
      throw error;
    }
  }

  async getCoinDetails(coinId: string): Promise<CryptoAsset> {
    const response = await api.get<CryptoAsset>(`/tickers/${coinId}`);
    return response.data;
  }
}

export const cryptoApi = CryptoApi.getInstance();

