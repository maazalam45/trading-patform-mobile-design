import { useState } from "react";
import { X, Eye, TrendingUp } from "lucide-react";

interface NewsTrade {
  id: string;
  symbol: string;
  newsEvent: string;
  tradeType: "Buy" | "Sell";
  entryPrice: number;
  startingPrice: number;
  currentPrice: number;
  volume: number;
  pipDifference: number;
  status: "Open" | "Closed";
  openTime: string;
}

const newsTradesData: NewsTrade[] = [
  {
    id: "1",
    symbol: "USD/JPY",
    newsEvent: "Fed Interest Rate Decision",
    tradeType: "Buy",
    entryPrice: 145.20,
    startingPrice: 145.00,
    currentPrice: 145.45,
    volume: 10000,
    pipDifference: 25,
    status: "Open",
    openTime: "2026-03-12 13:00:00",
  },
  {
    id: "2",
    symbol: "EUR/USD",
    newsEvent: "ECB Press Conference",
    tradeType: "Sell",
    entryPrice: 1.0920,
    startingPrice: 1.0900,
    currentPrice: 1.0890,
    volume: 100000,
    pipDifference: 30,
    status: "Open",
    openTime: "2026-03-11 12:45:00",
  },
  {
    id: "3",
    symbol: "GBP/USD",
    newsEvent: "UK Inflation Report",
    tradeType: "Buy",
    entryPrice: 1.2680,
    startingPrice: 1.2650,
    currentPrice: 1.2720,
    volume: 50000,
    pipDifference: 40,
    status: "Open",
    openTime: "2026-03-10 08:00:00",
  },
];

export default function NewsTrades() {
  const [trades, setTrades] = useState(newsTradesData);

  const closeTrade = (id: string) => {
    setTrades(trades.filter((trade) => trade.id !== id));
  };

  const openTrades = trades.filter((t) => t.status === "Open").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">News Trades</h1>
        <p className="text-muted-foreground mt-1">
          Trading positions opened on major economic news events
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm font-medium mb-2">
            Open News Trades
          </p>
          <p className="text-3xl font-bold text-foreground">{openTrades}</p>
        </div>
        <div className="bg-white border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm font-medium mb-2">
            Total Pips Gained
          </p>
          <p className="text-3xl font-bold text-green-600">
            {trades.reduce((sum, t) => sum + t.pipDifference, 0)}
          </p>
        </div>
        <div className="bg-white border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm font-medium mb-2">
            Avg Pips Per Trade
          </p>
          <p className="text-3xl font-bold text-foreground">
            {trades.length > 0
              ? (trades.reduce((sum, t) => sum + t.pipDifference, 0) / trades.length).toFixed(0)
              : 0}
          </p>
        </div>
      </div>

      {/* News Trades Table */}
      <div className="bg-white border border-border rounded-xl p-6 overflow-x-auto">
        <h2 className="text-xl font-bold text-foreground mb-4">Active News Trades</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Symbol
              </th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                News Event
              </th>
              <th className="text-center py-3 px-2 font-semibold text-foreground">
                Type
              </th>
              <th className="text-center py-3 px-2 font-semibold text-foreground">
                Entry Price
              </th>
              <th className="text-center py-3 px-2 font-semibold text-foreground">
                Starting Price
              </th>
              <th className="text-center py-3 px-2 font-semibold text-foreground">
                Current
              </th>
              <th className="text-center py-3 px-2 font-semibold text-foreground">
                Pip Diff
              </th>
              <th className="text-center py-3 px-2 font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <td className="py-4 px-2 text-foreground font-semibold">
                  {trade.symbol}
                </td>
                <td className="py-4 px-2 text-foreground text-xs">
                  <div className="max-w-xs truncate">{trade.newsEvent}</div>
                </td>
                <td className="py-4 px-2 text-center">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      trade.tradeType === "Buy"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {trade.tradeType}
                  </span>
                </td>
                <td className="py-4 px-2 text-center text-foreground">
                  {trade.entryPrice.toFixed(4)}
                </td>
                <td className="py-4 px-2 text-center text-muted-foreground">
                  {trade.startingPrice.toFixed(4)}
                </td>
                <td className="py-4 px-2 text-center text-foreground font-semibold">
                  {trade.currentPrice.toFixed(4)}
                </td>
                <td className={`py-4 px-2 text-center font-semibold ${trade.pipDifference >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {trade.pipDifference >= 0 ? "+" : ""}
                  {trade.pipDifference}
                </td>
                <td className="py-4 px-2 text-center">
                  <div className="flex gap-2 justify-center">
                    <button className="p-2 hover:bg-muted rounded transition-colors">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => closeTrade(trade.id)}
                      className="p-2 hover:bg-red-50 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {trades.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-semibold mb-2">No News Trades</p>
          <p className="text-muted-foreground">
            Open a new trade on the next major economic event
          </p>
        </div>
      )}
    </div>
  );
}
