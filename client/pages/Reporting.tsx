import { useState } from "react";
import { Download, Filter, ChevronLeft, ChevronRight } from "lucide-react";

interface TradeReport {
  id: string;
  date: string;
  symbol: string;
  type: "Buy" | "Sell";
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  profit: number;
  profitPercent: number;
}

const tradeReports: TradeReport[] = [
  {
    id: "1",
    date: "2026-03-12 14:30:00",
    symbol: "EUR/USD",
    type: "Buy",
    entryPrice: 1.0850,
    exitPrice: 1.0920,
    quantity: 100000,
    profit: 700,
    profitPercent: 0.64,
  },
  {
    id: "2",
    date: "2026-03-11 10:15:00",
    symbol: "GBP/USD",
    type: "Sell",
    entryPrice: 1.2650,
    exitPrice: 1.2580,
    quantity: 50000,
    profit: 350,
    profitPercent: 0.55,
  },
  {
    id: "3",
    date: "2026-03-10 16:45:00",
    symbol: "USD/JPY",
    type: "Buy",
    entryPrice: 145.30,
    exitPrice: 144.80,
    quantity: 10000,
    profit: -500,
    profitPercent: -0.34,
  },
  {
    id: "4",
    date: "2026-03-09 09:20:00",
    symbol: "AUD/USD",
    type: "Buy",
    entryPrice: 0.6750,
    exitPrice: 0.6850,
    quantity: 200000,
    profit: 2000,
    profitPercent: 1.48,
  },
];

export default function Reporting() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterSymbol, setFilterSymbol] = useState("");
  const [filterType, setFilterType] = useState("");
  const itemsPerPage = 10;

  const filteredReports = tradeReports.filter((report) => {
    if (filterSymbol && !report.symbol.includes(filterSymbol.toUpperCase())) {
      return false;
    }
    if (filterType && report.type !== filterType) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const totalProfit = filteredReports.reduce((sum, report) => sum + report.profit, 0);
  const winningTrades = filteredReports.filter((r) => r.profit > 0).length;
  const winRate = filteredReports.length > 0 ? (winningTrades / filteredReports.length) * 100 : 0;

  const handleExportCSV = () => {
    const headers = ["Date", "Symbol", "Type", "Entry Price", "Exit Price", "Quantity", "Profit", "Profit %"];
    const data = filteredReports.map((report) => [
      report.date,
      report.symbol,
      report.type,
      report.entryPrice,
      report.exitPrice,
      report.quantity,
      report.profit,
      report.profitPercent.toFixed(2) + "%",
    ]);

    const csvContent = [
      headers.join(","),
      ...data.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trade-reports.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Reporting & Analysis
          </h1>
          <p className="text-muted-foreground mt-1">
            View and analyze your trading performance
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm font-medium mb-2">
            Total Profit/Loss
          </p>
          <p className={`text-3xl font-bold ${totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${totalProfit.toLocaleString()}
          </p>
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
            Total Trades
          </p>
          <p className="text-3xl font-bold text-foreground">
            {filteredReports.length}
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
        <div className="flex items-center gap-4 flex-wrap">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter by symbol (e.g., EUR/USD)"
            value={filterSymbol}
            onChange={(e) => {
              setFilterSymbol(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 min-w-48 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          >
            <option value="">All Types</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
          <button
            onClick={() => {
              setFilterSymbol("");
              setFilterType("");
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white border border-border rounded-xl p-6 overflow-x-auto">
        <h2 className="text-xl font-bold text-foreground mb-4">Trade Reports</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Date
              </th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Symbol
              </th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Type
              </th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Entry Price
              </th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Exit Price
              </th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Quantity
              </th>
              <th className="text-right py-3 px-2 font-semibold text-foreground">
                P/L
              </th>
              <th className="text-right py-3 px-2 font-semibold text-foreground">
                P/L %
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReports
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-2 text-foreground">{report.date}</td>
                  <td className="py-4 px-2 text-foreground font-semibold">
                    {report.symbol}
                  </td>
                  <td className="py-4 px-2">
                    <span
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        report.type === "Buy"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {report.type}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-foreground">
                    {report.entryPrice.toFixed(4)}
                  </td>
                  <td className="py-4 px-2 text-foreground">
                    {report.exitPrice.toFixed(4)}
                  </td>
                  <td className="py-4 px-2 text-foreground">
                    {report.quantity.toLocaleString()}
                  </td>
                  <td className={`py-4 px-2 text-right font-semibold ${report.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ${report.profit.toLocaleString()}
                  </td>
                  <td className={`py-4 px-2 text-right font-semibold ${report.profitPercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {report.profitPercent >= 0 ? "+" : ""}
                    {report.profitPercent.toFixed(2)}%
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            {Math.min((currentPage - 1) * itemsPerPage + 1, filteredReports.length)} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredReports.length)} of{" "}
            {filteredReports.length} entries
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
