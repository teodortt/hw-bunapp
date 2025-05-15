import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { mapToUnifiedObjects } from "@/lib/utils";

type OfferResponse = {
  Position: string;
  Location: string;
  Wage: string;
  OfferLink: string;
  Image: string;
};

export type Offer = {
  id: string;
  position: string;
  city: string;
  state: string;
  features_list: string[];
  hourly_rate: string;
  tips_available: boolean;
  unavailable: boolean;
  meta?: {
    type?: string;
    image?: string;
    link?: string;
  };
};

type ApiFunction<T> = () => Promise<T>;

const useApi = <T>(fn: ApiFunction<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useApi;

export async function getOffers(): Promise<Offer[]> {
  try {
    const response = await fetch(
      "https://sheets.livepolls.app/api/spreadsheets/ffc50341-04e8-438e-b58b-06367383f4f6/Offers"
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    const mappedData = mapToUnifiedObjects(data.data, [
      "Position",
      "Location",
      "Wage",
      "OfferLink",
      "Image",
    ]);

    const offers = mappedData.map((item: OfferResponse, i: number) => ({
      id: String(i + 1),
      position: item.Position,
      city: item.Location.split(",")[0],
      state: item.Location.split(",")[1],
      features_list: ["Interview", "Flexible start"], //B2
      hourly_rate: item.Wage,
      tips_available: true,
      unavailable: false,
      meta: {
        link: item.OfferLink,
        image: item.Image,
      },
    }));

    return offers;
  } catch (error) {
    console.error("Error fetching offers:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }

  // return {
  //   items: [
  //     {
  //       id: 10,
  //       meta: { type: "full-time" },
  //       position: "Software Engineer",
  //       city: "San Francisco",
  //       state: "CA",
  //       features_list: ["Remote", "Healthcare"],
  //       hourly_rate: 50,
  //       tips_available: false,
  //       unavailable: false,
  //     },
  //     {
  //       id: 11,
  //       meta: { type: "part-time" },
  //       position: "Data Analyst",
  //       city: "New York",
  //       state: "NY",
  //       features_list: ["Flexible hours", "401k"],
  //       hourly_rate: 40,
  //       tips_available: true,
  //       unavailable: false,
  //     },
  //     {
  //       id: 12,
  //       meta: { type: "internship" },
  //       position: "Marketing Intern",
  //       city: "Los Angeles",
  //       state: "CA",
  //       features_list: ["Paid internship", "Mentorship", "Remote command"],
  //       hourly_rate: 20,
  //       tips_available: false,
  //       unavailable: true,
  //     },
  //     {
  //       id: 1,
  //       meta: { type: "full-time" },
  //       position: "Software Engineer",
  //       city: "San Francisco",
  //       state: "CA",
  //       features_list: ["Remote", "Healthcare"],
  //       hourly_rate: 50,
  //       tips_available: false,
  //       unavailable: false,
  //     },
  //     {
  //       id: 2,
  //       meta: { type: "part-time" },
  //       position: "Data Analyst",
  //       city: "New York",
  //       state: "NY",
  //       features_list: ["Flexible hours", "401k"],
  //       hourly_rate: 40,
  //       tips_available: true,
  //       unavailable: false,
  //     },
  //     {
  //       id: 3,
  //       meta: { type: "internship" },
  //       position: "Marketing Intern",
  //       city: "Los Angeles",
  //       state: "CA",
  //       features_list: ["Paid internship", "Mentorship", "Remote command"],
  //       hourly_rate: 20,
  //       tips_available: false,
  //       unavailable: true,
  //     },
  //     {
  //       id: 4,
  //       meta: { type: "full-time" },
  //       position: "Software Engineer",
  //       city: "San Francisco",
  //       state: "CA",
  //       features_list: ["Remote", "Healthcare"],
  //       hourly_rate: 50,
  //       tips_available: false,
  //       unavailable: false,
  //     },
  //     {
  //       id: 5,
  //       meta: { type: "part-time" },
  //       position: "Data Analyst",
  //       city: "New York",
  //       state: "NY",
  //       features_list: ["Flexible hours", "401k"],
  //       hourly_rate: 40,
  //       tips_available: true,
  //       unavailable: false,
  //     },
  //     {
  //       id: 6,
  //       meta: { type: "internship" },
  //       position: "Marketing Intern",
  //       city: "Los Angeles",
  //       state: "CA",
  //       features_list: ["Paid internship", "Mentorship", "Remote command"],
  //       hourly_rate: 20,
  //       tips_available: false,
  //       unavailable: true,
  //     },
  //     {
  //       id: 7,
  //       meta: { type: "full-time" },
  //       position: "Software Engineer",
  //       city: "San Francisco",
  //       state: "CA",
  //       features_list: ["Remote", "Healthcare"],
  //       hourly_rate: 50,
  //       tips_available: false,
  //       unavailable: false,
  //     },
  //     {
  //       id: 8,
  //       meta: { type: "part-time" },
  //       position: "Data Analyst",
  //       city: "New York",
  //       state: "NY",
  //       features_list: ["Flexible hours", "401k"],
  //       hourly_rate: 40,
  //       tips_available: true,
  //       unavailable: false,
  //     },
  //     {
  //       id: 9,
  //       meta: { type: "internship" },
  //       position: "Marketing Intern",
  //       city: "Los Angeles",
  //       state: "CA",
  //       features_list: ["Paid internship", "Mentorship", "Remote command"],
  //       hourly_rate: 20,
  //       tips_available: false,
  //       unavailable: true,
  //     },
  //   ],
  // };
}

export async function getOfferDetails(id: string): Promise<Offer> {
  try {
    const response = await fetch(
      `https://sheets.livepolls.app/api/spreadsheets/ffc50341-04e8-438e-b58b-06367383f4f6/Offers/${id}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const offer = {
      id: String(id),
      position: data.data.Position,
      city: data.data?.Location?.split(",")?.[0],
      state: data.data?.Location?.split(",")?.[1],
      features_list: ["Interview", "Flexible start"], //B2
      hourly_rate: data.data.Wage,
      tips_available: true,
      unavailable: false,
      meta: {
        link: data.data.OfferLink,
        image: data.data.Image,
      },
    };

    return offer;
  } catch (error) {
    console.error("Error fetching offers:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
