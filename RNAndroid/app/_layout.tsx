import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ModalsProvider } from '@/contexts/ModalsContext';
import { CustomErrorBoundary } from '@/components/common/ErrorBoundary';
import { AppStateProvider } from '@/contexts/AppStateContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AppProvider } from '@/contexts/AppContext';
import { CryptoProvider } from '@/contexts/CryptoContext';
import { ToastProvider } from '@/components/common/Toast';

export default function RootLayout() {
  return (
    <AppStateProvider>
      <LanguageProvider>
        <AppProvider>
          <ThemeProvider>
            <ModalsProvider>
              <CryptoProvider>
                <ToastProvider>
                  <CustomErrorBoundary>
                    <Stack screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="(welcome)" />
                      <Stack.Screen name="(tabs)" />
                    </Stack>
                  </CustomErrorBoundary>
                </ToastProvider>
              </CryptoProvider>
            </ModalsProvider>
          </ThemeProvider>
        </AppProvider>
      </LanguageProvider>
    </AppStateProvider>
  );
}
