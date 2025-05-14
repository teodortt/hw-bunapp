import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../../components/examples/components";
import { images } from "../../components/examples/constants";
import useApi, { getOffers, Offer } from "../../components/examples/useApi";
import { Home } from "@/lib/icons/Home";
import { SearchInput } from "@/components/examples/components/searchInput";
import { FlashList } from "@shopify/flash-list";

const OfferCard = ({ item }: { item: Offer }) => (
  <View className="flex-row mb-4 mx-2 bg-gray-800 border-none rounded-lg overflow-hidden">
    <Image
      source={{
        uri: item.meta?.image,
      }}
      className="w-36 h-36"
    />
    <View className="flex-1 p-2 pl-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold text-white">{item.position}</Text>
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
);

const Offers = () => {
  const { data: offers, loading, refetch } = useApi(getOffers);

  return (
    <SafeAreaView className="bg-primary h-full" edges={{ top: "additive" }}>
      <FlashList<Offer>
        data={offers}
        renderItem={({ item }) => <OfferCard item={item} />}
        className="native:overflow-hidden rounded-t-lg"
        estimatedItemSize={144}
        refreshing={loading}
        onRefresh={refetch}
        ListHeaderComponent={() => (
          <View>
            <View className="flex flex-row justify-between items-center p-4">
              <View>
                <TouchableOpacity
                  onPress={() => {
                    // TODO: reload the data
                    Alert.alert("No values stored under that key.");
                    console.log("No values are stored under that key.");
                  }}
                >
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
              <SearchInput initialQuery={"undefined"} />
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
