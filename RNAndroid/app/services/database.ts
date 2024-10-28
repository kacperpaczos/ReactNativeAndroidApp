import * as SQLite from 'expo-sqlite';

const DB_NAME = 'cryptodata.db';

export const initDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  try {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    console.log('Baza danych została otwarta pomyślnie');
    await createTables(db);
    return db;
  } catch (error) {
    console.error('Błąd podczas inicjalizacji bazy danych:', error);
    throw error;
  }
};

const createTables = async (db: SQLite.SQLiteDatabase) => {
  const queries = `
    CREATE TABLE IF NOT EXISTS coins (
      id TEXT PRIMARY KEY,
      name TEXT,
      symbol TEXT,
      rank INTEGER,
      price_usd REAL,
      market_cap_usd REAL,
      last_updated TEXT
    );
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      published_at TEXT,
      source TEXT
    );
  `;

  try {
    await db.execAsync(queries);
    console.log('Tabele utworzone pomyślnie');
  } catch (error) {
    console.error('Błąd podczas tworzenia tabel:', error);
    throw error;
  }
};

export const insertCoin = async (db: SQLite.SQLiteDatabase, coin: any): Promise<void> => {
  const query = `
    INSERT OR REPLACE INTO coins 
    (id, name, symbol, rank, price_usd, market_cap_usd, last_updated) 
    VALUES ($id, $name, $symbol, $rank, $price, $marketCap, $lastUpdated)
  `;
  
  try {
    await db.runAsync(query, {
      $id: coin.id,
      $name: coin.name,
      $symbol: coin.symbol,
      $rank: coin.rank,
      $price: coin.quotes.USD.price,
      $marketCap: coin.quotes.USD.market_cap,
      $lastUpdated: new Date().toISOString()
    });
    console.log('Moneta dodana pomyślnie');
  } catch (error) {
    console.error('Błąd podczas wstawiania monety:', error);
    throw error;
  }
};

export const getCoins = async (db: SQLite.SQLiteDatabase, limit: number = 20): Promise<any[]> => {
  try {
    const result = await db.getAllAsync<any>('SELECT * FROM coins ORDER BY rank ASC LIMIT ?', [limit]);
    return result;
  } catch (error) {
    console.error('Błąd podczas pobierania monet:', error);
    throw error;
  }
};
