import { BaseRepository } from './BaseRepository';
import { NewsItem } from '@/types';
import { DatabaseManager } from '../DatabaseManager';

export class NewsRepository extends BaseRepository {
  private static instance: NewsRepository;

  private constructor() {
    super();
  }

  public static getInstance(): NewsRepository {
    if (!NewsRepository.instance) {
      NewsRepository.instance = new NewsRepository();
    }
    return NewsRepository.instance;
  }

  async saveNews(news: NewsItem[]): Promise<void> {
    const db = await DatabaseManager.getInstance().getDatabase();
    
    try {
      await db.withTransactionAsync(async (tx) => {
        // Najpierw wyczyść starsze wiadomości
        await tx.executeSqlAsync(
          'DELETE FROM news WHERE created_at < datetime("now", "-7 days")'
        );

        // Zapisz nowe wiadomości
        for (const item of news) {
          await tx.executeSqlAsync(
            `INSERT OR REPLACE INTO news (
              id, title, summary, source, date, created_at
            ) VALUES (?, ?, ?, ?, ?, datetime('now'))`,
            [item.id, item.title, item.summary, item.source, item.date]
          );
        }
      });
    } catch (error) {
      console.error('Błąd podczas zapisywania wiadomości:', error);
      throw error;
    }
  }

  async getNews(limit: number = 20): Promise<NewsItem[]> {
    const db = await DatabaseManager.getInstance().getDatabase();
    
    try {
      const result = await db.executeSqlAsync(
        `SELECT * FROM news 
         ORDER BY date DESC 
         LIMIT ?`,
        [limit]
      );

      return result.rows.map(row => ({
        id: row.id,
        title: row.title,
        summary: row.summary,
        source: row.source,
        date: row.date
      }));
    } catch (error) {
      console.error('Błąd podczas pobierania wiadomości:', error);
      throw error;
    }
  }

  async getNewsById(id: number): Promise<NewsItem | null> {
    const db = await DatabaseManager.getInstance().getDatabase();
    
    try {
      const result = await db.executeSqlAsync(
        'SELECT * FROM news WHERE id = ?',
        [id]
      );

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return {
        id: row.id,
        title: row.title,
        summary: row.summary,
        source: row.source,
        date: row.date
      };
    } catch (error) {
      console.error('Błąd podczas pobierania wiadomości:', error);
      throw error;
    }
  }
}