import React, { useMemo } from "react";
import CandlestickChart from "./components/CandlestickChart";
import useEthereumMarket from "./hooks/useEthereumMarket";
import useEthereumOhlc from "./hooks/useEthereumOhlc";

function App() {
  const market = useEthereumMarket();
  const ohlcData = useEthereumOhlc(30);

  const series = useMemo(() => {
    return [
      {
        data: ohlcData.map((ohlc) => ({
          x: new Date(ohlc.timestamp),
          y: [ohlc.open, ohlc.high, ohlc.low, ohlc.close],
        })),
      },
    ];
  }, [ohlcData]);

  if (!market || ohlcData.length === 0) {
    return <></>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="text-lg font-bold">ETH/USD (4h)</div>
      <div className="my-2 text-sm">
        <p>
          Price: <b>${market?.current_price}</b>
        </p>
        <p>
          24h Change:{" "}
          <b>
            ${market?.price_change_24h.toFixed(2)}{" "}
            {market?.price_change_percentage_24h.toFixed(2)}%
          </b>
        </p>
        <p>
          24h High: <b>${market?.high_24h}</b>
        </p>
        <p>
          24h Low: <b>${market?.low_24h}</b>
        </p>
      </div>
      <div className="h-[350px]">
        <CandlestickChart series={series} />
      </div>
    </div>
  );
}

export default App;
