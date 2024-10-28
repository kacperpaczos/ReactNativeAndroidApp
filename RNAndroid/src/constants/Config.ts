export const Config = {
  api: {
    baseUrl: 'https://api.coinpaprika.com/v1',
    timeout: 10000,
  },
  app: {
    version: '1.0.0',
    name: 'CryptoNews',
    defaultRefreshInterval: 300000, // 5 minut
  },
  storage: {
    keys: {
      isFirstLaunch: 'isFirstLaunch',
      userPreferences: 'userPreferences',
      appState: 'appState'
    }
  }
};

