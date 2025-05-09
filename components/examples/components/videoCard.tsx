import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

export const VideoCard = ({ title, creator, thumbnail }: any) => {
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        // onPress={() => setPlay(true)}
        className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
      >
        <Image
          source={{ uri: thumbnail }}
          className="w-full h-full rounded-xl mt-3"
          resizeMode="cover"
        />

        <Image
          source={icons.heartOutlined}
          className="w-6 h-6 absolute top-4 right-4"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};
