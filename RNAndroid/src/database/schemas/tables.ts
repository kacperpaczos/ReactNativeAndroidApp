export const TableSchemas = {
    coins: `
      CREATE TABLE IF NOT EXISTS coins (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        symbol TEXT NOT NULL,
        rank INTEGER,
        price_usd REAL,
        market_cap_usd REAL,
        percent_change_24h REAL,
        last_updated TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `,
    
    news: `
      CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        published_at TEXT NOT NULL,
        source TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `,
    
    userPreferences: `
      CREATE TABLE IF NOT EXISTS user_preferences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT NOT NULL,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `
  };
