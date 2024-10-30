import { useState, useEffect } from 'react';
import { CryptoAsset } from '@/types/crypto';
import { CryptoDao } from '@/dao/CryptoDao';

export const useCryptoDetails = (id: string) => {
  const [asset, setAsset] = useState<CryptoAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const cryptoDao = CryptoDao.getInstance();
        const details = await cryptoDao.getCoinById(id);
        if (details) {
          setAsset(details);
        } else {
          setError('Nie znaleziono szczegółów kryptowaluty');
        }
      } catch (err) {
        setError('Wystąpił błąd podczas ładowania szczegółów');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  return { asset, loading, error };
};