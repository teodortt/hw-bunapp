import { useLocalSearchParams, useNavigation } from "expo-router";
import * as React from "react";
import {
  ScrollView,
  Image,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from "react-native";
import { Text } from "@/components/ui/text";
import useApi, { getOfferDetails } from "@/components/examples/useApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavorites } from "@/lib/useFavorites";
import { HeartIcon } from "lucide-react-native";

export default function OfferDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { isFavoriteId, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = isFavoriteId(id);

  const { data: offer, loading } = useApi(() => getOfferDetails(id));

  const features_list = [
    offer?.housing_available && "Housing available",
    offer?.english_level && `English level: ${offer.english_level}`,
    offer?.hours_per_week && `${offer.hours_per_week} hours/week`,
    offer?.tips_available && "Tips available",
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
    <ScrollView
      contentContainerStyle={{ padding: 24 }}
      className="mx-auto w-full max-w-xl bg-primary"
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 12 }}
    >
      <Text className="text-2xl font-bold mb-4">Job Offer</Text>

      {/* Image */}
      {offer?.image && (
        <Image
          source={{ uri: offer.image.meta.download_url }}
          className="w-full h-48 rounded-2xl mb-4"
          resizeMode="cover"
        />
      )}

      {/* Position */}
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-semibold">{offer.position}</Text>
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
        <Text className="text-gray-500 mb-1">Description</Text>
        <Text className="text-gray-700">
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        </Text>
      </View>

      {/* Link */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="bg-black-200 px-4 py-3 rounded-xl mt-2"
      >
        <Text className="text-white text-center font-medium">
          Направи запитване
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
