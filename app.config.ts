import type { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "HappyWorld",
  slug: "expostarter",
  newArchEnabled: true,
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/AppIcons/square.png",
  scheme: "ltstarter",
  userInterfaceStyle: "dark",
  runtimeVersion: {
    policy: "appVersion",
  },
  splash: {
    image: "./assets/AppIcons/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.expostarter.base",
    icon: "./assets/AppIcons/appstore.png",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/AppIcons/square.png",
      backgroundColor: "#ffffff",
    },
    package: "com.expostarter.base",
  },
  web: {
    bundler: "metro",
    output: "single",
    favicon: "./assets/AppIcons/favicon.png",
  },
  plugins: [["expo-router"], ["expo-sqlite"]],
  experiments: {
    typedRoutes: true,
    baseUrl: "/expo-local-first-template",
  },
  extra: {
    eas: {
      projectId: "",
    },
  },
  owner: "*",
});
