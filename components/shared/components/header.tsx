import { View, Text, Image, Pressable, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { images } from "../constants";
import { useNavigation } from "expo-router";

export const Header = ({ backButton }: { backButton?: boolean }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 120,
        width: "100%",
        backgroundColor: "#161622",
        borderBottomColor: "#575251",
        borderBottomWidth: 0.3,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingBottom: 10,
      }}
    >
      <View>
        {backButton && (
          <Text
            onPress={() => navigation.goBack()}
            className="text-secondary pb-2 font-bold"
          >{`< Назад`}</Text>
        )}
      </View>
      <Image
        source={images.logo}
        style={{
          width: 100,
          height: 40,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};
