import { useEffect, useState } from "react";
import { Market } from "../types";

export default function useCoingeckoOhlc() {
  const [market, setMarket] = useState<Market>();

  useEffect(() => {
    const fetchOhlc = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum`
      );
      const data = await response.json();

      setMarket(data[0]);
    };
    fetchOhlc();
  }, []);

  return market;
}
