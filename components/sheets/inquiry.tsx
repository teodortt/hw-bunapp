import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Inquiry = () => {
  const insets = useSafeAreaInsets();

  const handleSubmit = () => {
    Alert.alert("Form submitted", "This is where you'd handle the form logic.");
  };

  return (
    <ActionSheet
      isModal
      gestureEnabled
      indicatorStyle={{ width: 0 }}
      safeAreaInsets={insets}
      containerStyle={{ height: 350, backgroundColor: "#232533" }}
    >
      <View className="h-full bg-[#232533] px-6 justify-start">
        <Text className="text-2xl font-semibold text-center pb-8 text-white">
          Безплатна консултация
        </Text>

        <TextInput
          className="h-12 border border-gray-300 rounded-xl px-4 text-base text-black bg-gray-50 mb-4"
          placeholder="Име*"
          placeholderTextColor="#999"
        />
        <TextInput
          className="h-12 border border-gray-300 rounded-xl px-4 text-base text-black bg-gray-50 mb-4"
          placeholder="Телефон*"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
        <TextInput
          className="h-12 border border-gray-300 rounded-xl px-4 text-base text-black bg-gray-50 mb-6"
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
        />
        {/* <TextInput
          className="h-12 border border-gray-300 rounded-xl px-4 text-base text-black bg-gray-50 mb-4"
          placeholder="Запитване (не е задължително)"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={{ height: 80 }}
          maxLength={500}
          placeholderTextColor="#999"
        /> */}

        <TouchableOpacity
          onPress={handleSubmit}
          className="h-12 bg-[#ff9f36] rounded-xl justify-center items-center"
        >
          <Text className="text-white text-base font-semibold">Изпрати</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};
