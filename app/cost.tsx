import { View, Text, ScrollView } from "react-native";
import useApi, { getWATData } from "../components/shared/useApi";
import HTMLView from "react-native-render-html";

const Cost = () => {
  const { data: steps } = useApi(getWATData);

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="mx-auto w-full max-w-xl"
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        contentInset={{ top: 12 }}
      >
        <Text className="text-2xl font-bold text-white mb-6 text-start">
          Колко струва студентска бригада в САЩ?
        </Text>

        {steps?.placement_options.map((step, index) => (
          <View
            key={index}
            className="bg-gray-900 rounded-2xl p-5 mb-8 shadow-md shadow-orange-500"
          >
            <View className="flex-row items-start justify-between mb-4">
              <View className="flex-1 pr-4">
                <Text className="text-lg font-semibold text-white mb-1">
                  {step.name}
                </Text>
                <Text className="text-sm text-gray-300 leading-relaxed">
                  <HTMLView
                    source={{
                      html: step.description || "<p>Няма описание.</p>",
                    }}
                    tagsStyles={{
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
              <View className="bg-orange-500 rounded-full px-3 py-1 self-start">
                <Text className="text-white text-sm font-bold">
                  ${step.price}
                </Text>
              </View>
            </View>
            <View className="h-[1px] bg-orange-600 opacity-30" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Cost;
