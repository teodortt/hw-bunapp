import { Platform, View } from "react-native";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from "@/components/primitives/bottomSheet/bottom-sheet.native";
import { Text } from "@/components/ui//text";
import { useMemo } from "react";
import { Filter, Locate, Briefcase } from "lucide-react-native";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
type ItemData = {
  title: string;
  subtitle: string;
  value: "light" | "dark" | "system";
  icon: JSX.Element;
};

export const Filters = () => {
  const themes: ItemData[] = useMemo(
    () => [
      {
        title: "Работна позиция",
        subtitle: "Сортиране по работна позиция",
        value: "system",
        icon: <Briefcase color={"#FFA001"} />,
      },
      {
        title: "Локация",
        subtitle: "Сортиране по локация",
        value: "dark",
        icon: <Locate color={"#FFA001"} />,
      },
    ],
    []
  );

  return (
    <BottomSheet>
      <BottomSheetOpenTrigger asChild>
        <Filter color={"#CDCDE0"} size={17} />
      </BottomSheetOpenTrigger>
      <BottomSheetContent backgroundStyle={{ backgroundColor: "#161622" }}>
        <BottomSheetHeader className="bg-primary">
          <Text className="text-foreground text-xl font-bold  pb-1">
            Сортиране
          </Text>
        </BottomSheetHeader>
        <BottomSheetView className="gap-5 pt-6 bg-primary">
          {themes.map((theme) => (
            <View key={theme.title} className="flex-row gap-2">
              <Select className="flex-row">
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    className="text-foreground text-sm native:text-lg"
                    placeholder="Работна позиция"
                  />
                </SelectTrigger>
                <SelectContent className="w-[180px]">
                  <SelectGroup>
                    <SelectLabel>Работна позиция</SelectLabel>
                    <SelectItem label="Server" value="server">
                      Server
                    </SelectItem>
                    <SelectItem label="ServerA" value="serverA">
                      Server
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select className="flex-row">
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    className="text-foreground text-sm native:text-lg"
                    placeholder="Работна позиция"
                  />
                </SelectTrigger>
                <SelectContent className="w-[180px]">
                  <SelectGroup>
                    <SelectLabel>Работна позиция</SelectLabel>
                    <SelectItem label="Server" value="server">
                      Server
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </View>
          ))}
        </BottomSheetView>
      </BottomSheetContent>
    </BottomSheet>
  );
};
