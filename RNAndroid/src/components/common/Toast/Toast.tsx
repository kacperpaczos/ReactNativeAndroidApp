import React, { useEffect } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface ToastProps {
  message: string;
  duration?: number;
  onHide: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  duration = 3000, 
  onHide 
}) => {
  const { colors } = useTheme();
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  }, []);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { backgroundColor: colors.surface, opacity }
      ]}
    >
      <Text style={[styles.message, { color: colors.text.primary }]}>
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
  },
});