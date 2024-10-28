import axios from 'axios';
import { NewsItem } from '@/types';

const API_BASE_URL = 'https://api.example.com/v1'; // Zmień na właściwy URL API

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getLatestNews = async (limit: number = 20): Promise<NewsItem[]> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 sekundy timeout

    const response = await api.get('/news', {
      params: { limit },
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return response.data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Przekroczono czas oczekiwania na odpowiedź');
    }
    console.error('Błąd podczas pobierania wiadomości:', error);
    throw new Error('Nie udało się pobrać najnowszych wiadomości');
  }
};

export const getNewsDetails = async (id: number): Promise<NewsItem> => {
  try {
    const response = await api.get(`/news/${id}`);
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania szczegółów wiadomości:', error);
    throw new Error('Nie udało się pobrać szczegółów wiadomości');
  }
};

