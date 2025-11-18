import "./global.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { type Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalHost } from "@/components/primitives/portal";
import { DatabaseProvider } from "@/db/provider";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";
import { getItem, setItem } from "@/lib/storage";
import { Platform } from "react-native";
import { SheetProvider } from "react-native-actions-sheet";
import "../components/sheets/sheets";
import { Header } from "@/components/shared/components/header";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/lib/registerForPushNotifications";

const NAV_FONT_FAMILY = "Inter";
const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts: {
    regular: {
      fontFamily: NAV_FONT_FAMILY,
      fontWeight: "400",
    },
    medium: {
      fontFamily: NAV_FONT_FAMILY,
      fontWeight: "500",
    },
    bold: {
      fontFamily: NAV_FONT_FAMILY,
      fontWeight: "700",
    },
    heavy: {
      fontFamily: NAV_FONT_FAMILY,
      fontWeight: "800",
    },
  },
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  fonts: {
    regular: {
      fontFamily: NAV_FONT_FAMILY,
      fontWeight: "400",
    },
    medium: {
      fontFamily: NAV_FONT_FAMILY,
      fontWeight: "500",
    },
    bold: {
      fontFamily: NAV_FONT_FAMILY,
      fontWeight: "700",
    },
    heavy: {
      fontFamily: NAV_FONT_FAMILY,
      fontWeight: "800",
    },
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log({ token });
      })
      .catch((error: any) => console.log(error));

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  React.useEffect(() => {
    (async () => {
      const theme = getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        setAndroidNavigationBar(colorScheme);
        setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      setAndroidNavigationBar(colorTheme);
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <>
      <DatabaseProvider>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <SheetProvider>
                <Stack screenOptions={{ animation: "ios_from_right" }}>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="offers/[id]"
                    options={{
                      headerShadowVisible: false,
                      headerBackTitle: "Назад",
                      header: () => <Header backButton />,
                    }}
                  />

                  <Stack.Screen
                    name="steps"
                    options={{
                      headerShadowVisible: false,
                      headerBackTitle: "Назад",
                      header: () => <Header backButton />,
                    }}
                  />

                  <Stack.Screen
                    name="cost"
                    options={{
                      headerShadowVisible: false,
                      headerBackTitle: "Назад",
                      header: () => <Header backButton />,
                    }}
                  />

                  <Stack.Screen
                    name="faq"
                    options={{
                      headerShadowVisible: false,
                      headerBackTitle: "Назад",
                      header: () => <Header backButton />,
                    }}
                  />

                  <Stack.Screen
                    name="policy"
                    options={{
                      headerShadowVisible: false,
                      headerBackTitle: "Назад",
                      header: () => <Header backButton />,
                    }}
                  />
                  <Stack.Screen
                    name="notifications"
                    options={{
                      headerShadowVisible: false,
                      headerBackTitle: "Назад",
                      header: () => <Header backButton />,
                    }}
                  />
                </Stack>
              </SheetProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </DatabaseProvider>
      <PortalHost />
    </>
  );
}
