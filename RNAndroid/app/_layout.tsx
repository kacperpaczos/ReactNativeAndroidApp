import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ModalsProvider } from '@/contexts/ModalsContext';
import { CustomErrorBoundary } from '@/components/common/ErrorBoundary';

export default function RootLayout() {
  return (
    <CustomErrorBoundary>
      <ThemeProvider>
        <ModalsProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(welcome)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </ModalsProvider>
      </ThemeProvider>
    </CustomErrorBoundary>
  );
}
