import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-reanimated';
import { UserDAO } from '@/database/WatermelonDB/dao/UserDAO';
import { Provider as PaperProvider, ActivityIndicator } from 'react-native-paper'; // Import Provider i ActivityIndicator z react-native-paper

import { useColorScheme } from '@/components/useColorScheme';

// Przenieś wszystkie eksporty na górę modułu
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const [isDatabaseEmpty, setDatabaseEmpty] = useState(true); // Dodaj stan dla pustej bazy danych

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      checkDatabase(); // Sprawdź bazę danych po załadowaniu czcionek
    }
  }, [loaded]);

  const checkDatabase = async () => {
    const users = await new UserDAO().getAllUsers();
    setDatabaseEmpty(users.length === 0);
  };

  if (!loaded || isDatabaseEmpty) {
    return (
      <PaperProvider>
        <ActivityIndicator animating={true} size="large" style={styles.centered} />
      </PaperProvider>
    ); // Pokaż spinner Material 3 kiedy aplikacja nie jest załadowana, umieszczony po środku ekranu
  }

  return (
    <PaperProvider>
      <RootLayoutNav />
    </PaperProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
