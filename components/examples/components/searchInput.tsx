import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { icons } from "@/components/examples/constants";
import { Filters } from "@/components/settings/Filters";

export const SearchInput = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (value: string) => void;
}) => {
  return (
    <View className="flex flex-row items-center space-x-4 w-full h-12 px-4 bg-black-200 rounded-2xl border-2 border-neutral-800 focus:border-secondary">
      <TextInput
        className="text-base text-white flex-1 font-pregular"
        value={filter}
        placeholder="Търсене"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setFilter(e)}
        autoFocus
        //TODO: or onBlur
      />

      <View className="flex flex-row gap-4">
        <TouchableOpacity>
          <Filters />
        </TouchableOpacity>
        <TouchableOpacity>
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
