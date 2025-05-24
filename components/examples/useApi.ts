import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { OfferDetails, OfferResponse } from "./ApiTypes";

export const baseURL = "https://www.happyworld.bg/api/v2";
const AUTHORIZATION_TOKEN = "2b2a404823e6e719ed3b6d1f5e33ce32b59cb809";

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

export async function getOffers(): Promise<OfferResponse> {
  try {
    const response = await fetch(
      `${baseURL}/offers/?type=home.WATJobPage&fields=*`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${AUTHORIZATION_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Error fetching offers:", { res: response });
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching offers:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getOfferDetails(id: string): Promise<OfferDetails> {
  try {
    const response = await fetch(
      `${baseURL}/offers/${id}?type=home.WATJobPage&fields=*`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${AUTHORIZATION_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching offers:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
