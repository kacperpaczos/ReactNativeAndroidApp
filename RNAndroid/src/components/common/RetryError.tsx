import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface RetryErrorProps {
  message: string;
  onRetry: () => void;
}

export const RetryError: React.FC<RetryErrorProps> = ({ message, onRetry }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <Text style={[styles.message, { color: colors.text.primary }]}>
        {message}
      </Text>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: colors.button.primary.background }]}
        onPress={onRetry}
      >
        <Text style={[styles.buttonText, { color: colors.button.primary.text }]}>
          Odśwież
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});