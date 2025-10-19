import { Image, Text, TouchableOpacity, View, Pressable } from "react-native";
import { Home } from "@/lib/icons/Home";
import { Link } from "expo-router";
import { HeartIcon } from "lucide-react-native";

import { useFavorites } from "@/lib/useFavorites";
import { Offer } from "@/components/examples/ApiTypes";
import { cn } from "@/lib/utils";

export const OfferCard = ({ item }: { item: Offer }) => {
  const { isFavoriteId, addFavorite, removeFavorite } = useFavorites();

  const id = item.id.toString();
  const isFavorite = isFavoriteId(id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(id);
      return;
    }

    addFavorite(id);
  };

  const features_list = [
    `English: ${item.english_level}`,
    `${item.hours_per_week} hrs/week`,
  ];

  return (
    <Link href={`/offers/${item.id}`} asChild>
      <Pressable>
        <View className="flex-row mb-4 mx-2 bg-gray-800 border-none rounded-lg overflow-hidden">
          <Image
            source={{
              uri: item.image.full_url,
            }}
            className="w-36 h-36"
          />
          <View className="flex-1 p-2 pl-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-white">
                {item.position}
              </Text>
              <TouchableOpacity onPress={handleFavoriteToggle}>
                <HeartIcon
                  color={isFavorite ? "#ff9f36" : "#57513e"}
                  fill={isFavorite ? "#ff9f36" : "#1f2937"}
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center gap-2">
              <Home className="text-foreground w-4 h-4" />
              <Text className="text-sm text-gray-300">
                {item.city}, {item.state}
              </Text>
            </View>

            <View className="flex-row pt-2 gap-2 items-center">
              <View className="flex-row items-center gap-2 flex-wrap">
                {features_list?.map((feature, index) => (
                  <Text
                    key={`${feature}-${index}`}
                    className="text-xs text-white bg-white/20 px-2 py-1 rounded-md"
                  >
                    {feature}
                  </Text>
                ))}
              </View>
            </View>
            <View className="flex-row justify-between items-center mt-4">
              <Text className="text-lg font-bold text-white">
                ${item.hourly_rate}
                {item.tips_available && " + tips"}
              </Text>
              <View className="flex-row items-center gap-2">
                {!item.unavailable && item.just_few_left && (
                  <Text className="text-xs text-yellow-300">
                    Just a few left
                  </Text>
                )}
                {item.top_offer && (
                  <Text
                    className={cn("text-xs text-[#ff9f36]", {
                      "line-through text-slate-600": item.unavailable,
                    })}
                  >
                    Top offer
                  </Text>
                )}
                {item.unavailable && (
                  <Text className="text-xs text-red-500">Sold out</Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
