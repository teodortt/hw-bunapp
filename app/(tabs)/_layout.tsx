import { Button, Text } from "@/components/ui";
import { List } from "@/lib/icons/List";
import { BookOpen } from "@/lib/icons/Book";
import { Settings } from "@/lib/icons/Settings";

import { Tabs } from "expo-router";
import { Store } from "lucide-react-native";
import { Pressable } from "react-native";
export const unstable_settings = {
  initialRouteName: "index",
};

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="offers"
        options={{
          title: "Offers",
          tabBarIcon: ({ color }) => <BookOpen className="text-foreground" />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Habits",
          tabBarIcon: ({ color }) => <List className="text-foreground" />,
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
