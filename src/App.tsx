import { useEffect, useState } from "react";
import { Box, Grid, Heading, Spinner } from "@chakra-ui/react";
import CryptoSearch from "./components/CryptoSearch/CryptoSearch";
import CryptoCard from "./components/CryptoCard/CryptoCard";
import CurrencySelect from "./components/CurrencyDropdown/CurrencyDropdown";
import apiClient from "./utils/appClients";
import useRecentSearches from "./hooks/recentSearch";

const App = () => {
  const [currency, setCurrency] = useState("USD");
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { recentSearches, addSearch } = useRecentSearches();

  const fetchCryptos = async (query: string) => {
    try {
      setError(null);
      setLoading(true);
      addSearch(query);
      const response = await apiClient.get(`/coins/markets`, {
        params: {
          vs_currency: currency,
          ids: query,
          order: "market_cap_desc",
          per_page: 50,
        },
      });
      setCryptoData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch cryptocurrency data. Please try again.");
      setCryptoData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos("");
  }, [currency]);

  return (
    <Box p={5}>
      <CurrencySelect onChange={setCurrency} />
      <CryptoSearch onSearch={fetchCryptos} />
      {error && <Box color="red.500">{error}</Box>}
      {!error && !loading && cryptoData.length === 0 && (
        <Box>No cryptocurrencies found for your search.</Box>
      )}

      {recentSearches.length > 0 && (
        <Box mt={8}>
          <Heading size="md" mb={4}>
            Recently Searched
          </Heading>
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6} mb="12px">
            {recentSearches.map((query, index) => (
              <Box
                key={index}
                p={4}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
                cursor="pointer"
                onClick={() => fetchCryptos(query)}
              >
                {query}
              </Box>
            ))}
          </Grid>
        </Box>
      )}
      {loading ? (
        <Box>
          <Spinner />
        </Box>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
          {cryptoData.map((crypto) => (
            <CryptoCard key={crypto.id} data={crypto} currency={currency} />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default App;
