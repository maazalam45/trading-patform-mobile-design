import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Plus, Eye } from "lucide-react";

interface MarketPrice {
  id: string;
  symbol: string;
  bid: number;
  ask: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
}

const initialMarketData: MarketPrice[] = [
  {
    id: "1",
    symbol: "EUR/USD",
    bid: 1.0850,
    ask: 1.0852,
    change: 0.0045,
    changePercent: 0.41,
    high: 1.0920,
    low: 1.0820,
    volume: "2.5B",
  },
  {
    id: "2",
    symbol: "GBP/USD",
    bid: 1.2650,
    ask: 1.2652,
    change: -0.0025,
    changePercent: -0.20,
    high: 1.2750,
    low: 1.2600,
    volume: "1.8B",
  },
  {
    id: "3",
    symbol: "USD/JPY",
    bid: 145.30,
    ask: 145.32,
    change: 0.85,
    changePercent: 0.59,
    high: 145.50,
    low: 144.20,
    volume: "3.2B",
  },
  {
    id: "4",
    symbol: "AUD/USD",
    bid: 0.6750,
    ask: 0.6752,
    change: 0.0050,
    changePercent: 0.74,
    high: 0.6800,
    low: 0.6700,
    volume: "900M",
  },
  {
    id: "5",
    symbol: "XAU/USD",
    bid: 2050.50,
    ask: 2051.00,
    change: 15.50,
    changePercent: 0.76,
    high: 2055.00,
    low: 2030.00,
    volume: "250K",
  },
  {
    id: "6",
    symbol: "WTI",
    bid: 78.45,
    ask: 78.50,
    change: -0.55,
    changePercent: -0.70,
    high: 79.50,
    low: 77.80,
    volume: "2.1M",
  },
];

export default function MarketWatch() {
  const [prices, setPrices] = useState(initialMarketData);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([
    "1",
    "2",
  ]);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prevPrices) =>
        prevPrices.map((price) => ({
          ...price,
          bid: price.bid + (Math.random() - 0.5) * 0.001,
          ask: price.ask + (Math.random() - 0.5) * 0.001,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleAddInstrument = (id: string) => {
    if (!selectedInstruments.includes(id)) {
      setSelectedInstruments([...selectedInstruments, id]);
    }
  };

  const handleRemoveInstrument = (id: string) => {
    setSelectedInstruments(selectedInstruments.filter((item) => item !== id));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Market Watch</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Real-time market prices and updates
        </p>
      </div>

      {/* Watched Instruments */}
      <div className="bg-white border border-border rounded-xl p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">
          Watched Instruments
        </h2>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {prices
            .filter((price) => selectedInstruments.includes(price.id))
            .map((price) => (
              <div
                key={price.id}
                className="border border-border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">
                    {price.symbol}
                  </h3>
                  <button
                    onClick={() => handleRemoveInstrument(price.id)}
                    className="text-red-500 hover:text-red-600 font-medium text-xs bg-red-50 px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Bid</p>
                    <p className="font-semibold text-foreground">{price.bid.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Ask</p>
                    <p className="font-semibold text-foreground">{price.ask.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">High</p>
                    <p className="font-semibold text-foreground">{price.high.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Low</p>
                    <p className="font-semibold text-foreground">{price.low.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Volume</p>
                    <p className="font-semibold text-foreground">{price.volume}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Change</p>
                    <div
                      className={`flex items-center gap-1 font-semibold text-sm ${
                        price.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {price.change >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {price.change >= 0 ? "+" : ""}
                      {price.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-semibold text-foreground">
                  Symbol
                </th>
                <th className="text-center py-3 px-2 font-semibold text-foreground">
                  Bid
                </th>
                <th className="text-center py-3 px-2 font-semibold text-foreground">
                  Ask
                </th>
                <th className="text-center py-3 px-2 font-semibold text-foreground">
                  Change
                </th>
                <th className="text-center py-3 px-2 font-semibold text-foreground">
                  High
                </th>
                <th className="text-center py-3 px-2 font-semibold text-foreground">
                  Low
                </th>
                <th className="text-center py-3 px-2 font-semibold text-foreground">
                  Volume
                </th>
                <th className="text-center py-3 px-2 font-semibold text-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {prices
                .filter((price) => selectedInstruments.includes(price.id))
                .map((price) => (
                  <tr
                    key={price.id}
                    className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-2 text-foreground font-semibold">
                      {price.symbol}
                    </td>
                    <td className="py-4 px-2 text-center text-foreground">
                      {price.bid.toFixed(4)}
                    </td>
                    <td className="py-4 px-2 text-center text-foreground">
                      {price.ask.toFixed(4)}
                    </td>
                    <td className="py-4 px-2 text-center">
                      <div
                        className={`flex items-center justify-center gap-1 font-semibold ${
                          price.change >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {price.change >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {price.change >= 0 ? "+" : ""}
                        {price.change.toFixed(4)} ({price.changePercent.toFixed(2)}%)
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center text-foreground">
                      {price.high.toFixed(4)}
                    </td>
                    <td className="py-4 px-2 text-center text-foreground">
                      {price.low.toFixed(4)}
                    </td>
                    <td className="py-4 px-2 text-center text-foreground">
                      {price.volume}
                    </td>
                    <td className="py-4 px-2 text-center">
                      <button
                        onClick={() => handleRemoveInstrument(price.id)}
                        className="text-red-500 hover:text-red-600 font-medium text-xs"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Instruments */}
      <div className="bg-white border border-border rounded-xl p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">
          Available Instruments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {prices.map((price) =>
            !selectedInstruments.includes(price.id) ? (
              <button
                key={price.id}
                onClick={() => handleAddInstrument(price.id)}
                className="p-3 md:p-4 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-foreground text-sm md:text-base">
                    {price.symbol}
                  </span>
                  <Plus className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mt-2">
                  Bid: {price.bid.toFixed(4)} | Ask: {price.ask.toFixed(4)}
                </p>
              </button>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
