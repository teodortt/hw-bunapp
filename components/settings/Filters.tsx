import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
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
import { allKeysEmpty, cn, splitIntoRows } from "@/lib/utils";
import { getFullStateName } from "@/lib/getStatename";
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

  const params = useLocalSearchParams();

  const offersRows = splitIntoRows(offers.map((offer) => offer.position));
  const statesRows = splitIntoRows(offers.map((offer) => offer.state));

  const handleChangeParams = (key: string, item: string) => {
    const currentParam = params[key];
    const currentValues: string[] = Array.isArray(currentParam)
      ? currentParam
      : currentParam
      ? [currentParam]
      : [];

    let updatedValues: string[];

    if (currentValues.includes(item)) {
      // Remove the item
      updatedValues = currentValues.filter((value) => value !== item);
    } else {
      // Add the item
      updatedValues = [...currentValues, item];
    }

    // Set params only if there are values, else remove the param
    router.setParams({
      ...(updatedValues.length > 0
        ? { [key]: updatedValues }
        : { [key]: undefined }),
    });
  };

  return (
    <BottomSheet>
      <BottomSheetOpenTrigger asChild>
        <TouchableOpacity>
          <Filter
            color={
              allKeysEmpty(params, ["searchQuery", "tempSearchQuery"])
                ? "#CDCDE0"
                : "#ff9f36"
            }
            size={17}
          />
        </TouchableOpacity>
      </BottomSheetOpenTrigger>
      <BottomSheetContent backgroundStyle={{ backgroundColor: "#161622" }}>
        <BottomSheetHeader className="bg-primary">
          <Text className="text-foreground text-xl font-bold  pb-1">
            Филтри
          </Text>
        </BottomSheetHeader>
        <BottomSheetView className="gap-5 pt-6 bg-primary h-[450px]">
          <View className="flex gap-2 items-start justify-start px-2">
            <View className="w-full border-b-2 border-b-slate-800 pb-2">
              <Text>Работна позиция</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator
              indicatorStyle="white"
              contentContainerStyle={{
                paddingRight: 100,
              }}
            >
              <View className="flex-col">
                {offersRows.map((rowData, rowIndex) => (
                  <View key={rowIndex} className="flex-row my-1">
                    {rowData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleChangeParams("position", item)}
                        className={cn(
                          " bg-white/20 p-2 rounded-md mr-2",
                          params["position"]?.includes(item) && "bg-white/50"
                        )}
                      >
                        <Text className="text-s text-white capitalize w-full h-fit">
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          <View className="flex gap-2 items-start justify-start">
            <View className="w-full border-b-2 border-b-slate-800 pb-2">
              <Text>Щат</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator
              indicatorStyle="white"
              contentContainerStyle={{
                paddingRight: 100,
              }}
            >
              <View className="flex-col">
                {statesRows.map((rowData, rowIndex) => (
                  <View key={rowIndex} className="flex-row my-1">
                    {rowData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleChangeParams("position", item);
                        }}
                        className={cn(
                          " bg-white/20 p-2 rounded-md mr-2 ",
                          params["position"]?.includes(item) && "bg-white/50"
                        )}
                      >
                        <Text className="text-s text-white text-center uppercase w-full h-fit">
                          {getFullStateName(item)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
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
