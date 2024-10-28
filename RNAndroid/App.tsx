// App.tsx
import React from 'react';
import { AppProvider } from '@contexts/AppContext';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import { ToastProvider } from '@components/common/Toast';
import RootLayout from 'app/_layout';

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <ToastProvider>
          <RootLayout />
        </ToastProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}
