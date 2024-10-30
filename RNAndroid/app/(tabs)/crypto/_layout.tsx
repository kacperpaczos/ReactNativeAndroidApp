import { Stack } from 'expo-router';

export default function CryptoLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Kryptowaluty',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Szczegóły kryptowaluty',
          presentation: 'push',
          headerBackTitle: 'Wstecz'
        }}
      />
    </Stack>
  );
}