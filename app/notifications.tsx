import React from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
  Linking,
  Alert,
  AppState,
} from "react-native";
import * as Notifications from "expo-notifications";
import { MMKV } from "react-native-mmkv";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { registerForPushNotificationsAsync } from "@/lib/registerForPushNotifications";

const storage = new MMKV();

function NotificationSettings() {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const animatedValue = useSharedValue(0);
  const appState = React.useRef(AppState.currentState);

  React.useEffect(() => {
    checkPermissionStatus();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        checkPermissionStatus();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  React.useEffect(() => {
    animatedValue.value = withTiming(isEnabled ? 1 : 0, { duration: 300 });
  }, [isEnabled]);

  const checkPermissionStatus = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    const hasPermission = status === "granted";
    setIsEnabled(hasPermission);
    storage.set("notifications", hasPermission);

    if (!hasPermission) {
      storage.delete("hasAskedNotificationPermission");
    }
  };

  const toggle = async () => {
    const newValue = !isEnabled;

    if (newValue) {
      const { status, canAskAgain } = await Notifications.getPermissionsAsync();

      if (status === "granted") {
        setIsEnabled(true);
        return;
      }

      if (!canAskAgain) {
        Alert.alert(
          "Включване на известия",
          "Моля, включете известията в настройките на устройството си",
          [
            { text: "Отказ", style: "cancel" },
            {
              text: "Отвори настройки",
              onPress: () => {
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Linking.openSettings();
                }
              },
            },
          ]
        );
        return;
      }

      registerForPushNotificationsAsync().then((token) => {
        if (token) {
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      });
    } else {
      Alert.alert(
        "Изключване на известия",
        "Моля, изключете известията в настройките на устройството си",
        [
          { text: "Отказ", style: "cancel" },
          {
            text: "Отвори настройки",
            onPress: () => {
              if (Platform.OS === "ios") {
                Linking.openURL("app-settings:");
              } else {
                Linking.openSettings();
              }
            },
          },
        ]
      );
    }
  };

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

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animatedValue.value * 24 }],
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
