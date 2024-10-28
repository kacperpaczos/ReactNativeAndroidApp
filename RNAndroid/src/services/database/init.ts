import { DatabaseManager } from '@database/DatabaseManager';
import { TableSchemas } from '@database/schemas/tables';

export const initDatabase = async () => {
  try {
    console.log('Rozpoczęcie inicjalizacji bazy danych...');
    const dbManager = DatabaseManager.getInstance();
    await dbManager.initialize();
    
    console.log('Baza danych zainicjalizowana pomyślnie');
    return dbManager.getDatabase();
  } catch (error) {
    console.error('Błąd podczas inicjalizacji bazy danych:', error);
    throw new Error('Nie udało się zainicjalizować bazy danych');
  }
};

