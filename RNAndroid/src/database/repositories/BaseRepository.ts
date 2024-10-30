import * as SQLite from 'expo-sqlite';
import { DatabaseManager } from '../DatabaseManager';
import { SQLiteDatabase, SQLiteStatement, SQLiteResult } from '@/types/sqlite';

export class BaseRepository {
  protected db: SQLiteDatabase | null = null;

  constructor() {
    this.initializeRepository();
  }

  private async initializeRepository(): Promise<void> {
    try {
      await DatabaseManager.getInstance().initialize();
      this.db = DatabaseManager.getInstance().getDatabase();
    } catch (error) {
      console.error('Błąd inicjalizacji repozytorium:', error);
      throw error;
    }
  }

  protected async ensureDatabase(): Promise<SQLiteDatabase> {
    if (!this.db) {
      await this.initializeRepository();
    }
    if (!this.db) {
      throw new Error('Baza danych nie jest dostępna');
    }
    return this.db;
  }

  protected async executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
    try {
      const db = await this.ensureDatabase();
      const cleanQuery = query.replace(/\s+/g, ' ').trim();
      
      const convertedParams = params.map(param => {
        if (param === null) return null;
        if (typeof param === 'number') return param;
        return String(param);
      });

      const statement: SQLiteStatement = {
        sql: cleanQuery,
        args: convertedParams
      };

      const result = await db.execAsync([statement]);
      return (result[0]?.rows || []) as T[];
    } catch (error) {
      console.error('Błąd zapytania SQL:', {
        error,
        query: query.replace(/\s+/g, ' ').trim(),
        params,
        paramTypes: params.map(p => typeof p)
      });
      throw error;
    }
  }

  protected async executeTransaction(queries: { query: string; params: any[] }[]): Promise<void> {
    if (!this.db) {
      throw new Error('Baza danych nie jest zainicjalizowana');
    }

    await DatabaseManager.getInstance().runQuery(async (db) => {
      return db.withExclusiveTransactionAsync(async (txn) => {
        for (const { query, params } of queries) {
          const sanitizedParams = params.map(param => {
            if (typeof param === 'number') return param;
            if (typeof param === 'boolean') return param ? 1 : 0;
            return String(param);
          });
          
          await txn.runAsync(query, sanitizedParams);
        }
      });
    });
  }
}