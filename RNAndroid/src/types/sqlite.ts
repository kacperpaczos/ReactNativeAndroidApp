import * as SQLite from 'expo-sqlite';

export interface SQLiteStatement {
  sql: string;
  args: any[];
}

export interface SQLiteResult {
  rows: any[];
  rowsAffected: number;
}

export interface SQLiteDatabase {
  execAsync(statements: SQLiteStatement[]): Promise<SQLiteResult[]>;
  runAsync(sql: string, params?: any[]): Promise<SQLiteResult>;
  closeAsync(): Promise<void>;
  withExclusiveTransactionAsync(action: (txn: SQLite.SQLiteDatabase) => Promise<void>): Promise<void>;
}