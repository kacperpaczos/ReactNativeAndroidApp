import { Text as DefaultText, View as DefaultView } from 'react-native';
import { useTheme } from '@hooks/useTheme';

export function Text(props: DefaultText['props']) {
  const { colors } = useTheme();
  const { style, ...otherProps } = props;

  return (
    <DefaultText
      style={[{ color: colors.text }, style]}
      {...otherProps}
    />
  );
}

export function View(props: DefaultView['props']) {
  const { colors } = useTheme();
  const { style, ...otherProps } = props;

  return (
    <DefaultView
      style={[{ backgroundColor: colors.background }, style]}
      {...otherProps}
    />
  );
}