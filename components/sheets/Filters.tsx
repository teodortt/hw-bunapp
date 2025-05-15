import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui//text";
import { XIcon } from "lucide-react-native";
import { Offer } from "../examples/useApi";
import { router, useGlobalSearchParams } from "expo-router";
import { allKeysEmpty, cn, splitIntoRows } from "@/lib/utils";
import { getFullStateName } from "@/lib/getStatename";
import ActionSheet, {
  useSheetPayload,
  useSheetRef,
} from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Filters = () => {
  const offers: Offer[] = useSheetPayload("payload");
  const insets = useSafeAreaInsets();
  const ref = useSheetRef();
  const params = useGlobalSearchParams();
  const offersRows = splitIntoRows(offers.map((offer) => offer.position));
  const statesRows = splitIntoRows(offers.map((offer) => offer.state));

  const handleChangeParams = (key: string, param: string) => {
    const item = param.trim().toLowerCase();
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
      ...(updatedValues.length > 0 ? { [key]: updatedValues } : { [key]: "" }),
    });
  };

  return (
    <ActionSheet
      isModal={false}
      backgroundInteractionEnabled={false}
      safeAreaInsets={insets}
      snapPoints={[100]}
      gestureEnabled
      closable={false}
      disableDragBeyondMinimumSnapPoint
      containerStyle={{
        height: 500,
        backgroundColor: "#161622",
        paddingHorizontal: 12,
      }}
    >
      <View className="gap-3">
        <View className="flex-row items-center justify-between pb-2">
          <Text className="text-foreground text-xl font-bold">Филтри</Text>
          <TouchableOpacity onPress={() => ref.current.hide()}>
            <XIcon color="#FFA001" />
          </TouchableOpacity>
        </View>
        <View className="gap-4 pt-10 border-t-2 border-t-[#FFA001]">
          <View className=" gap-2 items-start justify-start px-2">
            <View className="w-full flex-row justify-between border-b-2 border-b-slate-800 pb-2">
              <Text>Работна позиция</Text>
              {!allKeysEmpty(params["position"]) && (
                <TouchableOpacity
                  onPress={() => router.setParams({ position: "" })}
                  className={"rounded-md bg-primary"}
                >
                  <Text>Изчисти</Text>
                </TouchableOpacity>
              )}
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
                          params["position"]?.includes(
                            item.trim().toLocaleLowerCase()
                          ) && "bg-white/50"
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
          <View className=" gap-2 items-start justify-start px-2">
            <View className="w-full flex-row justify-between border-b-2 border-b-slate-800 pb-2">
              <Text>Щат</Text>
              {!allKeysEmpty(params["state"]) && (
                <TouchableOpacity
                  onPress={() => router.setParams({ state: "" })}
                  className={"rounded-md bg-primary"}
                >
                  <Text>Изчисти</Text>
                </TouchableOpacity>
              )}
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
                          params["state"]?.includes(
                            item.trim().toLocaleLowerCase()
                          ) && "bg-white/50"
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
        </View>
      </View>
    </ActionSheet>
  );
};
