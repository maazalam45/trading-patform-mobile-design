import { useState } from "react";
import { Edit, X, Clock } from "lucide-react";

interface PendingTrade {
  id: string;
  symbol: string;
  type: "Buy" | "Sell";
  volume: number;
  orderPrice: number;
  currentPrice: number;
  sl: number;
  tp: number;
  expiryTime: string;
  createdTime: string;
  orderType: "Limit" | "Stop";
}

const pendingTrades: PendingTrade[] = [
  {
    id: "1",
    symbol: "EUR/USD",
    type: "Buy",
    volume: 100000,
    orderPrice: 1.0800,
    currentPrice: 1.0850,
    sl: 1.0750,
    tp: 1.0950,
    expiryTime: "2026-03-15 23:59:59",
    createdTime: "2026-03-12 10:30:00",
    orderType: "Limit",
  },
  {
    id: "2",
    symbol: "GBP/USD",
    type: "Sell",
    volume: 50000,
    orderPrice: 1.2750,
    currentPrice: 1.2680,
    sl: 1.2800,
    tp: 1.2600,
    expiryTime: "2026-03-16 23:59:59",
    createdTime: "2026-03-11 14:15:00",
    orderType: "Stop",
  },
  {
    id: "3",
    symbol: "USD/JPY",
    type: "Buy",
    volume: 10000,
    orderPrice: 146.00,
    currentPrice: 145.30,
    sl: 145.50,
    tp: 147.00,
    expiryTime: "2026-03-17 23:59:59",
    createdTime: "2026-03-10 09:45:00",
    orderType: "Limit",
  },
];

export default function PendingTrades() {
  const [trades, setTrades] = useState(pendingTrades);

  const cancelTrade = (id: string) => {
    setTrades(trades.filter((trade) => trade.id !== id));
  };

  const limitOrders = trades.filter((t) => t.orderType === "Limit").length;
  const stopOrders = trades.filter((t) => t.orderType === "Stop").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pending Trades</h1>
        <p className="text-muted-foreground mt-1">
          Manage your pending orders and limit orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm font-medium mb-2">
            Total Pending
          </p>
          <p className="text-3xl font-bold text-foreground">{trades.length}</p>
        </div>
        <div className="bg-white border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm font-medium mb-2">
            Limit Orders
          </p>
          <p className="text-3xl font-bold text-blue-600">{limitOrders}</p>
        </div>
        <div className="bg-white border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm font-medium mb-2">
            Stop Orders
          </p>
          <p className="text-3xl font-bold text-orange-600">{stopOrders}</p>
        </div>
      </div>

      {/* Pending Trades Table */}
      <div className="bg-white border border-border rounded-xl p-6 overflow-x-auto">
        <h2 className="text-xl font-bold text-foreground mb-4">
          Pending Orders
        </h2>
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
                Order Type
              </th>
              <th className="text-center py-3 px-2 font-semibold text-foreground">
                Volume
              </th>
              <th className="text-center py-3 px-2 font-semibold text-foreground">
                Order Price
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
              <th className="text-center py-3 px-2 font-semibold text-foreground">
                Expires
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
                <td className="py-4 px-2 text-center">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      trade.orderType === "Limit"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {trade.orderType}
                  </span>
                </td>
                <td className="py-4 px-2 text-center text-foreground">
                  {trade.volume.toLocaleString()}
                </td>
                <td className="py-4 px-2 text-center text-foreground font-semibold">
                  {trade.orderPrice.toFixed(4)}
                </td>
                <td className="py-4 px-2 text-center text-foreground">
                  {trade.currentPrice.toFixed(4)}
                </td>
                <td className="py-4 px-2 text-center text-foreground">
                  {trade.sl.toFixed(4)}
                </td>
                <td className="py-4 px-2 text-center text-foreground">
                  {trade.tp.toFixed(4)}
                </td>
                <td className="py-4 px-2 text-center text-foreground text-xs">
                  {trade.expiryTime}
                </td>
                <td className="py-4 px-2 text-center">
                  <div className="flex gap-2 justify-center">
                    <button className="p-2 hover:bg-muted rounded transition-colors">
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => cancelTrade(trade.id)}
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
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-semibold mb-2">No Pending Orders</p>
          <p className="text-muted-foreground">Create a new pending order</p>
        </div>
      )}
    </div>
  );
}
