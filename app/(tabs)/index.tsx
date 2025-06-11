import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../../components/examples/components";
import { images } from "../../components/examples/constants";
import useApi, { getOffers } from "../../components/examples/useApi";
import { SearchInput } from "@/components/examples/components/searchInput";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";

import { Offer } from "@/components/examples/ApiTypes";
import { OfferCard } from "@/components/offer/offer";
import { useFavorites } from "@/lib/useFavorites";
import { Filters } from "@/components/examples/components/Filters";

const Offers = () => {
  const { data: offersData, loading, refetch } = useApi(getOffers);
  const { favorites } = useFavorites();
  const { searchQuery, position, state, showFavorites } =
    useLocalSearchParams();
  const filter = typeof searchQuery === "string" ? searchQuery : "";
  const showFav = showFavorites == "true";

  const offers = offersData?.results;

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

      const isFavoriteMatch =
        !showFav || favorites.includes(offer.id.toString());

      return (
        isSearchMatch && isPositionMatch && isStateMatch && isFavoriteMatch
      );
    })
  );

  if (!offers && loading) {
    return (
      <SafeAreaView className="bg-primary h-full flex items-center justify-center">
        <ActivityIndicator size="large" color="#ff9f36" className="mb-4" />
        <Text className="text-[#ff9f36] mt-4">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full" edges={{ top: "additive" }}>
      <FlashList<Offer>
        data={filteredOffers}
        renderItem={({ item }) => <OfferCard item={item} />}
        keyExtractor={(item) => `${item.id}${item.meta?.html_url}`}
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
              <Filters offers={offers || []} />
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
