import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { HeaderInfoButton } from '@/components/common/HeaderInfoButton';
import { AppInfoModal } from '@/components/modals/AppInfoModal';
import { ThemeAwareLayout } from '@/components/layouts/ThemeAwareLayout';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { colors } = useTheme();

  if (!colors?.background?.default || !colors?.text?.primary) {
    return null;
  }

  return (
    <ThemeAwareLayout>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text.secondary,
          tabBarStyle: {
            backgroundColor: colors.background.default,
            borderTopColor: colors.border,
          },
          headerStyle: {
            backgroundColor: colors.background.default,
          },
          headerTintColor: colors.text.primary,
          headerRight: () => <HeaderInfoButton />,
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Kryptowaluty',
            tabBarIcon: ({ color }) => <TabBarIcon name="bitcoin" color={color} />,
          }}
        />
        <Tabs.Screen
          name="news"
          options={{
            title: 'Wiadomości',
            tabBarIcon: ({ color }) => <TabBarIcon name="newspaper-o" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            title: 'Ustawienia',
            tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
          }}
        />
      </Tabs>
      <AppInfoModal />
    </ThemeAwareLayout>
  );
}
