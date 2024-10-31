import React from 'react';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useModals } from '@/contexts/ModalsContext';

interface HeaderRightProps {
  onPress: () => void;
  color?: string;
}

const HeaderRight: React.FC<HeaderRightProps> = ({ onPress, color }) => (
  <TouchableOpacity onPress={onPress} style={{ marginRight: 16 }}>
    <MaterialIcons name="info-outline" size={24} color={color} />
  </TouchableOpacity>
);

export default function CryptoLayout() {
  const { colors } = useTheme();
  const { showCryptoInfoModal } = useModals();

  const screenOptions = {
    headerShown: true,
    headerBackTitle: 'Wstecz'
  };

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Kryptowaluty',
          headerRight: () => (
            <HeaderRight 
              onPress={showCryptoInfoModal}
              color={colors?.text.primary}
            />
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Szczegóły kryptowaluty',
          presentation: 'card'
        }}
      />
    </Stack>
  );
}