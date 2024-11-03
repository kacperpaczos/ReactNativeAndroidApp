import { TranslationKeys } from '@/types/language';

const pl: TranslationKeys = {
  common: {
    loading: 'Ładowanie...',
    error: 'Wystąpił błąd',
    retry: 'Spróbuj ponownie',
    close: 'Zamknij',
    save: 'Zapisz',
    cancel: 'Anuluj',
    refresh: 'Odśwież',
    version: 'Wersja'
  },
  crypto: {
    price: 'Cena',
    marketCap: 'Kapitalizacja rynkowa',
    volume24h: 'Wolumen 24h',
    change24h: 'Zmiana 24h',
    rank: 'Pozycja',
    details: 'Szczegóły kryptowaluty',
    back: 'Wstecz',
    category: 'Kategoria',
    chart: 'Wykres'
  },
  settings: {
    title: 'Ustawienia',
    theme: {
      title: 'Motyw aplikacji',
      notice: 'Zmiana motywu wpłynie na wygląd całej aplikacji',
      light: 'Jasny',
      dark: 'Ciemny',
      system: 'Systemowy'
    },
    language: {
      title: 'Język aplikacji',
      pl: 'Polski',
      en: 'English'
    },
    notifications: 'Powiadomienia',
    welcomeScreen: 'Ekran powitalny',
    version: 'Wersja'
  },
  news: {
    title: 'Wiadomości',
    loadError: 'Nie udało się załadować wiadomości',
    empty: 'Brak dostępnych wiadomo��ci',
    readMore: 'Czytaj więcej',
    source: 'Źródło',
    date: 'Data'
  },
  welcome: {
    title: 'Witaj w CryptoNews!',
    description: 'Śledź aktualne ceny kryptowalut oraz najnowsze wiadomości z rynku crypto w jednym miejscu.'
  },
  modals: {
    appInfo: {
      title: 'O aplikacji CryptoNews',
      description: 'CryptoNews to kompleksowe narzędzie do śledzenia rynku kryptowalut.',
      features: {
        prices: {
          title: 'Aktualne kursy',
          description: 'Śledź na bieżąco ceny kryptowalut'
        },
        news: {
          title: 'Wiadomości',
          description: 'Najnowsze informacje ze świata crypto'
        },
        notifications: {
          title: 'Powiadomienia',
          description: 'Otrzymuj alerty o ważnych zmianach'
        }
      }
    },
    cryptoInfo: {
      title: 'O Kryptowalutach',
      description: 'Kryptowaluty to cyfrowe lub wirtualne waluty, które używają kryptografii do zabezpieczenia transakcji.',
      features: {
        title: 'Główne cechy',
        decentralized: 'Zdecentralizowany system',
        blockchain: 'Technologia blockchain',
        security: 'Bezpieczne transakcje',
        global: 'Globalny zasięg'
      }
    }
  },
  sorting: {
    rank: 'Ranking',
    price_usd: 'Cena',
    market_cap_usd: 'Kapitalizacja',
    volume_24h_usd: 'Wolumen 24h',
    percent_change_24h: 'Zmiana 24h'
  },
  cryptoDetails: {
    marketCap: 'Kapitalizacja rynkowa',
    volume24h: 'Wolumen (24h)'
  }
};

export default pl;