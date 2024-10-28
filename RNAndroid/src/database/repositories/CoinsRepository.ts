import { DatabaseManager } from '../DatabaseManager';

export class CoinsRepository {
  private db = DatabaseManager.getInstance().getDatabase();

  async insertCoin(coin: any): Promise<void> {
    const query = `
      INSERT OR REPLACE INTO coins 
      (id, name, symbol, rank, price_usd, market_cap_usd, percent_change_24h, last_updated) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      await this.db.runAsync(query, [
        coin.id,
        coin.name,
        coin.symbol,
        coin.rank,
        coin.quotes.USD.price,
        coin.quotes.USD.market_cap,
        coin.quotes.USD.percent_change_24h,
        new Date().toISOString()
      ]);
    } catch (error) {
      console.error('Błąd podczas zapisywania monety:', error);
      throw error;
    }
  }

  async getCoins(limit: number = 20): Promise<any[]> {
    try {
      return await this.db.getAllAsync(
        'SELECT * FROM coins ORDER BY rank ASC LIMIT ?',
        [limit]
      );
    } catch (error) {
      console.error('Błąd podczas pobierania monet:', error);
      throw error;
    }
  }
}
