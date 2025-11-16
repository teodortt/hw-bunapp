import type { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "HappyWorld",
  slug: "HappyWorld",
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
    bundleIdentifier: "com.happyworld.base",
    icon: "./assets/AppIcons/appstore.png",
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/AppIcons/square.png",
      backgroundColor: "#ffffff",
    },
    package: "com.happyworld.base",
    versionCode: 41,
  },
  web: {
    bundler: "metro",
    output: "single",
    favicon: "./assets/AppIcons/favicon.png",
  },
  plugins: [
    ["expo-router"],
    ["expo-sqlite"],
    "expo-notifications",
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 36,
          targetSdkVersion: 36,
          buildToolsVersion: "36.0.0",
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    baseUrl: "/expo-local-first-template",
  },
  extra: {
    eas: {
      projectId: "26e20f8d-693e-4a93-bf3d-f1b5d8b1c10c",
    },
  },
  owner: "enzzure",
});
