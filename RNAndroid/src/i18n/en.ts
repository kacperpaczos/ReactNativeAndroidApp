import { TranslationKeys } from '@/types/language';

const en: TranslationKeys = {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Try again',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    refresh: 'Refresh',
    version: 'Version'
  },
  crypto: {
    price: 'Price',
    marketCap: 'Market Cap',
    volume24h: '24h Volume',
    change24h: '24h Change',
    rank: 'Rank',
    details: 'Cryptocurrency Details',
    back: 'Back',
    category: 'Category',
    chart: 'Chart',
    filters: {
      sortBy: 'Sort by',
      options: {
        rank: 'Rank',
        price: 'Price',
        marketCap: 'Market Cap',
        volume: 'Volume',
        change: 'Change'
      },
      direction: {
        asc: 'Ascending',
        desc: 'Descending'
      }
    }
  },
  settings: {
    title: 'Settings',
    theme: {
      title: 'App Theme',
      notice: 'Theme change affects entire app appearance',
      light: 'Light',
      dark: 'Dark',
      system: 'System'
    },
    language: {
      title: 'App Language',
      pl: 'Polish',
      en: 'English'
    },
    notifications: 'Notifications',
    welcomeScreen: 'Welcome Screen',
    version: 'Version'
  },
  news: {
    title: 'News',
    loadError: 'Failed to load news',
    empty: 'No news available',
    readMore: 'Read more',
    source: 'Source',
    date: 'Date'
  },
  welcome: {
    title: 'Welcome to CryptoNews',
    subtitle: 'Track cryptocurrencies and stay updated with the latest news',
    start: 'Get Started'
  },
  modal: {
    close: 'Close',
    appInfo: {
      title: 'About CryptoNews',
      description: 'Your comprehensive cryptocurrency tracking and news application',
      features: {
        prices: {
          title: 'Real-time Prices',
          description: 'Track cryptocurrency prices live'
        },
        news: {
          title: 'News',
          description: 'Latest crypto world updates'
        },
        notifications: {
          title: 'Notifications',
          description: 'Get alerts on important changes'
        }
      }
    },
    cryptoInfo: {
      title: 'About Cryptocurrencies',
      description: 'Cryptocurrencies are digital or virtual currencies that use cryptography for security.',
      features: {
        title: 'Key Features',
        decentralized: 'Decentralized system',
        blockchain: 'Blockchain technology',
        security: 'Secure transactions',
        global: 'Global reach'
      }
    }
  },
  navigation: {
    tabs: {
      crypto: 'Cryptocurrencies',
      news: 'News',
      settings: 'Settings'
    }
  }
};

export default en;