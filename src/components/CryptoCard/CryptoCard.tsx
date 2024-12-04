import React from "react";
import { Box, Text, Badge, Flex, Image, VStack } from "@chakra-ui/react";

interface CryptoCardProps {
  data: any;
  currency: string;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ data, currency }) => {
  const {
    name,
    symbol,
    current_price: price,
    market_cap: marketCap,
    image: imageUrl,
  } = data;
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={4}
      bg="white"
      _dark={{ bg: "gray.800" }}
    >
      <Flex align="center" mb={4}>
        <Image
          src={imageUrl}
          alt={`${name} logo`}
          boxSize="50px"
          borderRadius="full"
          mr={4}
        />
        <VStack align="start">
          <Text fontWeight="bold" fontSize="lg">
            {name}{" "}
            <Badge ml={1} colorScheme="teal">
              {symbol.toUpperCase()}
            </Badge>
          </Text>
        </VStack>
      </Flex>

      <Text fontSize="sm" color="gray.500">
        Current Price ({currency}):
      </Text>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency,
        }).format(price)}
      </Text>

      <Text fontSize="sm" color="gray.500">
        Market Cap ({currency.toUpperCase()}):
      </Text>
      <Text fontSize="lg" fontWeight="semibold">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency,
          notation: "compact",
        }).format(marketCap)}
      </Text>
    </Box>
  );
};

export default CryptoCard;
