import { useContext } from 'react';
import { useAppContext } from '@contexts/AppContext';

export const useAppState = () => {
  const context = useContext(useAppContext);
  if (!context) {
    throw new Error('useAppState musi być używany wewnątrz AppProvider');
  }
  return context;
};
