import React from 'react';
import { useTheme } from '@/hooks/useTheme';

interface ThemeAwareLayoutProps {
  children: React.ReactNode;
}

export const ThemeAwareLayout: React.FC<ThemeAwareLayoutProps> = ({ children }) => {
  const { themeVersion } = useTheme();
  
  return (
    <React.Fragment key={themeVersion}>
      {children}
    </React.Fragment>
  );
};