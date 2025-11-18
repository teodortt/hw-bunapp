import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { saveTokenToGoogleSheet } from "@/lib/saveTokenToSheet";
import { Platform } from "react-native";

import { MMKV } from "react-native-mmkv";
import { getDeviceId } from "./getDeviceId";

const storage = new MMKV();

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }

    try {
      const projectId = Constants.expoConfig?.extra?.eas?.projectId;
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({ projectId })
      ).data;

      const deviceId = await getDeviceId();

      const sentToken = storage.getString("pushTokenSent");
      if (sentToken === pushTokenString) {
        console.log("✅ Token already sent, skipping");
        return pushTokenString;
      }

      await saveTokenToGoogleSheet(pushTokenString, {
        platform: Platform.OS,
        deviceId: deviceId,
        model: Device.modelName || "unknown",
        osVersion: Device.osVersion || "unknown",
      }).then(() => {
        storage.set("pushTokenSent", pushTokenString);
      });

      return pushTokenString;
    } catch (e: unknown) {
      console.error("❌ Error details:", e);
      if (e instanceof Error) {
        console.error("Error message:", e.message);
      }
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}
