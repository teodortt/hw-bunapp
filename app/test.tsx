import React from "react";
import { Button, View, Text } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

function TestNotifications() {
  const [status, setStatus] = React.useState("Not tested");

  const testNotifications = async () => {
    try {
      setStatus("Testing...");

      // Test 1: Check device
      if (!Device.isDevice) {
        setStatus("❌ Not a physical device");
        return;
      }
      //   setStatus("✅ Physical device");

      // Test 2: Check permissions
      const { status: permStatus } = await Notifications.getPermissionsAsync();
      setStatus(`Permission: ${permStatus}`);

      if (permStatus !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        setStatus(`New permission: ${newStatus}`);
      }

      // Test 3: Get FCM token
      setStatus("Getting FCM token...");
      const deviceToken = await Notifications.getDevicePushTokenAsync();
      setStatus(`✅ FCM: ${deviceToken.data.substring(0, 20)}...`);

      // Test 4: Get Expo token
      setStatus("Getting Expo token...");
      const expoToken = await Notifications.getExpoPushTokenAsync({
        projectId: "26e20f8d-693e-4a93-bf3d-f1b5d8b1c10c",
      });
      setStatus(`✅ Expo: ${expoToken.data}`);
    } catch (e) {
      setStatus(`❌ Error: ${e}`);
      console.error("Full error:", e);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Test Push Notifications" onPress={testNotifications} />
      <Text style={{ marginTop: 10, color: "red" }}>{status}</Text>
    </View>
  );
}

export default TestNotifications;
