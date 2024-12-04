import { useState, useEffect } from "react";

const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    // Load from localStorage on mount
    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecentSearches(storedSearches);
  }, []);

  const addSearch = (query: string) => {
    if (!query) return;
    const updatedSearches = [
      query,
      ...recentSearches.filter((q) => q !== query),
    ].slice(0, 10);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  return { recentSearches, addSearch };
};

export default useRecentSearches;
