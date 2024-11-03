export type Language = 'pl' | 'en';

export interface TranslationKeys {
  common: {
    loading: string;
    error: string;
    retry: string;
    close: string;
    save: string;
    cancel: string;
    refresh: string;
    version: string;
  };
  crypto: {
    price: string;
    marketCap: string;
    volume24h: string;
    change24h: string;
    rank: string;
    details: string;
    back: string;
    category: string;
    chart: string;
  };
  settings: {
    title: string;
    theme: {
      title: string;
      notice: string;
      light: string;
      dark: string;
      system: string;
    };
    language: {
      title: string;
      pl: string;
      en: string;
    };
    notifications: string;
    welcomeScreen: string;
    version: string;
  };
  news: {
    title: string;
    loadError: string;
    empty: string;
    readMore: string;
    source: string;
    date: string;
  };
  welcome: {
    title: string;
    subtitle: string;
    start: string;
  };
  modals: {
    appInfo: {
      title: string;
      description: string;
      features: {
        prices: {
          title: string;
          description: string;
        };
        news: {
          title: string;
          description: string;
        };
        notifications: {
          title: string;
          description: string;
        };
      };
    };
    cryptoInfo: {
      title: string;
      description: string;
      features: {
        title: string;
        decentralized: string;
        blockchain: string;
        security: string;
        global: string;
      };
    };
  };
}