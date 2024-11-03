import { TranslationKeys } from '@/types/language';

const en: TranslationKeys = {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Try again',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    refresh: 'Refresh'
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
    chart: 'Chart'
  },
  settings: {
    title: 'Settings',
    language: {
      title: 'Language',
      pl: 'Polish',
      en: 'English'
    },
    theme: {
      title: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      notice: 'Theme change requires app restart'
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
  modals: {
    appInfo: {
      title: 'About CryptoNews',
      description: 'Your comprehensive cryptocurrency tracking and news application',
      features: {
        title: 'Key Features',
        tracking: 'Real-time price tracking',
        news: 'Latest crypto news',
        notifications: 'Price alerts'
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
  }
};

export default en;