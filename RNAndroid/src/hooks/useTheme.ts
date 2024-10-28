import { useColorScheme } from 'react-native';
import { Colors } from '@constants/Colors';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
  };
  error: string;
  success: string;
  tint: string;
  placeholder: string;
}

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors: ThemeColors = {
    primary: isDark ? Colors.dark.primary : Colors.primary,
    secondary: isDark ? Colors.dark.secondary : Colors.secondary,
    background: isDark ? Colors.dark.background : Colors.background.default,
    surface: isDark ? Colors.dark.surface : Colors.surface,
    text: {
      primary: isDark ? Colors.dark.text.primary : Colors.text.primary,
      secondary: isDark ? Colors.dark.text.secondary : Colors.text.secondary,
      disabled: isDark ? Colors.dark.text.disabled : Colors.text.disabled,
      hint: isDark ? Colors.dark.text.hint : Colors.text.hint,
    },
    error: Colors.error,
    success: Colors.success,
    tint: isDark ? Colors.dark.primary : Colors.primary,
    placeholder: isDark ? '#2A2A2A' : '#E1E9EE',
  };

  return {
    isDark,
    colors,
    colorScheme,
  };
};
