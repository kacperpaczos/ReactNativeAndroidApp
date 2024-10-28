// components/common/LoadingSpinner.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

interface LoadingSpinnerProps {
  color?: string;
  size?: 'small' | 'large';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  color = Colors.primary, 
  size = 'large' 
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
