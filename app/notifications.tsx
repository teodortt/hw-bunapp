import React from "react";
import { View, Text, Switch } from "react-native";
import * as Notifications from "expo-notifications";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

function NotificationSettings() {
  const [isEnabled, setIsEnabled] = React.useState(
    storage.getBoolean("notifications") ?? false
  );

  const toggle = async (value: boolean) => {
    setIsEnabled(value);

    if (value) {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== "granted") {
        setIsEnabled(false);
        storage.set("notifications", false);
        return;
      }

      storage.set("notifications", true);
    } else {
      storage.set("notifications", false);
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <View className="flex-row justify-between items-center p-5">
        <Text className="text-base font-medium text-gray-900 dark:text-white">
          Push Notifications
        </Text>
        <Switch
          value={isEnabled}
          onValueChange={toggle}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#007AFF" : "#f4f3f4"}
        />
      </View>
    </View>
  );
}

export default NotificationSettings;
