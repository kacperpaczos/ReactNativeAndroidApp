import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useModals } from '@/contexts/ModalsContext';

export const InfoButton = () => {
  const { colors } = useTheme();
  const { showAppInfoModal } = useModals();

  return (
    <TouchableOpacity
      onPress={showAppInfoModal}
      style={styles.button}
      accessibilityLabel="Informacje o aplikacji"
      accessibilityRole="button"
      accessibilityHint="Otwiera okno z informacjami o aplikacji"
    >
      <MaterialIcons 
        name="info-outline" 
        size={24} 
        color={colors?.text?.secondary || '#665'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
  }
});