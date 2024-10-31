import React from 'react';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';

const HeaderBack: React.FC<{ onPress: () => void; color?: string }> = ({ onPress, color }) => (
  <TouchableOpacity onPress={onPress} style={{ marginLeft: 16 }}>
    <MaterialIcons name="arrow-back" size={24} color={color} />
  </TouchableOpacity>
);

export default function CryptoLayout() {
  const { colors } = useTheme();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Wstecz',
        headerStyle: {
          backgroundColor: colors?.background.default,
        },
        headerTintColor: colors?.text.primary,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Szczegóły kryptowaluty',
          presentation: 'card',
          headerLeft: () => (
            <HeaderBack 
              onPress={handleBack}
              color={colors?.text.primary}
            />
          ),
        }}
      />
    </Stack>
  );
}