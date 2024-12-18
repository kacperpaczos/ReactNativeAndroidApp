import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';

interface NewsListPlaceholderProps {
  onRetry?: () => void;
}

export const NewsListPlaceholder: React.FC<NewsListPlaceholderProps> = ({ onRetry }) => {
  const { colors } = useTheme();
  const { translations } = useLanguage();
  
  return (
    <View style={styles.container}>
      <Text style={[styles.message, { color: colors.text }]}>
        {translations.news.loadError}
      </Text>
      {onRetry && (
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={onRetry}
        >
          <Text style={styles.buttonText}>
            {translations.common.refresh}
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
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});