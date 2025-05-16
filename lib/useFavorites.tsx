import { useState } from "react";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();
const FAVORITES_KEY = "favorites";

const getFavoriteIds = () => {
  const value = storage.getString(FAVORITES_KEY);
  return value ? JSON.parse(value) : [];
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(getFavoriteIds());

  const addFavorite = (id: string) => {
    const newFavorites = Array.from(new Set([...favorites, id]));
    storage.set(FAVORITES_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites); // trigger re-render
  };

  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter((favId: string) => favId !== id);
    storage.set(FAVORITES_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites); // trigger re-render
  };

  const isFavoriteId = (id: string) => favorites.includes(id);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavoriteId,
  };
};
