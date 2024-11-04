// App.tsx
import React from 'react';
import { CustomErrorBoundary } from '@/components/common/ErrorBoundary';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/components/common/Toast';
import { ModalsProvider } from '@/contexts/ModalsContext';
import { Slot } from 'expo-router';
import { CryptoProvider } from '@/contexts/CryptoContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AppStateProvider } from '@/contexts/AppStateContext';
import { AppProvider } from '@/contexts/AppContext';
//import { RootLayoutNav } from '@/components/common/RootLayoutNav';

export default function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <AppStateProvider>
          <LanguageProvider>
            <ModalsProvider>
              <CryptoProvider>
                <ToastProvider>
                  {/* <RootLayoutNav /> */}
                  <Slot />
                </ToastProvider>
              </CryptoProvider>
            </ModalsProvider>
          </LanguageProvider>
        </AppStateProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
