import { View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Filter, SearchIcon } from "lucide-react-native";
import { SheetManager } from "react-native-actions-sheet";
import { allKeysEmpty } from "@/lib/utils";
import { Offer } from "../ApiTypes";

export const SearchInput = ({ offers }: { offers: Offer[] }) => {
  const params = useLocalSearchParams();
  const searchQuery = params["searchQuery"];

  const [query, setQuery] = useState(searchQuery || "");

  const handleChange = (text: string) => {
    setQuery(text);
    if (text.length === 0) {
      router.setParams({ searchQuery: "" });
    }
  };

  const handleSearch = () => {
    router.setParams({ searchQuery: query });
  };

  return (
    <View className="flex-row items-center space-x-4 w-full h-12 px-4 bg-black-200 rounded-2xl border-2 border-neutral-800 focus:border-secondary">
      <TextInput
        className="text-base text-white flex-1 font-pregular"
        value={query as string}
        placeholder="Търсене"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => handleChange(e)}
        onBlur={handleSearch}
      />

      <View className="flex-row gap-4">
        <TouchableOpacity
          onPress={() =>
            SheetManager.show("filters", {
              payload: offers,
            })
          }
        >
          <Filter
            color={
              allKeysEmpty(params, ["searchQuery", "tempSearchQuery"])
                ? "#CDCDE0"
                : "#ff9f36"
            }
            size={17}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearch}>
          <SearchIcon color="#CDCDE0" size={17} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
