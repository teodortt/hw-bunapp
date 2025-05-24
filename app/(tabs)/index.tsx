import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../../components/examples/components";
import { images } from "../../components/examples/constants";
import useApi, { getOffers } from "../../components/examples/useApi";
import { Home } from "@/lib/icons/Home";
import { SearchInput } from "@/components/examples/components/searchInput";
import { FlashList } from "@shopify/flash-list";
import { Link, useLocalSearchParams } from "expo-router";
import { HeartIcon } from "lucide-react-native";

import { useFavorites } from "@/lib/useFavorites";
import { Offer } from "@/components/examples/ApiTypes";

const OfferCard = ({ item }: { item: Offer }) => {
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
  return (
    <Link href={`/offers/${item.id}`} asChild>
      <Pressable>
        <View className="flex-row mb-4 mx-2 bg-gray-800 border-none rounded-lg overflow-hidden">
          <Image
            source={{
              uri: item.meta.,
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
                  color={"#161622"}
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
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-1"
              >
                <View className="flex-row items-center gap-2">
                  {item.features_list?.map((feature, index) => (
                    <Text
                      key={`${feature}-${index}`}
                      className="text-xs text-white bg-white/20 px-2 py-1 rounded-md"
                    >
                      {feature}
                    </Text>
                  ))}
                </View>
              </ScrollView>
            </View>
            <View className="flex-row justify-between items-center mt-4">
              <Text className="text-lg font-bold text-white">
                {item.hourly_rate}
                {item.tips_available}
              </Text>
              <Text className="text-xs text-red-500">
                {item.unavailable && "Sold out"}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const Offers = () => {
  const { data: offers, loading, refetch } = useApi(getOffers);
  const { searchQuery, position, state } = useLocalSearchParams();
  const filter = typeof searchQuery === "string" ? searchQuery : "";

  const filteredOffers = offers?.filter((offer) =>
    Object.values(offer).some((value) => {
      const isSearchMatch = filter
        ? String(value).toLowerCase().includes(filter.toLowerCase())
        : true;

      const isPositionMatch =
        Array.isArray(position) && position.length
          ? position.some(
              (p) => p.toLowerCase() === offer.position.trim().toLowerCase()
            )
          : true;

      const isStateMatch =
        Array.isArray(state) && state.length
          ? state.some(
              (s) => s.toLowerCase() === offer.state.trim().toLowerCase()
            )
          : true;

      return isSearchMatch && isPositionMatch && isStateMatch;
    })
  );

  if (!offers && loading) {
    return (
      <SafeAreaView className="bg-primary h-full flex items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-4">Loading offers...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full" edges={{ top: "additive" }}>
      <FlashList<Offer>
        data={filteredOffers}
        renderItem={({ item }) => <OfferCard item={item} />}
        keyExtractor={(item) => `${item.id}${item.meta?.link}`}
        className="native:overflow-hidden rounded-t-lg"
        estimatedItemSize={144}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            colors={["#ff9f36"]} // Android spinner color(s)
            tintColor="#ff9f36" // iOS spinner color
          />
        }
        ListHeaderComponent={() => (
          <View>
            <View className="flex flex-row justify-between items-center p-4">
              <View>
                <TouchableOpacity onPress={() => refetch()}>
                  <Text className="font-medium text-sm text-gray-100">
                    Work and Travel
                  </Text>

                  <Text className="text-2xl font-semibold text-white">
                    Работни оферти
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </View>
            </View>

            <View className="pb-4 px-1">
              <SearchInput offers={offers || []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Няма налични оферти за тази категория"
            subtitle="Няма намерени оферти"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Offers;
