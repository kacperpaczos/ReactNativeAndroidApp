import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

const API_BASE_URL = 'https://api.coinpaprika.com/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const checkConnection = async (): Promise<boolean> => {
  const netInfo = await NetInfo.fetch();
  return netInfo.isConnected || false;
};

export const fetcher = async (url: string) => {
  const isConnected = await checkConnection();
  if (!isConnected) {
    throw new Error('Brak połączenia z internetem');
  }
  
  const response = await api.get(url);
  return response.data;
};

export const checkApiConnection = async (): Promise<boolean> => {
  try {
    await api.get('/global');
    return true;
  } catch (error) {
    console.error('Błąd połączenia z API CoinPaprika:', error);
    return false;
  }
};

export const getGlobalMarketData = async () => {
  return fetcher('/global');
};

export const getTopCoins = async (limit: number = 20) => {
  return fetcher(`/coins?limit=${limit}`);
};

export const getCoinDetails = async (coinId: string) => {
  return fetcher(`/coins/${coinId}`);
};

export const getTopCoinsWithDetails = async (limit: number = 20) => {
  const coins = await getTopCoins(limit);
  const detailedCoins = await Promise.all(
    coins.map(async (coin: any) => {
      const details = await getCoinDetails(coin.id);
      return { ...coin, ...details };
    })
  );
  return detailedCoins;
};