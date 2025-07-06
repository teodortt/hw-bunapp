import { View, Text, ScrollView } from "react-native";
import useApi, { getWATData } from "../components/examples/useApi";
import HTMLView from "react-native-htmlview";

type Step =
  | "Записване и документи"
  | "Работна оферта"
  | "Студентска виза"
  | "Самолетен билет";

const getTitleIcon = (step: string) => {
  switch (step) {
    case "Записване и документи":
      return "📝";
    case "Работна оферта":
      return "💼";
    case "Студентска виза":
      return "🎫";
    case "Самолетен билет":
      return "✈️";
  }
};

const Steps = () => {
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
          Записване и документи
        </Text>

        {steps?.process_steps.map((step, index) => (
          <View
            key={index}
            className="bg-gray-800 rounded-2xl p-5 mb-8 shadow-sm shadow-orange-400"
          >
            <Text className="text-lg font-semibold text-gray-100 mb-2">
              {getTitleIcon(step.value.step_title)} {"  "}
              {index + 1}.{"  "}
              {step.value.step_title}
            </Text>
            <Text className="text-base text-gray-300 whitespace-pre-line">
              <HTMLView
                value={step.value.description || "<p>Няма описание.</p>"}
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
                  h1: { color: "#d1d5db", fontSize: 20, fontWeight: "bold" },
                  h2: { color: "#d1d5db", fontSize: 18, fontWeight: "bold" },
                  h3: { color: "#d1d5db", fontSize: 16, fontWeight: "bold" },
                  h4: { color: "#d1d5db", fontSize: 14, fontWeight: "bold" },
                  h5: { color: "#d1d5db", fontSize: 12, fontWeight: "bold" },
                  h6: { color: "#d1d5db", fontSize: 10, fontWeight: "bold" },
                }}
              />
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Steps;
