import { INewsRepository } from './interfaces/INewsRepository';
import { NewsItem } from '@/types';
import { getLatestNews, getNewsDetails } from '@/services/api/news';

export class NewsRepository implements INewsRepository {
  async getNews(limit: number = 20): Promise<NewsItem[]> {
    try {
      const news = await getLatestNews(limit);
      return news;
    } catch (error) {
      console.error('Błąd podczas pobierania wiadomości:', error);
      throw error;
    }
  }

  async getNewsById(id: number): Promise<NewsItem | null> {
    try {
      const newsDetails = await getNewsDetails(id);
      return newsDetails || null;
    } catch (error) {
      console.error('Błąd podczas pobierania szczegółów wiadomości:', error);
      throw error;
    }
  }
}