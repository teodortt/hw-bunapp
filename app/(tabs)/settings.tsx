import * as React from "react";
import { Linking, Platform } from "react-native";
import List, { ListHeader } from "@/components/ui/list";
import ListItem from "@/components/ui/list-item";
import { Muted } from "@/components/ui/typography";
import { ScrollView } from "react-native-gesture-handler";
import { BookOpen, Shield, Star } from "@/lib/icons";
import * as WebBrowser from "expo-web-browser";

import { BadgeDollarSign, FileQuestion, PenBox } from "lucide-react-native";
import { router } from "expo-router";

export default function Settings() {
  const openExternalURL = (url: string) => {
    if (Platform.OS === "web") {
      Linking.openURL(url);
    } else {
      WebBrowser.openBrowserAsync(url);
    }
  };

  const openStoreReview = () => {
    const appStoreId = "1234567890"; // iOS App Store ID
    const packageName = "com.yourapp.package"; // Android package name

    if (Platform.OS === "ios") {
      Linking.openURL(
        `itms-apps://itunes.apple.com/app/id${appStoreId}?action=write-review`
      );
    } else {
      Linking.openURL(`market://details?id=${packageName}`).catch(() => {
        Linking.openURL(
          `https://play.google.com/store/apps/details?id=${packageName}`
        );
      });
    }
  };

  return (
    <ScrollView className="flex-1 w-full px-6 bg-primary pt-4 gap-y-6">
      <List>
        <ListHeader>
          <Muted>Work & Travel</Muted>
        </ListHeader>

        <ListItem
          itemLeft={(props) => <PenBox color="white" />}
          label="Записване и документи"
          className="rounded-t-lg"
          onPress={() => router.push("/steps")}
        />
        <ListItem
          itemLeft={(props) => <BadgeDollarSign color="white" />}
          label="Цена на услугата"
          className="rounded-t-lg"
          onPress={() => router.push("/cost")}
        />
        <ListItem
          itemLeft={(props) => <FileQuestion color="white" />}
          label="Често задавани въпроси"
          className="rounded-t-lg"
          onPress={() => router.push("/faq")}
        />
        {/* <ThemeSettingItem /> */}
        {/* {Platform.OS !== "web" && <NotificationItem />} */}
        <ListHeader className="pt-8">
          <Muted>Общи</Muted>
        </ListHeader>
        {/* <ListItem
          itemLeft={(props) => <Star {...props} />} // props adds size and color attributes
          label="Оценете приложението"
          className="rounded-t-lg"
          onPress={() => openStoreReview()}
        /> */}
        <ListItem
          itemLeft={(props) => <FileQuestion color="white" />}
          label="Нотификации"
          className="rounded-t-lg"
          onPress={() => router.push("/notifications")}
        />
        <ListItem
          itemLeft={(props) => <BookOpen {...props} />}
          label="Общи условия"
          onPress={() => router.push("/policy")}
          // onPress={() => openExternalURL("https://www.happyworld.bg/terms/")}
        />
        {/* <ListItem
          itemLeft={(props) => <Shield {...props} />}
          label="Декларация за поверителност"
          onPress={() => openExternalURL("https://expostarter.com")}
        /> */}
      </List>
    </ScrollView>
  );
}
