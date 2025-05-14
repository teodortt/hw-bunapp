import { Button, Text } from "@/components/ui";
import { List } from "@/lib/icons/List";
import { BookOpen } from "@/lib/icons/Book";
import { Settings } from "@/lib/icons/Settings";

import { Tabs } from "expo-router";
import { Store } from "lucide-react-native";
import { Pressable, View, Image, ImageSourcePropType } from "react-native";
export const unstable_settings = {
  initialRouteName: "index",
};

import { images } from "../../components/examples/constants";

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
        name="offers"
        options={{
          title: "Offers",
          tabBarIcon: ({ focused }) => (
            <List className={focused ? "text-[#FFA001]" : `text-foreground`} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Habits",
          tabBarIcon: ({ color }) => <BookOpen className="text-foreground" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings className="text-foreground" />,
        }}
      />
    </Tabs>
  );
}
