import { View, Text, Button } from "react-native";
import ActionSheet, { useSheetRef } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const TestSheet = () => {
  const insets = useSafeAreaInsets();
  return (
    <ActionSheet
      isModal //important
      backgroundInteractionEnabled //important
      indicatorStyle={{
        width: 150,
      }}
      gestureEnabled
      safeAreaInsets={insets}
      drawUnderStatusBar
      containerStyle={{
        height: "100%",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 30,
          }}
        >
          I draw under status bar!
        </Text>
      </View>
    </ActionSheet>
  );
};

export const TestSheet2 = () => {
  const insets = useSafeAreaInsets();
  const ref = useSheetRef();

  return (
    <ActionSheet
      isModal={true}
      backgroundInteractionEnabled
      safeAreaInsets={insets}
      snapPoints={[30, 100]}
      gestureEnabled
      closable={false}
      disableDragBeyondMinimumSnapPoint
      containerStyle={{
        borderWidth: 1,
        borderColor: "#f0f0f0",
      }}
    >
      <View
        style={{
          paddingHorizontal: 12,
          height: 400,
          alignItems: "center",
          paddingVertical: 20,
          gap: 10,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          I always stay at the bottom
        </Text>

        <Button
          title="Until you close me..."
          onPress={() => {
            ref.current.hide();
          }}
        />
      </View>
    </ActionSheet>
  );
};
