// src/components/common/HeaderInfoButton.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useModals } from '@/contexts/ModalsContext';
import { useTheme } from '@/hooks/useTheme';

export const HeaderInfoButton = () => {
  console.log('=== Renderowanie HeaderInfoButton ===');
  const { colors } = useTheme();
  const { showAppInfoModal } = useModals();

  const handlePress = () => {
    console.log('HeaderInfoButton - kliknięcie przycisku');
    if (showAppInfoModal) {
      console.log('HeaderInfoButton - wywołanie showAppInfoModal');
      showAppInfoModal();
    } else {
      console.log('HeaderInfoButton - showAppInfoModal nie jest dostępne');
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ marginRight: 16 }}
      accessibilityLabel="Informacje o aplikacji"
      accessibilityRole="button"
    >
      <MaterialIcons 
        name="info-outline" 
        size={24} 
        color={colors?.text?.primary || '#000'} 
      />
    </TouchableOpacity>
  );
};