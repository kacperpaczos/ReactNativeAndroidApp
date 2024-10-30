export interface INewsDao {
    getNews(limit?: number): Promise<NewsItem[]>;
    getNewsById(id: number): Promise<NewsItem | null>;
    refreshData(): Promise<void>;
    getCachedNews(): NewsItem[];
  }