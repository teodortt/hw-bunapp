import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import { CustomButton } from "./customButton";

export const EmptyState = ({ title, subtitle }: any) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {subtitle}
      </Text>

      {/* <CustomButton
        title="< Начало"
        handlePress={() => router.push("/offers")}
        containerStyles="w-full my-5"
      /> */}
    </View>
  );
};
