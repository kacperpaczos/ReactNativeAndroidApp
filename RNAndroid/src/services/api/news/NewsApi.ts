import { NewsItem } from '@/types';
import { INewsApi } from './interfaces/INewsApi';
import * as rssParser from 'react-native-rss-parser';

const COINDESK_RSS_URL = 'https://www.coindesk.com/arc/outboundfeeds/rss/';

export class NewsApi implements INewsApi {
  private static instance: NewsApi;

  private constructor() {}

  public static getInstance(): NewsApi {
    if (!NewsApi.instance) {
      NewsApi.instance = new NewsApi();
    }
    return NewsApi.instance;
  }

  async getLatestNews(limit: number = 20): Promise<NewsItem[]> {
    try {
      const response = await fetch(COINDESK_RSS_URL);
      const responseText = await response.text();
      const rssData = await rssParser.parse(responseText);

      return rssData.items
        .slice(0, limit)
        .map((item, index) => ({
          id: index + 1,
          title: item.title || '',
          summary: item.description || '',
          source: 'CoinDesk',
          date: new Date(item.published || new Date()).toISOString(),
          url: item.links?.[0]?.url || '',
          imageUrl: this.extractImageUrl(item.content || '')
        }));
    } catch (error) {
      console.error('Błąd podczas pobierania wiadomości:', error);
      throw new Error('Nie udało się pobrać najnowszych wiadomości');
    }
  }

  async getNewsById(id: number): Promise<NewsItem | null> {
    try {
      const allNews = await this.getLatestNews(50);
      return allNews.find(news => news.id === id) || null;
    } catch (error) {
      console.error('Błąd podczas pobierania szczegółów wiadomości:', error);
      throw error;
    }
  }

  private extractImageUrl(content: string): string {
    if (!content) return '';
    
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = content.match(imgRegex);
    
    if (match?.[1]) {
      return match[1];
    }
    
    return '';
  }
}