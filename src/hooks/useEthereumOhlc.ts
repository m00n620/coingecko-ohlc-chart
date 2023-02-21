import { useEffect, useState } from "react";
import { Ohlc } from "../types";

export default function useEthereumOhlc(days = 30) {
  const [ohlcData, setOhlcData] = useState<Ohlc[]>([]);

  useEffect(() => {
    const fetchOhlc = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=${days}`
      );
      const data = await response.json();
      const ohlcData = data.map((price: number[]) => ({
        timestamp: price[0],
        open: price[1],
        high: price[2],
        low: price[3],
        close: price[4],
      }));
      setOhlcData(ohlcData);
    };
    fetchOhlc();
  }, [days]);

  return ohlcData;
}
