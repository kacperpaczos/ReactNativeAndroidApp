import React, { createContext, useContext, useState, useEffect } from 'react';
import { initDatabase, insertCoin, getCoins } from '@/services/database';
import { getTopCoinsWithDetails } from '@/services/api';
import * as SQLite from 'expo-sqlite';

interface CryptoDataContextType {
  coins: any[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const CryptoDataContext = createContext<CryptoDataContextType | undefined>(undefined);

export const useCryptoData = () => {
  const context = useContext(CryptoDataContext);
  if (context === undefined) {
    throw new Error('useCryptoData must be used within a CryptoDataProvider');
  }
  return context;
};

export const CryptoDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        console.log('Rozpoczęcie inicjalizacji bazy danych');
        const database = initDatabase();
        console.log('Baza danych zainicjalizowana pomyślnie');
        setDb(database);
        await refreshData(database);
      } catch (err: any) {
        console.error('Błąd podczas inicjalizacji bazy danych:', err);
        setError(err.message || 'Nie udało się zainicjalizować bazy danych');
      } finally {
        setLoading(false);
      }
    };

    setupDatabase();
  }, []);

  const refreshData = async (database: SQLite.SQLiteDatabase | null = db) => {
    if (!database) {
      console.error('Baza danych nie jest dostępna');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiCoins = await getTopCoinsWithDetails(20);
      for (const coin of apiCoins) {
        await insertCoin(database, coin);
      }
      const dbCoins = await getCoins(database);
      setCoins(dbCoins);
    } catch (err: any) {
      console.error('Błąd podczas odświeżania danych:', err);
      setError(err.message || 'Nie udało się pobrać najnowszych danych');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CryptoDataContext.Provider value={{ coins, loading, error, refreshData }}>
      {children}
    </CryptoDataContext.Provider>
  );
};
