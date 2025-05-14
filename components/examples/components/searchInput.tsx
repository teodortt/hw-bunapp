import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { icons } from "@/components/examples/constants";
import { Filters } from "@/components/settings/Filters";
import { useState } from "react";
import { router } from "expo-router";

export const SearchInput = ({ initialQuery }: { initialQuery?: string }) => {
  const [query, setQuery] = useState(initialQuery || "");

  const handleSearch = () => {
    router.setParams({ searchQuery: query });
  };

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-12 px-4 bg-black-200 rounded-2xl border-2 border-neutral-800 focus:border-secondary">
      <TextInput
        className="text-base text-white flex-1 font-pregular"
        value={query}
        placeholder="Търсене"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        onBlur={handleSearch}
      />

      <View className="flex flex-row gap-4">
        <TouchableOpacity>
          <Filters />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearch}>
          <Image
            source={icons.search}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
