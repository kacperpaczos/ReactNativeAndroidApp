import { useColorScheme } from 'react-native';
import { lightColors as lightTheme, darkColors as darkTheme } from '@/theme/colors';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkTheme : lightTheme;
  
  return { colors };
};
