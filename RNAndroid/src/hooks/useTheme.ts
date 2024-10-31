import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from '@/theme/colors';
import { useAppState } from '@/hooks/useAppState';

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const { userPreferences } = useAppState();
  
  const getThemeColors = () => {
    switch (userPreferences.darkMode) {
      case 'light':
        return lightColors;
      case 'dark':
        return darkColors;
      case 'system':
      default:
        return systemColorScheme === 'dark' ? darkColors : lightColors;
    }
  };

  return { colors: getThemeColors() };
};
