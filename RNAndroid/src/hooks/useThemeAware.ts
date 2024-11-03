import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

export const useThemeAware = () => {
  const { colors, themeVersion } = useTheme();
  const [, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, [themeVersion]);

  return colors;
};