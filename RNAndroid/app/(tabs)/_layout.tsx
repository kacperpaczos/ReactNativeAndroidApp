import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppContext } from '@/contexts/AppContext';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { colors } = useTheme();
  const { isLoading } = useAppContext();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: true,
        tabBarStyle: { backgroundColor: colors.background.default },
        headerStyle: { backgroundColor: colors.background.default },
        headerTintColor: colors.text.primary,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Kryptowaluty',
          tabBarIcon: ({ color }) => <TabBarIcon name="line-chart" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={colors.text.primary}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'Wiadomości',
          tabBarIcon: ({ color }) => <TabBarIcon name="newspaper-o" color={color} />,
        }}
      />
    </Tabs>
  );
}
