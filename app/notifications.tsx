import React from "react";
import { View, Text, Pressable } from "react-native";
import * as Notifications from "expo-notifications";
import { MMKV } from "react-native-mmkv";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

const storage = new MMKV();

function NotificationSettings() {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const animatedValue = useSharedValue(0);

  // Check actual device permission status on mount
  React.useEffect(() => {
    checkPermissionStatus();
  }, []);

  const checkPermissionStatus = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    const hasPermission = status === "granted";
    setIsEnabled(hasPermission);
    storage.set("notifications", hasPermission);
    animatedValue.value = hasPermission ? 1 : 0;
  };

  const toggle = async () => {
    const newValue = !isEnabled;

    if (newValue) {
      // Request permission - shows system dialog
      const { status } = await Notifications.requestPermissionsAsync();

      if (status === "granted") {
        setIsEnabled(true);
        storage.set("notifications", true);
        animatedValue.value = withTiming(1, { duration: 300 });
      } else {
        setIsEnabled(false);
        storage.set("notifications", false);
        animatedValue.value = withTiming(0, { duration: 300 });
      }
    } else {
      setIsEnabled(false);
      storage.set("notifications", false);
      animatedValue.value = withTiming(0, { duration: 300 });
    }
  };

  // Animated track (background)
  const trackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedValue.value,
      [0, 1],
      ["#5e7eb8", "#fb923c"]
    );

    return {
      backgroundColor,
    };
  });

  // Animated thumb (circle)
  const thumbStyle = useAnimatedStyle(() => {
    const translateX = animatedValue.value * 24;

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View className="flex-1 bg-primary">
      <View className="flex-row justify-between items-center p-5">
        <Text className="text-base font-medium text-gray-900 dark:text-white">
          Push Notifications
        </Text>

        <Pressable onPress={toggle}>
          <Animated.View
            style={[trackStyle]}
            className="w-14 h-8 rounded-full p-1 justify-center"
          >
            <Animated.View
              style={[thumbStyle]}
              className="w-6 h-6 bg-white rounded-full shadow-lg"
            />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

export default NotificationSettings;
