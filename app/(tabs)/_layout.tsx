import { List } from "@/lib/icons/List";
import { Tabs } from "expo-router";
import { Header } from "@/components/examples/components/header";
import { UserCog2 } from "lucide-react-native";
export const unstable_settings = {
  initialRouteName: "index",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        animation: "shift",
        tabBarStyle: {
          height: 60,
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
          title: "Профил",
          header: () => <Header />,
          tabBarIcon: ({ color, focused }) => (
            <UserCog2 color={focused ? "#FFA001" : "white"} />
          ),
        }}
      />
    </Tabs>
  );
}
