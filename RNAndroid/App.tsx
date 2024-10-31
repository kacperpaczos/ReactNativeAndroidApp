// App.tsx
import React from 'react';
import { CustomErrorBoundary } from '@/components/common/ErrorBoundary';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/components/common/Toast';
import { ModalsProvider } from '@/contexts/ModalsContext';
import { Slot } from 'expo-router';

export default function App() {
  return (
    <CustomErrorBoundary>
      <ThemeProvider>
        <ModalsProvider>
          <NavigationContainer>
            <ToastProvider>
              <Slot />
            </ToastProvider>
          </NavigationContainer>
        </ModalsProvider>
      </ThemeProvider>
    </CustomErrorBoundary>
  );
}
