import * as React from "react";
import { Linking, Platform } from "react-native";
import List, { ListHeader } from "@/components/ui/list";
import ListItem from "@/components/ui/list-item";
import { Muted } from "@/components/ui/typography";
import { ScrollView } from "react-native-gesture-handler";
import { BookOpen, Shield, Star } from "@/lib/icons";
import * as WebBrowser from "expo-web-browser";

import { SheetManager } from "react-native-actions-sheet";
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
        <ListItem
          itemLeft={(props) => <Star {...props} />} // props adds size and color attributes
          label="Оценете приложението"
          className="rounded-t-lg"
          // onPress={() => openExternalURL("https://github.com/expo-starter/expo-template")}
          onPress={() => SheetManager.show("testSheet2")}
        />
        <ListItem
          itemLeft={(props) => <Shield {...props} />} // props adds size and color attributes
          label="Декларация за поверителност"
          onPress={() => openExternalURL("https://expostarter.com")}
        />
        <ListItem
          itemLeft={(props) => <BookOpen {...props} />} // props adds size and color attributes
          label="Общи условия"
          onPress={() => openExternalURL("https://expostarter.com")}
        />
      </List>
    </ScrollView>
  );
}
