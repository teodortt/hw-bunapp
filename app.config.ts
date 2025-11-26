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
  // runtimeVersion: {
  //   policy: "appVersion",
  // },
  runtimeVersion: "1.0.1",
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
    googleServicesFile: "./google-services.json",
  },
  web: {
    bundler: "metro",
    output: "single",
    favicon: "./assets/AppIcons/favicon.png",
  },
  plugins: [
    ["expo-web-browser"],
    ["expo-router"],
    ["expo-sqlite"],
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          buildToolsVersion: "35.0.0",
        },
      },
    ],
    "expo-notifications",
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
