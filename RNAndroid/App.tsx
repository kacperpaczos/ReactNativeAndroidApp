// App.tsx
import React from 'react';
import { CustomErrorBoundary } from '@components/common/ErrorBoundary';
import RootLayout from 'app/_layout';

export default function App() {
  return (
    <CustomErrorBoundary>
      <RootLayout />
    </CustomErrorBoundary>
  );
}
