import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useApi = (fn: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      Alert.alert("Error", (error as any).message);
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

export async function getOffers() {
  // try {
  //   const response = await fetch(
  //     "http://localhost:8000/api/v2/pages/?type=home.WATJobPage&fields=*"
  //   );

  //   if (!response.ok) {
  //     throw new Error(`Error: ${response.status} - ${response.statusText}`);
  //   }

  //   return await response.json();
  // } catch (error) {
  //   console.error("Error fetching offers:", error);
  //   throw new Error(error.message);
  // }

  return {
    items: [
      {
        id: 10,
        meta: { type: "full-time" },
        position: "Software Engineer",
        city: "San Francisco",
        state: "CA",
        featuresList: ["Remote", "Healthcare"],
        hourly_rate: 50,
        tips_available: false,
        unavailable: false,
      },
      {
        id: 11,
        meta: { type: "part-time" },
        position: "Data Analyst",
        city: "New York",
        state: "NY",
        featuresList: ["Flexible hours", "401k"],
        hourly_rate: 40,
        tips_available: true,
        unavailable: false,
      },
      {
        id: 12,
        meta: { type: "internship" },
        position: "Marketing Intern",
        city: "Los Angeles",
        state: "CA",
        featuresList: ["Paid internship", "Mentorship", "Remote command"],
        hourly_rate: 20,
        tips_available: false,
        unavailable: true,
      },
      {
        id: 1,
        meta: { type: "full-time" },
        position: "Software Engineer",
        city: "San Francisco",
        state: "CA",
        featuresList: ["Remote", "Healthcare"],
        hourly_rate: 50,
        tips_available: false,
        unavailable: false,
      },
      {
        id: 2,
        meta: { type: "part-time" },
        position: "Data Analyst",
        city: "New York",
        state: "NY",
        featuresList: ["Flexible hours", "401k"],
        hourly_rate: 40,
        tips_available: true,
        unavailable: false,
      },
      {
        id: 3,
        meta: { type: "internship" },
        position: "Marketing Intern",
        city: "Los Angeles",
        state: "CA",
        featuresList: ["Paid internship", "Mentorship", "Remote command"],
        hourly_rate: 20,
        tips_available: false,
        unavailable: true,
      },
      {
        id: 4,
        meta: { type: "full-time" },
        position: "Software Engineer",
        city: "San Francisco",
        state: "CA",
        featuresList: ["Remote", "Healthcare"],
        hourly_rate: 50,
        tips_available: false,
        unavailable: false,
      },
      {
        id: 5,
        meta: { type: "part-time" },
        position: "Data Analyst",
        city: "New York",
        state: "NY",
        featuresList: ["Flexible hours", "401k"],
        hourly_rate: 40,
        tips_available: true,
        unavailable: false,
      },
      {
        id: 6,
        meta: { type: "internship" },
        position: "Marketing Intern",
        city: "Los Angeles",
        state: "CA",
        featuresList: ["Paid internship", "Mentorship", "Remote command"],
        hourly_rate: 20,
        tips_available: false,
        unavailable: true,
      },
      {
        id: 7,
        meta: { type: "full-time" },
        position: "Software Engineer",
        city: "San Francisco",
        state: "CA",
        featuresList: ["Remote", "Healthcare"],
        hourly_rate: 50,
        tips_available: false,
        unavailable: false,
      },
      {
        id: 8,
        meta: { type: "part-time" },
        position: "Data Analyst",
        city: "New York",
        state: "NY",
        featuresList: ["Flexible hours", "401k"],
        hourly_rate: 40,
        tips_available: true,
        unavailable: false,
      },
      {
        id: 9,
        meta: { type: "internship" },
        position: "Marketing Intern",
        city: "Los Angeles",
        state: "CA",
        featuresList: ["Paid internship", "Mentorship", "Remote command"],
        hourly_rate: 20,
        tips_available: false,
        unavailable: true,
      },
    ],
  };
}
