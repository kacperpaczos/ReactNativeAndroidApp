import { useState, useEffect } from 'react';
import { getLatestNews } from '@services/api/news';
import { NewsItem } from '@/types';
import { useNetwork } from './useNetwork';

const REFRESH_INTERVAL = 300000; // 5 minut
const LOADING_TIMEOUT = 5000;

export const useNewsData = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTimeout, setIsTimeout] = useState(false);
  const { isConnected } = useNetwork();

  const refreshNews = async () => {
    if (!isConnected) {
      setError('Brak połączenia z internetem');
      return;
    }

    setLoading(true);
    setError(null);
    setIsTimeout(false);

    const timeoutId = setTimeout(() => {
      setIsTimeout(true);
      setLoading(false);
    }, LOADING_TIMEOUT);

    try {
      const data = await getLatestNews();
      clearTimeout(timeoutId);
      setNews(data);
    } catch (err: any) {
      setError(err.message || 'Nie udało się pobrać wiadomości');
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshNews();

    const interval = setInterval(() => {
      if (isConnected) {
        refreshNews();
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [isConnected]);

  return {
    news,
    loading,
    error,
    isTimeout,
    refreshNews
  };
};