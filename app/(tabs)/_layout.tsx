import { List } from "@/lib/icons/List";
import { Settings } from "@/lib/icons/Settings";
import { Tabs } from "expo-router";
import { Header } from "@/components/examples/components/header";
export const unstable_settings = {
  initialRouteName: "index",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Оферти",
          tabBarIcon: ({ focused }) => (
            <List className={focused ? "text-[#FFA001]" : `text-foreground`} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Настройки",
          header: () => <Header />,
          tabBarIcon: ({ color, focused }) => (
            <Settings
              className={focused ? "text-[#FFA001]" : "text-foreground"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
