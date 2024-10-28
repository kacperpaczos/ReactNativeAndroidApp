import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface PlaceholderProps {
  width?: number | string;
  height?: number;
  style?: any;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ 
  width = '100%', 
  height = 20, 
  style 
}) => {
  const { colors } = useTheme();
  const animatedValue = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.placeholder,
        {
          width,
          height,
          backgroundColor: colors.surface,
          opacity: animatedValue,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  placeholder: {
    borderRadius: 4,
  },
});