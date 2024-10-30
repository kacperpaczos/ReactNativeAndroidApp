import * as SQLite from 'expo-sqlite';
import { DatabaseConfig } from './config/database.config';
import { TableSchemas } from './schemas/tables';

export class DatabaseManager {
  private static instance: DatabaseManager;
  private db: SQLite.SQLiteDatabase | null = null;
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;

  private constructor() {}

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    if (!this.initializationPromise) {
      this.initializationPromise = this.initializeDatabase();
    }
    
    return this.initializationPromise;
  }

  private async initializeDatabase(): Promise<void> {
    try {
      this.db = await SQLite.openDatabaseAsync(DatabaseConfig.name);
      await this.createTables();
      this.isInitialized = true;
      console.log('Baza danych została zainicjalizowana pomyślnie');
    } catch (error) {
      this.db = null;
      this.isInitialized = false;
      console.error('Błąd podczas inicjalizacji bazy danych:', error);
      throw error;
    }
  }

  public getDatabase(): SQLite.SQLiteDatabase {
    if (!this.isInitialized || !this.db) {
      throw new Error('Baza danych nie jest zainicjalizowana');
    }
    return this.db;
  }

  private async createTables(): Promise<void> {
    if (!this.db) return;

    try {
      await this.db.execAsync(TableSchemas.coins);
      await this.db.execAsync(TableSchemas.news);
      await this.db.execAsync(TableSchemas.userPreferences);
      console.log('Tabele zostały utworzone pomyślnie');
    } catch (error) {
      console.error('Błąd podczas tworzenia tabel:', error);
      throw error;
    }
  }

  public async closeDatabase(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
    }
  }

  public async getCoinsCount(): Promise<number> {
    if (!this.db) return 0;
    
    try {
      const result = await this.db.execAsync([{
        sql: 'SELECT COUNT(*) as count FROM coins',
        args: []
      }]);
      
      return result[0].rows[0].count;
    } catch (error) {
      console.error('Błąd podczas liczenia monet:', error);
      return 0;
    }
  }

  private async executeWithLock<T>(operation: () => Promise<T>): Promise<T> {
    while (this.operationLock) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    this.operationLock = true;
    try {
      return await operation();
    } finally {
      this.operationLock = false;
    }
  }

  public async runQuery<T>(operation: (db: SQLite.SQLiteDatabase) => Promise<T>): Promise<T> {
    if (!this.db) throw new Error('Baza danych nie jest zainicjalizowana');
    
    return this.executeWithLock(async () => {
      console.log('=== DatabaseManager.runQuery ===');
      console.log('Stan bazy:', {
        isOpen: !!this.db,
        dbInstance: typeof this.db
      });
      
      try {
        const result = await operation(this.db!);
        return result;
      } catch (error) {
        console.error('=== Błąd w DatabaseManager.runQuery ===');
        console.error('Szczegóły błędu:', {
          message: error.message,
          stack: error.stack,
          dbState: this.db ? 'initialized' : 'null'
        });
        throw error;
      }
    });
  }

  public async testConnection(): Promise<boolean> {
    if (!this.db) return false;
    
    try {
      const result = await this.db.execAsync([{
        sql: 'SELECT 1',
        args: []
      }]);
      
      console.log('Test połączenia:', result);
      return true;
    } catch (error) {
      console.error('Błąd testu połączenia:', {
        error,
        dbState: this.db ? 'initialized' : 'null'
      });
      return false;
    }
  }
}

export const dbManager = DatabaseManager.getInstance();