import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface OrderLevel {
  price: number;
  size: number;
  total: number;
}

const bidOrders: OrderLevel[] = [
  { price: 1.0850, size: 5000000, total: 5000000 },
  { price: 1.0849, size: 3500000, total: 8500000 },
  { price: 1.0848, size: 2800000, total: 11300000 },
  { price: 1.0847, size: 4200000, total: 15500000 },
  { price: 1.0846, size: 3100000, total: 18600000 },
];

const askOrders: OrderLevel[] = [
  { price: 1.0851, size: 5500000, total: 5500000 },
  { price: 1.0852, size: 4000000, total: 9500000 },
  { price: 1.0853, size: 3200000, total: 12700000 },
  { price: 1.0854, size: 4800000, total: 17500000 },
  { price: 1.0855, size: 2900000, total: 20400000 },
];

export default function DepthOfMarket() {
  const [selectedSymbol, setSelectedSymbol] = useState("EUR/USD");
  const symbols = ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD"];

  const midPrice = 1.0850;
  const spread = 0.0001;

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Depth of Market
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Order book and market depth analysis
        </p>
      </div>

      {/* Symbol Selector */}
      <div className="bg-white border border-border rounded-lg md:rounded-xl p-4 md:p-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Select Symbol
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {symbols.map((symbol) => (
            <button
              key={symbol}
              onClick={() => setSelectedSymbol(symbol)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedSymbol === symbol
                  ? "bg-primary text-primary-foreground"
                  : "border border-border hover:bg-muted"
              }`}
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Market Depth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Bid Side */}
        <div className="bg-white border border-border rounded-lg md:rounded-xl p-4 md:p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Bid Orders
          </h2>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-2">
            {bidOrders.map((order, idx) => (
              <div
                key={idx}
                className="border border-border rounded p-3 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-foreground">
                    {order.price.toFixed(4)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {(order.size / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="w-full bg-muted rounded h-2">
                  <div
                    className="bg-green-500 h-full rounded"
                    style={{
                      width: `${(order.total / 20400000) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Total: {(order.total / 1000000).toFixed(1)}M
                </p>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-semibold text-foreground">
                    Price
                  </th>
                  <th className="text-right py-2 px-2 font-semibold text-foreground">
                    Size
                  </th>
                  <th className="text-right py-2 px-2 font-semibold text-foreground">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {bidOrders.map((order, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted">
                    <td className="py-2 px-2 text-green-600 font-semibold">
                      {order.price.toFixed(4)}
                    </td>
                    <td className="py-2 px-2 text-right text-foreground">
                      {(order.size / 1000000).toFixed(1)}M
                    </td>
                    <td className="py-2 px-2 text-right text-foreground">
                      {(order.total / 1000000).toFixed(1)}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ask Side */}
        <div className="bg-white border border-border rounded-lg md:rounded-xl p-4 md:p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            Ask Orders
          </h2>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-2">
            {askOrders.map((order, idx) => (
              <div
                key={idx}
                className="border border-border rounded p-3 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-foreground">
                    {order.price.toFixed(4)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {(order.size / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="w-full bg-muted rounded h-2">
                  <div
                    className="bg-red-500 h-full rounded"
                    style={{
                      width: `${(order.total / 20400000) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Total: {(order.total / 1000000).toFixed(1)}M
                </p>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-semibold text-foreground">
                    Price
                  </th>
                  <th className="text-right py-2 px-2 font-semibold text-foreground">
                    Size
                  </th>
                  <th className="text-right py-2 px-2 font-semibold text-foreground">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {askOrders.map((order, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted">
                    <td className="py-2 px-2 text-red-600 font-semibold">
                      {order.price.toFixed(4)}
                    </td>
                    <td className="py-2 px-2 text-right text-foreground">
                      {(order.size / 1000000).toFixed(1)}M
                    </td>
                    <td className="py-2 px-2 text-right text-foreground">
                      {(order.total / 1000000).toFixed(1)}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Market Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-2">
            Mid Price
          </p>
          <p className="text-xl md:text-2xl font-bold text-foreground">
            {midPrice.toFixed(4)}
          </p>
        </div>
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-2">Spread</p>
          <p className="text-xl md:text-2xl font-bold text-foreground">
            {spread.toFixed(4)}
          </p>
        </div>
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-2">
            Total Volume
          </p>
          <p className="text-xl md:text-2xl font-bold text-foreground">
            40.8M
          </p>
        </div>
      </div>
    </div>
  );
}
