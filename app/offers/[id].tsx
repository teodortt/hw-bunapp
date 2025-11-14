import { useLocalSearchParams } from "expo-router";
import * as React from "react";
import {
  ScrollView,
  Image,
  ActivityIndicator,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Text } from "@/components/ui/text";
import useApi, { getOfferDetails } from "@/components/shared/useApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavorites } from "@/lib/useFavorites";
import { HeartIcon, MessageCircle } from "lucide-react-native";
import { SheetManager } from "react-native-actions-sheet";
import HTMLView from "react-native-htmlview";

export default function OfferDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const { isFavoriteId, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = isFavoriteId(id);

  const { data: offer, loading } = useApi(() => getOfferDetails(id));

  const features_list = [
    offer?.housing_available && "Housing available",
    offer?.english_level && `English level: ${offer.english_level}`,
    offer?.hours_per_week && `${offer.hours_per_week} hours/week`,
    offer?.start_date && `Start date: ${offer.start_date}`,
    offer?.end_date && `End date: ${offer.end_date}`,
  ].filter(Boolean);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(id);
      return;
    }

    addFavorite(id);
  };

  if (!offer && !loading) {
    return (
      <SafeAreaView className="bg-primary h-full flex items-center justify-center">
        <Text className="text-destructive pb-2 ">Error Loading data</Text>
      </SafeAreaView>
    );
  }
  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full flex items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-4">Loading offer data...</Text>
      </SafeAreaView>
    );
  }

  if (!offer) {
    return null;
  }

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{ padding: 24 }}
        className="mx-auto w-full max-w-xl bg-primary"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        contentInset={{ top: 12 }}
      >
        <Text className="text-2xl font-bold mb-4">{offer.position}</Text>

        {/* Image */}
        {offer?.image && (
          <Image
            source={{
              uri: offer.image.full_url,
            }}
            className="w-full h-48 rounded-2xl mb-4"
            resizeMode="cover"
          />
        )}

        {/* Employer */}
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-semibold">{offer.employer}</Text>
          <TouchableOpacity onPress={handleFavoriteToggle}>
            <HeartIcon
              color={"#161622"}
              fill={isFavorite ? "#ff9f36" : "#1f2937"}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-500 mb-2">
          {offer.city}, {offer.state}
        </Text>

        {/* Wage */}
        <Text className="text-lg font-bold py-3">${offer.hourly_rate}</Text>

        {/* Features */}
        <View className="flex-row flex-wrap gap-2 mb-3">
          {features_list.map((feature, index) => (
            <Text
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {feature}
            </Text>
          ))}
          {offer.tips_available && (
            <Text className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Tips available
            </Text>
          )}
        </View>

        <View className="py-8">
          <Text className="text-gray-500 mb-1">Описание</Text>

          <HTMLView
            value={offer.job_description || "<p>Няма описание.</p>"}
            stylesheet={{
              p: { color: "#fff", fontSize: 16 },
              a: { color: "#fff", fontSize: 16 },
              strong: { color: "#fff", fontSize: 16 },
              ul: { color: "#fff", fontSize: 16 },
              li: { color: "#fff", fontSize: 16 },
              div: { color: "#fff", fontSize: 16 },
              span: { color: "#fff", fontSize: 16 },
              blockquote: {
                color: "#fff",
                fontSize: 16,
                borderLeftWidth: 4,
                borderLeftColor: "#ff9f36",
                paddingLeft: 16,
              },
              h1: { color: "#fff", fontSize: 20, fontWeight: "bold" },
              h2: { color: "#fff", fontSize: 18, fontWeight: "bold" },
              h3: { color: "#fff", fontSize: 16, fontWeight: "bold" },
              h4: { color: "#fff", fontSize: 14, fontWeight: "bold" },
              h5: { color: "#fff", fontSize: 12, fontWeight: "bold" },
              h6: { color: "#fff", fontSize: 10, fontWeight: "bold" },
            }}
          />
        </View>
      </ScrollView>

      {/* Fixed Floating Button */}
      <TouchableOpacity
        onPress={() =>
          SheetManager.show("inquiry", {
            payload: offer,
          })
        }
        className="absolute bottom-5 right-5 w-16 h-16 bg-[#ff9f36] rounded-full justify-center items-center shadow-lg"
      >
        <Text className="text-white text-2xl">
          <MessageCircle color="white" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}
