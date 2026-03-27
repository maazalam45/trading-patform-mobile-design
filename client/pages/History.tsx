import { useState } from "react";
import { Download, Filter, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface HistoryEntry {
  id: string;
  date: string;
  symbol: string;
  type: "Buy" | "Sell";
  entryPrice: number;
  exitPrice: number;
  volume: number;
  profit: number;
  duration: string;
}

const historyData: HistoryEntry[] = [
  {
    id: "1",
    date: "2026-03-12 15:30:00",
    symbol: "EUR/USD",
    type: "Buy",
    entryPrice: 1.0800,
    exitPrice: 1.0850,
    volume: 100000,
    profit: 500,
    duration: "5h 30m",
  },
  {
    id: "2",
    date: "2026-03-11 10:15:00",
    symbol: "GBP/USD",
    type: "Sell",
    entryPrice: 1.2700,
    exitPrice: 1.2680,
    volume: 50000,
    profit: 1000,
    duration: "28h 15m",
  },
  {
    id: "3",
    date: "2026-03-10 16:45:00",
    symbol: "USD/JPY",
    type: "Buy",
    entryPrice: 145.00,
    exitPrice: 144.80,
    volume: 10000,
    profit: -200,
    duration: "2h 45m",
  },
  {
    id: "4",
    date: "2026-03-09 09:20:00",
    symbol: "AUD/USD",
    type: "Buy",
    entryPrice: 0.6750,
    exitPrice: 0.6850,
    volume: 200000,
    profit: 20000,
    duration: "1d 6h",
  },
  {
    id: "5",
    date: "2026-03-08 14:00:00",
    symbol: "XAU/USD",
    type: "Sell",
    entryPrice: 2055.00,
    exitPrice: 2050.00,
    volume: 100,
    profit: 500,
    duration: "3h 20m",
  },
];

export default function History() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "profit" | "symbol">("date");
  const [filterType, setFilterType] = useState<"All" | "Buy" | "Sell">("All");
  const itemsPerPage = 10;

  let filtered = historyData.filter((entry) => {
    const matchesSearch = entry.symbol
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || entry.type === filterType;
    return matchesSearch && matchesType;
  });

  // Sort
  filtered = filtered.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "profit") {
      return b.profit - a.profit;
    } else {
      return a.symbol.localeCompare(b.symbol);
    }
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalProfit = filtered.reduce((sum, entry) => sum + entry.profit, 0);
  const winningTrades = filtered.filter((entry) => entry.profit > 0).length;
  const winRate = filtered.length > 0 ? (winningTrades / filtered.length) * 100 : 0;

  const handleExportCSV = () => {
    const headers = ["Date", "Symbol", "Type", "Entry Price", "Exit Price", "Volume", "Profit", "Duration"];
    const data = filtered.map((entry) => [
      entry.date,
      entry.symbol,
      entry.type,
      entry.entryPrice,
      entry.exitPrice,
      entry.volume,
      entry.profit,
      entry.duration,
    ]);

    const csvContent = [
      headers.join(","),
      ...data.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trade-history.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trade History</h1>
          <p className="text-muted-foreground mt-1">
            View your complete trading history with filters and export options
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm font-medium mb-2">
            Total P/L
          </p>
          <p
            className={`text-3xl font-bold ${
              totalProfit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${totalProfit.toLocaleString()}
          </p>
        </div>
        <div className="bg-white border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm font-medium mb-2">
            Total Trades
          </p>
          <p className="text-3xl font-bold text-foreground">{filtered.length}</p>
        </div>
        <div className="bg-white border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm font-medium mb-2">
            Win Rate
          </p>
          <p className="text-3xl font-bold text-foreground">
            {winRate.toFixed(1)}%
          </p>
        </div>
        <div className="bg-white border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm font-medium mb-2">
            Winning Trades
          </p>
          <p className="text-3xl font-bold text-green-600">{winningTrades}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-border rounded-xl p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <div className="flex-1 min-w-56">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by symbol..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value as "All" | "Buy" | "Sell");
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          >
            <option value="All">All Types</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "profit" | "symbol")}
            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          >
            <option value="date">Sort by Date</option>
            <option value="profit">Sort by Profit</option>
            <option value="symbol">Sort by Symbol</option>
          </select>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterType("All");
              setSortBy("date");
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white border border-border rounded-xl p-6 overflow-x-auto">
        <h2 className="text-xl font-bold text-foreground mb-4">Trade History</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Date
              </th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Symbol
              </th>
              <th className="text-center py-3 px-2 font-semibold text-foreground">
                Type
              </th>
              <th className="text-center py-3 px-2 font-semibold text-foreground">
                Entry
              </th>
              <th className="text-center py-3 px-2 font-semibold text-foreground">
                Exit
              </th>
              <th className="text-center py-3 px-2 font-semibold text-foreground">
                Volume
              </th>
              <th className="text-center py-3 px-2 font-semibold text-foreground">
                Duration
              </th>
              <th className="text-right py-3 px-2 font-semibold text-foreground">
                P/L
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((entry) => (
              <tr
                key={entry.id}
                className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <td className="py-4 px-2 text-foreground text-xs">
                  {entry.date}
                </td>
                <td className="py-4 px-2 text-foreground font-semibold">
                  {entry.symbol}
                </td>
                <td className="py-4 px-2 text-center">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      entry.type === "Buy"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {entry.type}
                  </span>
                </td>
                <td className="py-4 px-2 text-center text-foreground">
                  {entry.entryPrice.toFixed(4)}
                </td>
                <td className="py-4 px-2 text-center text-foreground">
                  {entry.exitPrice.toFixed(4)}
                </td>
                <td className="py-4 px-2 text-center text-foreground">
                  {entry.volume.toLocaleString()}
                </td>
                <td className="py-4 px-2 text-center text-muted-foreground">
                  {entry.duration}
                </td>
                <td
                  className={`py-4 px-2 text-right font-semibold ${
                    entry.profit >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ${entry.profit.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            {Math.min((currentPage - 1) * itemsPerPage + 1, filtered.length)} to{" "}
            {Math.min(currentPage * itemsPerPage, filtered.length)} of{" "}
            {filtered.length} entries
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-border rounded hover:bg-muted transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded transition-colors ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "border border-border hover:bg-muted"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 border border-border rounded hover:bg-muted transition-colors disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
