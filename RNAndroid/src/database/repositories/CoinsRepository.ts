import { BaseRepository } from './BaseRepository';
import { CryptoAsset } from '@/types/crypto';
import { CryptoDataAdapter, DatabaseCryptoAsset } from '@/adapters/CryptoDataAdapter';

export class CoinsRepository extends BaseRepository {
  constructor() {
    super();
  }

  async insertCoin(coin: CryptoAsset): Promise<void> {
    if (!this.db) throw new Error('Baza danych nie jest dostępna');

    console.log('CoinsRepository.insertCoin - Start');
    const dbCoin = CryptoDataAdapter.toDatabase(coin);
    
    const query = `
      INSERT OR REPLACE INTO coins (
        id, name, symbol, rank, 
        price_usd, market_cap_usd, 
        percent_change_24h, category, 
        last_updated
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      String(dbCoin.id),
      String(dbCoin.name),
      String(dbCoin.symbol),
      Number(dbCoin.rank),
      Number(dbCoin.price_usd),
      Number(dbCoin.market_cap_usd),
      Number(dbCoin.percent_change_24h),
      String(dbCoin.category),
      String(dbCoin.last_updated)
    ];

    console.log('CoinsRepository.insertCoin - Query:', query);
    console.log('CoinsRepository.insertCoin - Params:', JSON.stringify(params, null, 2));

    try {
      await this.executeTransaction([{ query, params }]);
      console.log(`Moneta ${coin.name} została zapisana do bazy danych`);
      
      const allCoins = await this.getCoins({ limit: 100 });
      console.log('Aktualny stan bazy danych:', JSON.stringify(allCoins, null, 2));
    } catch (error) {
      console.error('Błąd podczas zapisywania monety:', error);
      throw error;
    }
  }

  async getCoins(options: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    category?: string;
  } = {}): Promise<CryptoAsset[]> {
    const {
      page = 1,
      limit = 100,
      search = '',
      sortBy = 'rank',
      sortDirection = 'asc',
      category
    } = options;

    const offset = (Number(page) - 1) * Number(limit);
    const params: any[] = [];
    
    let query = `
      SELECT 
        id, 
        name, 
        symbol, 
        rank, 
        price_usd, 
        market_cap_usd,
        volume_24h_usd, 
        percent_change_24h, 
        category, 
        last_updated
      FROM coins
    `;

    const whereConditions: string[] = [];
    
    if (search) {
      whereConditions.push('(name LIKE ? OR symbol LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    if (category && category !== 'all') {
      whereConditions.push('category = ?');
      params.push(String(category));
    }

    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    query += ` ORDER BY ${sortBy.replace(/([A-Z])/g, '_$1').toLowerCase()} ${sortDirection}`;
    query += ` LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    try {
      const result = await this.db?.execAsync([{
        sql: query,
        args: params
      }]);

      if (!result?.[0]?.rows) {
        return [];
      }

      return result[0].rows.map(row => CryptoDataAdapter.fromDatabase(row));
    } catch (error) {
      console.error('Błąd podczas pobierania monet:', error);
      throw error;
    }
  }
}

export const coinsRepository = new CoinsRepository();
