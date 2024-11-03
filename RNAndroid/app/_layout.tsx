import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ModalsProvider } from '@/contexts/ModalsContext';
import { CustomErrorBoundary } from '@/components/common/ErrorBoundary';
import { AppStateProvider } from '@/contexts/AppStateContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function RootLayout() {
  return (
    <AppStateProvider>
      <ThemeProvider>
        <LanguageProvider>
          <CustomErrorBoundary>
            <ModalsProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(welcome)" />
                <Stack.Screen name="(tabs)" />
              </Stack>
            </ModalsProvider>
          </CustomErrorBoundary>
        </LanguageProvider>
      </ThemeProvider>
    </AppStateProvider>
  );
}
