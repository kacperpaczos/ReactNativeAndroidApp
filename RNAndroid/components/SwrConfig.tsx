import React from 'react';
import { SWRConfig } from 'swr';
import { fetcher } from '@/services/api';

export const SwrConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SWRConfig 
      value={{
        fetcher,
        onError: (error) => {
          console.error('Błąd SWR:', error);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};