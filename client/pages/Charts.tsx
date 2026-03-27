import { useState } from "react";
import { TrendingUp, BarChart3, Settings } from "lucide-react";

interface ChartData {
  symbol: string;
  timeframe: "1M" | "5M" | "15M" | "1H" | "4H" | "1D";
  high: number;
  low: number;
  open: number;
  close: number;
  volume: string;
}

const chartSymbols = [
  "EUR/USD",
  "GBP/USD",
  "USD/JPY",
  "AUD/USD",
  "XAU/USD",
  "WTI",
];

const timeframes = ["1M", "5M", "15M", "1H", "4H", "1D"] as const;

export default function Charts() {
  const [selectedSymbol, setSelectedSymbol] = useState("EUR/USD");
  const [selectedTimeframe, setSelectedTimeframe] = useState<"1H">("1H");

  // Mock chart data
  const chartData: ChartData = {
    symbol: selectedSymbol,
    timeframe: selectedTimeframe,
    high: 1.0950,
    low: 1.0820,
    open: 1.0850,
    close: 1.0920,
    volume: "2.5B",
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Charts
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Technical analysis and price charts
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white border border-border rounded-lg md:rounded-xl p-4 md:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Symbol
            </label>
            <select
              value={selectedSymbol}
              onChange={(e) => setSelectedSymbol(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              {chartSymbols.map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Timeframe
            </label>
            <select
              value={selectedTimeframe}
              onChange={(e) =>
                setSelectedTimeframe(e.target.value as typeof selectedTimeframe)
              }
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              {timeframes.map((tf) => (
                <option key={tf} value={tf}>
                  {tf}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
                selectedTimeframe === tf
                  ? "bg-primary text-primary-foreground"
                  : "border border-border hover:bg-muted"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="bg-white border border-border rounded-lg md:rounded-xl p-4 md:p-6">
        <div className="bg-muted/50 rounded-lg p-8 md:p-12 flex flex-col items-center justify-center min-h-96">
          <BarChart3 className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mb-4" />
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
            Interactive Chart
          </h3>
          <p className="text-sm md:text-base text-muted-foreground text-center max-w-md">
            Advanced charting for {selectedSymbol} on {selectedTimeframe} timeframe.
            Chart display will be integrated with real trading data.
          </p>
        </div>
      </div>

      {/* Chart Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">
            Opening Price
          </p>
          <p className="text-xl md:text-2xl font-bold text-foreground">
            {chartData.open.toFixed(4)}
          </p>
        </div>
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">
            Closing Price
          </p>
          <p className="text-xl md:text-2xl font-bold text-green-600">
            {chartData.close.toFixed(4)}
          </p>
        </div>
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">
            High/Low
          </p>
          <p className="text-sm md:text-base font-semibold text-foreground">
            {chartData.high.toFixed(4)} / {chartData.low.toFixed(4)}
          </p>
        </div>
      </div>

      {/* Technical Indicators */}
      <div className="bg-white border border-border rounded-lg md:rounded-xl p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-foreground">
            Technical Indicators
          </h2>
          <button className="p-2 hover:bg-muted rounded transition-colors">
            <Settings className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "RSI (14)", value: "65.23" },
            { name: "MACD", value: "Bullish" },
            { name: "Moving Average (50)", value: "1.0850" },
            { name: "Bollinger Bands", value: "Mid Range" },
          ].map((indicator) => (
            <div
              key={indicator.name}
              className="border border-border rounded-lg p-4"
            >
              <p className="text-xs md:text-sm text-muted-foreground mb-2">
                {indicator.name}
              </p>
              <p className="text-lg md:text-xl font-semibold text-foreground">
                {indicator.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
