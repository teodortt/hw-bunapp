import { View, TouchableOpacity, Text, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Filter, SearchIcon, XIcon } from "lucide-react-native";
import { SheetManager } from "react-native-actions-sheet";
import { allKeysEmpty } from "@/lib/utils";
import { Offer } from "../ApiTypes";

export const SearchInput = ({ offers }: { offers: Offer[] }) => {
  const params = useLocalSearchParams();
  const searchQuery = params["searchQuery"];

  const areFiltersEmpty = allKeysEmpty(params, [
    "searchQuery",
    "tempSearchQuery",
    "showFavorites",
  ]);

  return (
    <Pressable
      onPress={() => {
        SheetManager.show("filters", {
          payload: offers,
        });
      }}
    >
      <View className="flex-row items-center gap-3 w-full h-12 space-x-4 px-4 bg-black-200 rounded-2xl border-2 border-neutral-800">
        <SearchIcon color="#CDCDE0" size={20} />

        <Text className="text-start text-[#CDCDE0] flex-1 font-pregular">
          {searchQuery || "Търсене и филтриране"}
        </Text>

        <View className="flex-row items-center gap-4">
          {searchQuery && (
            <TouchableOpacity
              onPress={() => router.setParams({ searchQuery: "" })}
            >
              <XIcon color="#ff9f36" size={22} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              SheetManager.show("filters", {
                payload: offers,
              });
            }}
          >
            <Filter color={areFiltersEmpty ? "#CDCDE0" : "#ff9f36"} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};
