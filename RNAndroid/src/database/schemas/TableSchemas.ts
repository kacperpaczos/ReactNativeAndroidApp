export const TableSchemas = {
    coins: `
      CREATE TABLE IF NOT EXISTS coins (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        symbol TEXT NOT NULL,
        rank INTEGER NOT NULL,
        price_usd REAL NOT NULL,
        market_cap_usd REAL NOT NULL,
        volume_24h_usd REAL NOT NULL,  // Dodane pole
        percent_change_24h REAL NOT NULL,
        category TEXT NOT NULL,
        last_updated TEXT NOT NULL
      )
    `
  };