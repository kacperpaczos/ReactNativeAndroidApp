import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ModalsProvider } from '@/contexts/ModalsContext';
import { CustomErrorBoundary } from '@/components/common/ErrorBoundary';
import { AppStateProvider, useAppState } from '@/contexts/AppStateContext';

export default function RootLayout() {
  return (
    <AppStateProvider>
      <ThemeProviderWrapper>
        <CustomErrorBoundary>
          <ModalsProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(welcome)" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </ModalsProvider>
        </CustomErrorBoundary>
      </ThemeProviderWrapper>
    </AppStateProvider>
  );
}

const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userPreferences } = useAppState();
  return <ThemeProvider key={userPreferences.darkMode}>{children}</ThemeProvider>;
};
