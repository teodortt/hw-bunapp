import useApi, { getWATData } from "@/components/shared/useApi";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from "react-native";
import HTMLView from "react-native-htmlview";

// Enable LayoutAnimation on Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const Faq = () => {
  const { data: watData } = useApi(getWATData);
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleItem = (groupIndex: number, itemIndex: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const key = `${groupIndex}-${itemIndex}`;
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <View className="flex-1 bg-primary px-6 pt-10">
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
      >
        <Text className="text-2xl font-bold text-white mb-6">
          Често задавани въпроси
        </Text>

        {watData?.faq?.map((group, groupIndex) => (
          <View key={group.id} className="mb-8">
            <Text className="text-xl font-semibold text-orange-400 mb-4">
              {group.value.group_title}
            </Text>

            {group.value.items.map((item, itemIndex) => {
              const key = `${groupIndex}-${itemIndex}`;
              const isExpanded = expandedItems[key];

              return (
                <View key={key} className="mb-3 bg-gray-900 rounded-xl">
                  <TouchableOpacity
                    onPress={() => toggleItem(groupIndex, itemIndex)}
                    className="px-4 py-3 flex-row justify-between items-center"
                  >
                    <Text className="text-white font-medium">
                      {item.question}
                    </Text>
                    <Text className="text-orange-400 text-lg">
                      {isExpanded ? "−" : "+"}
                    </Text>
                  </TouchableOpacity>

                  {isExpanded && (
                    <View className="px-4 pb-4">
                      <Text className="text-gray-300 text-sm leading-relaxed">
                        <HTMLView
                          value={item.answer}
                          stylesheet={{
                            p: { color: "#d1d5db", fontSize: 16 },
                            a: { color: "#d1d5db", fontSize: 16 },
                            strong: { color: "#d1d5db", fontSize: 16 },
                            ul: { color: "#d1d5db", fontSize: 16 },
                            li: { color: "#d1d5db", fontSize: 16 },
                            div: { color: "#d1d5db", fontSize: 16 },
                            span: { color: "#d1d5db", fontSize: 16 },
                            blockquote: {
                              color: "#d1d5db",
                              fontSize: 16,
                              borderLeftWidth: 4,
                              borderLeftColor: "#ff9f36",
                              paddingLeft: 16,
                            },
                            h1: {
                              color: "#d1d5db",
                              fontSize: 20,
                              fontWeight: "bold",
                            },
                            h2: {
                              color: "#d1d5db",
                              fontSize: 18,
                              fontWeight: "bold",
                            },
                            h3: {
                              color: "#d1d5db",
                              fontSize: 16,
                              fontWeight: "bold",
                            },
                            h4: {
                              color: "#d1d5db",
                              fontSize: 14,
                              fontWeight: "bold",
                            },
                            h5: {
                              color: "#d1d5db",
                              fontSize: 12,
                              fontWeight: "bold",
                            },
                            h6: {
                              color: "#d1d5db",
                              fontSize: 10,
                              fontWeight: "bold",
                            },
                          }}
                        />
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Faq;
