import { View, TouchableOpacity, Text, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Filter, SortAsc, SortDesc } from "lucide-react-native";
import { SheetManager } from "react-native-actions-sheet";
import { allKeysEmpty } from "@/lib/utils";
import { Offer } from "../ApiTypes";

export const Filters = ({ offers }: { offers: Offer[] }) => {
  const params = useLocalSearchParams();
  const sort = params["sort"];
  const areFiltersEmpty = allKeysEmpty(params, ["showFavorites"]);

  return (
    <View className="flex-row items-center justify-between w-full h-12 space-x-4 px-2">
      <TouchableOpacity
        onPress={
          () => router.setParams({ sort: sort === "asc" ? "desc" : "asc" })
          // TODO: ADD SORTING SHEET
        }
      >
        <View className="space-x-2 px-4 py-2 shadow-sm border bg-blue-100 rounded-full flex-row items-center">
          {sort === "asc" ? (
            <SortAsc color="#ff9f36" size={20} />
          ) : (
            <SortDesc color="#ff9f36" size={20} />
          )}
          <Text className="text-blue-800 text-sm">Сортиране</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          SheetManager.show("filters", {
            payload: offers,
          });
        }}
      >
        <View className="space-x-2 px-4 py-2 shadow-sm border bg-blue-100 rounded-full flex-row items-center">
          <Filter color={areFiltersEmpty ? "#ff9f36" : "#ff9f36"} size={20} />
          <Text className="text-blue-800 text-sm">Филтриране</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
