import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { Filters } from "@/components/settings/Filters";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Offer } from "../useApi";
import { SearchIcon } from "lucide-react-native";

export const SearchInput = ({ offers }: { offers: Offer[] }) => {
  const { searchQuery } = useLocalSearchParams();
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
    <View className="flex flex-row items-center space-x-4 w-full h-12 px-4 bg-black-200 rounded-2xl border-2 border-neutral-800 focus:border-secondary">
      <TextInput
        className="text-base text-white flex-1 font-pregular"
        value={query as string}
        placeholder="Търсене"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => handleChange(e)}
        onBlur={handleSearch}
      />

      <View className="flex flex-row gap-4">
        <Filters offers={offers} />
        <TouchableOpacity onPress={handleSearch}>
          <SearchIcon color="#CDCDE0" size={17} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
