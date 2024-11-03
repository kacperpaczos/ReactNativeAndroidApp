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
    welcomeScreen: 'Welcome Screen'
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
    title: 'Welcome to CryptoNews!',
    description: 'Track current cryptocurrency prices and latest crypto market news in one place.'
  },
  modals: {
    appInfo: {
      title: 'About CryptoNews',
      description: 'Your comprehensive cryptocurrency tracking and news application',
      features: {
        prices: {
          title: 'Current Prices',
          description: 'Track cryptocurrency prices in real-time'
        },
        news: {
          title: 'News',
          description: 'Latest updates from the crypto world'
        },
        notifications: {
          title: 'Notifications',
          description: 'Receive alerts about important changes'
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
  sorting: {
    rank: 'Rank',
    price_usd: 'Price',
    market_cap_usd: 'Market Cap',
    volume_24h_usd: '24h Volume',
    percent_change_24h: '24h Change'
  },
  cryptoDetails: {
    marketCap: 'Market Cap',
    volume24h: 'Volume (24h)'
  }
};

export default en;