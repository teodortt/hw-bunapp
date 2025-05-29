import { useLocalSearchParams } from "expo-router";
import * as React from "react";
import RenderHTML from "react-native-render-html";
import {
  ScrollView,
  Image,
  ActivityIndicator,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Text } from "@/components/ui/text";
import useApi, { getOfferDetails } from "@/components/examples/useApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavorites } from "@/lib/useFavorites";
import { HeartIcon, MessageCircle } from "lucide-react-native";
import { SheetManager } from "react-native-actions-sheet";

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
              uri: `https://www.happyworld.bg${offer.image.meta.download_url}`,
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
        <Text className="text-lg font-medium py-3">{offer.hourly_rate}</Text>

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
          <RenderHTML
            baseStyle={{ color: "#FFF" }}
            WebView={Text}
            contentWidth={width}
            source={{
              html: offer.job_description || "No description available.",
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
