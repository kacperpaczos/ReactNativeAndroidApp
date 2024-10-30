import { Text as DefaultText, View as DefaultView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { ThemeColors } from '@/types/theme';

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export function Text(props: DefaultText['props'] & ThemeProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const { colors } = useTheme();

  const color = darkColor || lightColor || colors.text.primary;

  return (
    <DefaultText
      style={[{ color }, style]}
      {...otherProps}
    />
  );
}

export function View(props: DefaultView['props'] & ThemeProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const { colors } = useTheme();

  const backgroundColor = darkColor || lightColor || colors.background.default;

  return (
    <DefaultView
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}