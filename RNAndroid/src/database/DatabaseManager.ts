import * as SQLite from 'expo-sqlite';
import { DatabaseConfig } from './config/database.config';
import { TableSchemas } from './schemas/tables';

export class DatabaseManager {
  private static instance: DatabaseManager;
  private db: SQLite.SQLiteDatabase | null = null;

  private constructor() {}

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  async initialize(): Promise<void> {
    try {
      this.db = await SQLite.openDatabaseAsync(DatabaseConfig.name);
      await this.createTables();
      console.log('Baza danych została zainicjalizowana pomyślnie');
    } catch (error) {
      console.error('Błąd podczas inicjalizacji bazy danych:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Baza danych nie jest zainicjalizowana');

    try {
      for (const [tableName, schema] of Object.entries(TableSchemas)) {
        await this.db.execAsync(schema);
        console.log(`Tabela ${tableName} została utworzona pomyślnie`);
      }
    } catch (error) {
      console.error('Błąd podczas tworzenia tabel:', error);
      throw error;
    }
  }

  getDatabase(): SQLite.SQLiteDatabase {
    if (!this.db) {
      throw new Error('Baza danych nie jest zainicjalizowana');
    }
    return this.db;
  }
}