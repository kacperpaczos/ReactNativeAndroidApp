export const DatabaseConfig = {
    name: 'cryptodata3.db',
    version: '1.0',
    tables: {
      coins: 'coins',
      news: 'news',
      userPreferences: 'user_preferences'
    },
    migrations: {
      directory: '../migrations'
    }
  };