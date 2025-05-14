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
import { Option } from "../primitives/select";
import { Offer } from "../examples/useApi";
import { router, useLocalSearchParams } from "expo-router";
type ItemData = {
  title: string;
  subtitle: string;
  value: "light" | "dark" | "system";
  icon: JSX.Element;
};

export const Filters = ({ offers }: { offers: Offer[] }) => {
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
            <View
              key={theme.title}
              className="flex-row gap-2 justify-between px-4"
            >
              <SelectFilter
                placeholder="Локация"
                options={offers.map((offer) => ({
                  label: offer.state,
                  value: offer.state,
                }))}
              />
              <SelectFilter
                placeholder="Работна позиция"
                options={offers.map((offer) => ({
                  label: offer.position,
                  value: offer.position,
                }))}
              />
            </View>
          ))}
        </BottomSheetView>
      </BottomSheetContent>
    </BottomSheet>
  );
};

const SelectFilter = ({
  placeholder,
  options,
}: {
  placeholder: string;
  options: Option[];
}) => {
  const query = useLocalSearchParams()[placeholder];

  const queryValue = typeof query === "string" ? query : "";

  const value = useMemo(() => {
    const selectedOption = options.find(
      (option) => option?.value === queryValue
    );
    return selectedOption;
  }, [queryValue, options]);

  const handleSelect = (option: Option) => {
    if (!option) return;
    router.setParams({ placeholder: option.value });
  };

  return (
    <Select className="flex-row" value={value} onValueChange={handleSelect}>
      <SelectTrigger className="w-[150px]">
        <SelectValue
          className="text-foreground text-sm native:text-lg"
          placeholder={placeholder}
        />
      </SelectTrigger>
      <SelectContent className="w-[150px]">
        {options.map(
          (option, i) =>
            option && (
              <SelectItem
                key={`${option.value}-${i}`}
                value={option.value}
                label={option.label}
              >
                {option.label}
              </SelectItem>
            )
        )}
      </SelectContent>
    </Select>
  );
};
