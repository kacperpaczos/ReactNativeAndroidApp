import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

const API_BASE_URL = 'https://twoje-api.com';

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
    await api.get('/health-check'); // Załóżmy, że mamy endpoint /health-check
    return true;
  } catch (error) {
    //console.error('Błąd połączenia z API:', error);
    return false;
  }
};