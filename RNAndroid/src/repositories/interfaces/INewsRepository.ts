import { NewsItem } from '@/types';

export interface INewsRepository {
  saveNews(news: NewsItem[]): Promise<void>;
  getNews(limit?: number): Promise<NewsItem[]>;
  getNewsById(id: number): Promise<NewsItem | null>;
}