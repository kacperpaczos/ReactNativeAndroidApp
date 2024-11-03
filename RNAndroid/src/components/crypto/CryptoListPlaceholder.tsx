import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface CryptoListPlaceholderProps {
  onRetry?: () => void;
  message?: string;
}

export const CryptoListPlaceholder: React.FC<CryptoListPlaceholderProps> = ({ 
  onRetry,
  message = 'Nie udało się załadować danych kryptowalut'
}) => {
  const { colors } = useTheme();
  
  if (!colors?.background?.default || !colors?.text?.primary || !colors?.button?.primary) {
    return <LoadingSpinner />;
  }
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <Text style={[styles.message, { color: colors.text.primary }]}>
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.button.primary.background }]}
          onPress={onRetry}
        >
          <Text style={[styles.buttonText, { color: colors.button.primary.text }]}>
            Odśwież
          </Text>
        </TouchableOpacity>
      )}
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
    fontSize: 16,
    fontWeight: '500',
  },
});