export const TableSchemas = {
    coins: `
      CREATE TABLE IF NOT EXISTS coins (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        symbol TEXT NOT NULL,
        rank INTEGER NOT NULL,
        price_usd REAL NOT NULL,
        market_cap_usd REAL NOT NULL,
        percent_change_24h REAL NOT NULL,
        category TEXT NOT NULL,
        last_updated TEXT NOT NULL
      )
    `,
    
    news: `
      CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        source TEXT NOT NULL,
        date TEXT NOT NULL,
        url TEXT,
        image_url TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
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
