import { NewsItem } from '@/types';
import { NewsApi } from '@/services/api/news/NewsApi';
import { INewsDao } from './interfaces/INewsDao';

export class NewsDao implements INewsDao {
  private static instance: NewsDao;
  private cache: NewsItem[] = [];
  private lastUpdate: Date | null = null;
  private readonly CACHE_DURATION = 15 * 60 * 1000; // 15 minut

  private constructor(
    private readonly api: NewsApi
  ) {}

  public static getInstance(): NewsDao {
    if (!NewsDao.instance) {
      NewsDao.instance = new NewsDao(
        NewsApi.getInstance()
      );
    }
    return NewsDao.instance;
  }

  public async getNews(limit: number = 20): Promise<NewsItem[]> {
    await this.refreshCacheIfNeeded();
    return this.cache.slice(0, limit);
  }

  public async getNewsById(id: number): Promise<NewsItem | null> {
    await this.refreshCacheIfNeeded();
    return this.cache.find(news => news.id === id) || null;
  }

  public getCachedNews(): NewsItem[] {
    return [...this.cache];
  }

  private async refreshCacheIfNeeded(): Promise<void> {
    if (!this.lastUpdate || 
        (Date.now() - this.lastUpdate.getTime() > this.CACHE_DURATION)) {
      await this.refreshData();
    }
  }

  public async refreshData(): Promise<void> {
    try {
      const news = await this.api.getLatestNews();
      this.cache = news;
      this.lastUpdate = new Date();
    } catch (error) {
      console.error('Błąd podczas odświeżania wiadomości:', error);
      throw error;
    }
  }
}