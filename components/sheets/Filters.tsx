import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui//text";
import { ArrowLeft, XIcon } from "lucide-react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { allKeysEmpty, cn, splitIntoRows } from "@/lib/utils";
import { getFullStateName } from "@/lib/getStatename";
import ActionSheet, {
  useSheetPayload,
  useSheetRef,
} from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Offer } from "../examples/ApiTypes";
import { useState } from "react";

type FilterKey = "position" | "state";

export const Filters = () => {
  const offers: Offer[] = useSheetPayload("payload");
  const insets = useSafeAreaInsets();
  const ref = useSheetRef();
  const params = useGlobalSearchParams();
  const searchQuery = params["searchQuery"];
  const [query, setQuery] = useState(searchQuery || "");
  const [filters, setFilters] = useState({
    position: params["position"] || "",
    state: params["state"] || "",
  });
  const offersRows = splitIntoRows(offers.map((offer) => offer.position));
  const statesRows = splitIntoRows(offers.map((offer) => offer.state));

  const handleChangeParams = (key: FilterKey, param: string) => {
    const item = param.trim().toLowerCase();
    const currentParam = filters[key];
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
    setFilters((prev) => ({
      ...prev,
      [key]: updatedValues.length > 0 ? updatedValues : "",
    }));
  };

  const handleClear = () => {
    setQuery("");
    router.setParams({ position: "", state: "", searchQuery: "" });
  };

  return (
    <ActionSheet
      isModal={true}
      safeAreaInsets={insets}
      snapPoints={[100]}
      gestureEnabled={true}
      openAnimationConfig={{ overshootClamping: true }}
      onBeforeClose={() => {
        router.setParams({ ...filters, searchQuery: query });
      }}
      containerStyle={{
        height: "100%",
        backgroundColor: "#161622",
        paddingHorizontal: 12,
      }}
    >
      <View className="gap-3">
        <View className="flex-row items-center justify-between pb-2">
          <Text className="text-foreground text-xl font-bold">Филтри</Text>
          <TouchableOpacity onPress={() => ref.current.hide()}>
            <Text className="text-[#FFA001]">Затвори</Text>
          </TouchableOpacity>
        </View>

        {/* search */}
        <View className="flex-row items-center gap-6 space-x-4 w-full h-12 px-4 bg-black-200 rounded-2xl border-2 border-neutral-800 focus:border-secondary">
          <TouchableOpacity onPress={() => ref.current.hide()}>
            <ArrowLeft color="#CDCDE0" size={20} />
          </TouchableOpacity>

          <TextInput
            className="text-start text-white flex-1 font-pregular"
            value={query as string}
            placeholder="Търсене"
            placeholderTextColor="#CDCDE0"
            onChangeText={(e) => setQuery(e)}
            onSubmitEditing={() => {
              router.setParams({ searchQuery: query });
              ref.current.hide();
            }}
          />

          {query && (
            <TouchableOpacity onPress={handleClear}>
              <XIcon color="#ff9f36" size={20} />
            </TouchableOpacity>
          )}
        </View>
        {/* search */}

        <View className="gap-4 pt-10 border-t-2 border-t-[#FFA001]">
          <View className=" gap-2 items-start justify-start px-2">
            <View className="w-full flex-row justify-between border-b-2 border-b-slate-800 pb-2">
              <Text className="font-bold">Работна позиция</Text>
              <TouchableOpacity
                onPress={() =>
                  setFilters((prev) => ({ ...prev, position: "" }))
                }
                className={"rounded-md bg-primary"}
              >
                <Text
                  className={cn({
                    "text-gray-600": allKeysEmpty(filters["position"]),
                  })}
                >
                  Изчисти
                </Text>
              </TouchableOpacity>
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
                          filters["position"]?.includes(
                            item.trim().toLocaleLowerCase()
                          ) && "bg-[#FFA001]"
                        )}
                      >
                        <Text className="text-s text-white font-semibold capitalize w-full h-fit">
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          <View className=" gap-2 items-start justify-start px-2">
            <View className="w-full flex-row justify-between border-b-2 border-b-slate-800 pb-2">
              <Text>Щат</Text>
              <TouchableOpacity
                onPress={() => setFilters((prev) => ({ ...prev, state: "" }))}
                className={"rounded-md bg-primary"}
              >
                <Text
                  className={cn({
                    "text-gray-600": allKeysEmpty(filters["state"]),
                  })}
                >
                  Изчисти
                </Text>
              </TouchableOpacity>
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
                          handleChangeParams("state", item);
                        }}
                        className={cn(
                          " bg-white/20 p-2 rounded-md mr-2 ",
                          filters["state"]?.includes(
                            item.trim().toLocaleLowerCase()
                          ) && "bg-[#FFA001]"
                        )}
                      >
                        <Text className="text-s text-white text-center font-semibold uppercase w-full h-fit">
                          {getFullStateName(item)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </ActionSheet>
  );
};
