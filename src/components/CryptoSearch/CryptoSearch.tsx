import { Input, Button, HStack } from "@chakra-ui/react";
import { useState } from "react";

const CryptoSearch = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <HStack mb="12px">
      <Input
        placeholder="Search Cryptocurrency"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button colorScheme="blue" onClick={() => onSearch(query)}>
        Search
      </Button>
    </HStack>
  );
};

export default CryptoSearch;
