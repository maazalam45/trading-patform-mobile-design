import { useState } from "react";
import { Edit, X, TrendingUp, Lock } from "lucide-react";

interface Trade {
  id: string;
  symbol: string;
  type: "Buy" | "Sell";
  volume: number;
  entryPrice: number;
  currentPrice: number;
  sl: number;
  tp: number;
  profit: number;
  profitPercent: number;
  openTime: string;
  status: "Open" | "Pending";
}

const activeTrades: Trade[] = [
  {
    id: "1",
    symbol: "EUR/USD",
    type: "Buy",
    volume: 100000,
    entryPrice: 1.0800,
    currentPrice: 1.0850,
    sl: 1.0750,
    tp: 1.0950,
    profit: 500,
    profitPercent: 0.46,
    openTime: "2026-03-12 10:30:00",
    status: "Open",
  },
  {
    id: "2",
    symbol: "GBP/USD",
    type: "Sell",
    volume: 50000,
    entryPrice: 1.2700,
    currentPrice: 1.2680,
    sl: 1.2750,
    tp: 1.2600,
    profit: 1000,
    profitPercent: 0.79,
    openTime: "2026-03-11 14:15:00",
    status: "Open",
  },
  {
    id: "3",
    symbol: "USD/JPY",
    type: "Buy",
    volume: 10000,
    entryPrice: 145.00,
    currentPrice: 145.30,
    sl: 144.50,
    tp: 146.00,
    profit: 300,
    profitPercent: 0.21,
    openTime: "2026-03-10 09:45:00",
    status: "Open",
  },
];

export default function Trades() {
  const [trades, setTrades] = useState(activeTrades);
  const [editingTrade, setEditingTrade] = useState<string | null>(null);

  const closeTrade = (id: string) => {
    setTrades(trades.filter((trade) => trade.id !== id));
  };

  const totalProfit = trades.reduce((sum, trade) => sum + trade.profit, 0);
  const openTradesCount = trades.filter((t) => t.status === "Open").length;

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Active Trades</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Manage your open positions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-white border border-border rounded-lg md:rounded-xl p-4 md:p-6">
          <p className="text-muted-foreground text-xs md:text-sm font-medium mb-2">
            Open Trades
          </p>
          <p className="text-2xl md:text-3xl font-bold text-foreground">{openTradesCount}</p>
        </div>
        <div className="bg-white border border-border rounded-lg md:rounded-xl p-4 md:p-6">
          <p className="text-muted-foreground text-xs md:text-sm font-medium mb-2">
            Total P/L
          </p>
          <p
            className={`text-2xl md:text-3xl font-bold ${
              totalProfit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${totalProfit.toLocaleString()}
          </p>
        </div>
        <div className="bg-white border border-border rounded-lg md:rounded-xl p-4 md:p-6">
          <p className="text-muted-foreground text-xs md:text-sm font-medium mb-2">
            Avg P/L
          </p>
          <p className="text-2xl md:text-3xl font-bold text-foreground">
            {trades.length > 0 ? (totalProfit / trades.length).toFixed(0) : 0}
          </p>
        </div>
      </div>

      {/* Trades Table */}
      <div className="bg-white border border-border rounded-lg md:rounded-xl p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">Positions</h2>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {trades.map((trade) => (
            <div key={trade.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground">{trade.symbol}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${trade.type === "Buy" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}>
                  {trade.type}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Entry</p>
                  <p className="font-semibold text-foreground">{trade.entryPrice.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Current</p>
                  <p className="font-semibold text-foreground">{trade.currentPrice.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">S/L</p>
                  <p className="font-semibold text-foreground">{trade.sl.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">T/P</p>
                  <p className="font-semibold text-foreground">{trade.tp.toFixed(4)}</p>
                </div>
              </div>
              <div className={`text-sm font-semibold ${trade.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                P/L: ${trade.profit.toLocaleString()} ({trade.profitPercent >= 0 ? "+" : ""}{trade.profitPercent.toFixed(2)}%)
              </div>
              <div className="flex gap-2 pt-2 border-t border-border">
                <button className="flex-1 text-accent font-medium text-xs hover:underline">Edit</button>
                <button className="flex-1 text-red-500 font-medium text-xs hover:underline">Close</button>
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
                  Type
                </th>
                <th className="text-center py-3 px-2 font-semibold text-foreground">
                  Volume
                </th>
                <th className="text-center py-3 px-2 font-semibold text-foreground">
                  Entry
                </th>
                <th className="text-center py-3 px-2 font-semibold text-foreground">
                  Current
                </th>
                <th className="text-center py-3 px-2 font-semibold text-foreground">
                  S/L
                </th>
                <th className="text-center py-3 px-2 font-semibold text-foreground">
                  T/P
                </th>
                <th className="text-right py-3 px-2 font-semibold text-foreground">
                  P/L
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
                  <td className="py-4 px-2 text-center">
                    <span
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        trade.type === "Buy"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {trade.type}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center text-foreground">
                    {trade.volume.toLocaleString()}
                  </td>
                  <td className="py-4 px-2 text-center text-foreground">
                    {trade.entryPrice.toFixed(4)}
                  </td>
                  <td className="py-4 px-2 text-center text-foreground font-semibold">
                    {trade.currentPrice.toFixed(4)}
                  </td>
                  <td className="py-4 px-2 text-center text-foreground">
                    {trade.sl.toFixed(4)}
                  </td>
                  <td className="py-4 px-2 text-center text-foreground">
                    {trade.tp.toFixed(4)}
                  </td>
                  <td
                    className={`py-4 px-2 text-right font-semibold ${
                      trade.profit >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ${trade.profit.toLocaleString()} ({trade.profitPercent >= 0 ? "+" : ""}{trade.profitPercent.toFixed(2)}%)
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => setEditingTrade(trade.id)}
                        className="p-2 hover:bg-muted rounded transition-colors"
                      >
                        <Edit className="w-4 h-4 text-muted-foreground" />
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
      </div>

      {trades.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-semibold mb-2">No Active Trades</p>
          <p className="text-muted-foreground">Open a new trade to get started</p>
        </div>
      )}
    </div>
  );
}
