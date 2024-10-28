import { DatabaseManager } from '@database/DatabaseManager';

export const initDatabase = async () => {
  const dbManager = DatabaseManager.getInstance();
  await dbManager.initialize();
  return dbManager.getDatabase();
};

export const insertCoin = async (coin: any): Promise<void> => {
  const db = DatabaseManager.getInstance().getDatabase();
  const query = `
    INSERT OR REPLACE INTO coins 
    (id, name, symbol, rank, price_usd, market_cap_usd, percent_change_24h, last_updated) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  try {
    await db.runAsync(query, [
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
    console.error('Błąd podczas wstawiania monety:', error);
    throw error;
  }
};

export const getCoins = async (limit: number = 20): Promise<any[]> => {
  const db = DatabaseManager.getInstance().getDatabase();
  try {
    return await db.getAllAsync('SELECT * FROM coins ORDER BY rank ASC LIMIT ?', [limit]);
  } catch (error) {
    console.error('Błąd podczas pobierania monet:', error);
    throw error;
  }
};

