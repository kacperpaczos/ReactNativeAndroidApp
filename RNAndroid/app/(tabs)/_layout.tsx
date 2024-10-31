import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { HeaderInfoButton } from '@/components/common/HeaderInfoButton';
import { AppInfoModal } from '@/components/modals/AppInfoModal';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: colors?.primary,
          headerRight: () => <HeaderInfoButton />
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
    </>
  );
}
