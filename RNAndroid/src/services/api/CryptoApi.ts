import axios from 'axios';
import { CryptoAsset } from '@/types/crypto';
import { getAssetCategory } from '@/utils/cryptoCategories';

export class CryptoApi {
  private static instance: CryptoApi;
  private readonly baseURL = 'https://api.coinpaprika.com/v1';

  private constructor() {}

  public static getInstance(): CryptoApi {
    if (!CryptoApi.instance) {
      CryptoApi.instance = new CryptoApi();
    }
    return CryptoApi.instance;
  }

  public async getCoins(options: { limit?: number } = {}): Promise<CryptoAsset[]> {
    try {
      const response = await axios.get(`${this.baseURL}/tickers`, {
        params: {
          limit: options.limit || 100
        }
      });

      return response.data.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        rank: coin.rank,
        category: getAssetCategory(coin.id),
        last_updated: new Date().toISOString(),
        quotes: {
          USD: {
            price: coin.quotes.USD.price,
            market_cap: coin.quotes.USD.market_cap,
            percent_change_24h: coin.quotes.USD.percent_change_24h,
            volume_24h: coin.quotes.USD.volume_24h
          }
        }
      }));
    } catch (error) {
      console.error('Błąd podczas pobierania danych kryptowalut:', error);
      throw error;
    }
  }

  public async getCoinDetails(id: string): Promise<CryptoAsset> {
    try {
      const response = await axios.get(`${this.baseURL}/tickers/${id}`);
      const coin = response.data;

      return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        rank: coin.rank,
        category: getAssetCategory(coin.id),
        last_updated: new Date().toISOString(),
        quotes: {
          USD: {
            price: coin.quotes.USD.price,
            market_cap: coin.quotes.USD.market_cap,
            percent_change_24h: coin.quotes.USD.percent_change_24h
          }
        }
      };
    } catch (error) {
      console.error('Błąd podczas pobierania szczegółów kryptowaluty:', error);
      throw error;
    }
  }
}