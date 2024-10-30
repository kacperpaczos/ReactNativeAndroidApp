import { useColorScheme } from 'react-native';
import { useAppContext } from '@/contexts/AppContext';
import { lightColors, darkColors } from '@/theme/colors';
import { ThemeColors } from '@/types/theme';

export const useTheme = () => {
  const { userPreferences } = useAppContext();
  const systemColorScheme = useColorScheme();
  
  const themeMode = userPreferences.theme === 'system' 
    ? systemColorScheme 
    : userPreferences.theme;
    
  const isDark = themeMode === 'dark';
  const colors: ThemeColors = isDark ? darkColors : lightColors;

  return { colors, isDark };
};
