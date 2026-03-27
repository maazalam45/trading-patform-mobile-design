import { useMemo, useState } from "react";

type ReportRow = {
  id: string;
  account: string;
  symbol: string;
  orderNo: string;
  side: "Buy" | "Sell";
  dateTimeEntry: string;
  entryPrice: number;
  lots: number;
  sl: number;
  tp: number;
  dateTimeEnd: string;
  endPrice: number;
  brokerComm: number;
  swap: number;
  masterComm: number;
  pl: number;
  master: number;
  to: number;
};

const reportRows: ReportRow[] = [
  {
    id: "1",
    account: "Demo1",
    symbol: "EURUSD",
    orderNo: "000004874",
    side: "Buy",
    dateTimeEntry: "2025-09-05 19:04:15",
    entryPrice: 1.17586,
    lots: 5.0,
    sl: 1.17536,
    tp: 1.17636,
    dateTimeEnd: "2026-03-24 14:16:53",
    endPrice: 0,
    brokerComm: 10,
    swap: 0,
    masterComm: 0,
    pl: 0,
    master: 0,
    to: 0,
  },
  {
    id: "2",
    account: "Demo1",
    symbol: "EURUSD",
    orderNo: "000004872",
    side: "Buy",
    dateTimeEntry: "2025-09-04 19:09:48",
    entryPrice: 1.16414,
    lots: 1.0,
    sl: 1.16413,
    tp: 1.16415,
    dateTimeEnd: "2026-03-24 14:16:53",
    endPrice: 0,
    brokerComm: 2,
    swap: 0,
    masterComm: 0,
    pl: 0,
    master: 0,
    to: 0,
  },
  {
    id: "3",
    account: "Demo1",
    symbol: "EURUSD",
    orderNo: "000004900",
    side: "Buy",
    dateTimeEntry: "2025-09-09 18:11:31",
    entryPrice: 1.17368,
    lots: 1,
    sl: 1.17268,
    tp: 1.17468,
    dateTimeEnd: "2025-09-09 18:12:08",
    endPrice: 1.17363,
    brokerComm: 2,
    swap: 0,
    masterComm: 0,
    pl: -7,
    master: 0,
    to: -7,
  },
  {
    id: "4",
    account: "Demo1",
    symbol: "USDJPY",
    orderNo: "000004907",
    side: "Buy",
    dateTimeEntry: "2025-09-15 14:21:03",
    entryPrice: 147.393,
    lots: 500,
    sl: 147.343,
    tp: 147.443,
    dateTimeEnd: "2025-09-15 14:21:13",
    endPrice: 147.389,
    brokerComm: 10,
    swap: 0,
    masterComm: 0,
    pl: -0.16,
    master: 0,
    to: -0.16,
  },
];

export default function Reporting() {
  const [accountName, setAccountName] = useState("");
  const [master, setMaster] = useState("");
  const [symbol, setSymbol] = useState("USD");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [buySell, setBuySell] = useState("");
  const [winLoss, setWinLoss] = useState("");

  const filteredRows = useMemo(() => {
    return reportRows.filter((row) => {
      if (accountName && row.account !== accountName) return false;
      if (master && String(row.master) !== master) return false;
      if (symbol && !row.symbol.toLowerCase().includes(symbol.toLowerCase())) return false;
      if (buySell && row.side !== buySell) return false;
      if (winLoss === "Win" && row.pl <= 0) return false;
      if (winLoss === "Loss" && row.pl >= 0) return false;

      if (dateFrom) {
        const rowStart = new Date(row.dateTimeEntry.replace(" ", "T"));
        const from = new Date(dateFrom);
        if (rowStart < from) return false;
      }

      if (dateTo) {
        const rowEnd = new Date(row.dateTimeEnd.replace(" ", "T"));
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999);
        if (rowEnd > to) return false;
      }

      return true;
    });
  }, [accountName, master, symbol, dateFrom, dateTo, buySell, winLoss]);

  const totals = useMemo(() => {
    return filteredRows.reduce(
      (acc, row) => {
        acc.brokerComm += row.brokerComm;
        acc.swap += row.swap;
        acc.masterComm += row.masterComm;
        acc.pl += row.pl;
        acc.master += row.master;
        acc.to += row.to;
        return acc;
      },
      { brokerComm: 0, swap: 0, masterComm: 0, pl: 0, master: 0, to: 0 }
    );
  }, [filteredRows]);

  const handleExportCSV = () => {
    const headers = [
      "Account",
      "Symbol",
      "Order #",
      "Buy / Sell",
      "DateTime Entry",
      "Entry Price",
      "Lots",
      "SL",
      "TP",
      "DateTime End",
      "End Price",
      "Broker Comm",
      "Swap",
      "Master Comm",
      "P/L",
      "Master",
      "TO",
    ];

    const data = filteredRows.map((row) => [
      row.account,
      row.symbol,
      row.orderNo,
      row.side,
      row.dateTimeEntry,
      row.entryPrice,
      row.lots,
      row.sl,
      row.tp,
      row.dateTimeEnd,
      row.endPrice,
      row.brokerComm,
      row.swap,
      row.masterComm,
      row.pl,
      row.master,
      row.to,
    ]);

    const csvContent = [headers.join(","), ...data.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trades-accounting-report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-border rounded-xl p-3 sm:p-4 md:p-6 space-y-4">
      <h1 className="text-3xl font-bold text-foreground">Trades Accounting Report</h1>

      <div className="text-2xl font-semibold text-foreground">
        For: <span className="font-normal">Master UserTwo</span>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-4 md:p-5">
        <h2 className="text-xl font-semibold text-foreground mb-3">Filters:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <FilterField label="Account Name">
            <select
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full rounded border border-border px-3 py-2 bg-white"
            >
              <option value="">All</option>
              <option value="Demo1">Demo1</option>
            </select>
          </FilterField>

          <FilterField label="Master">
            <select
              value={master}
              onChange={(e) => setMaster(e.target.value)}
              className="w-full rounded border border-border px-3 py-2 bg-white"
            >
              <option value="">All</option>
              <option value="0">0</option>
            </select>
          </FilterField>

          <FilterField label="Symbol">
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full rounded border border-border px-3 py-2 bg-white"
            />
          </FilterField>

          <FilterField label="From">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full rounded border border-border px-3 py-2 bg-white"
            />
          </FilterField>

          <FilterField label="To">
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full rounded border border-border px-3 py-2 bg-white"
            />
          </FilterField>

          <FilterField label="Buy / Sell">
            <select
              value={buySell}
              onChange={(e) => setBuySell(e.target.value)}
              className="w-full rounded border border-border px-3 py-2 bg-white"
            >
              <option value="">All</option>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select>
          </FilterField>

          <FilterField label="Won / Loss">
            <select
              value={winLoss}
              onChange={(e) => setWinLoss(e.target.value)}
              className="w-full rounded border border-border px-3 py-2 bg-white"
            >
              <option value="">All</option>
              <option value="Win">Win</option>
              <option value="Loss">Loss</option>
            </select>
          </FilterField>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Report:</h2>
        <button
          onClick={handleExportCSV}
          className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full min-w-[1500px] text-sm">
          <thead>
            <tr className="bg-muted/30 border-b border-border">
              <th className="px-3 py-3 text-left">Account</th>
              <th className="px-3 py-3 text-left">Symbol</th>
              <th className="px-3 py-3 text-left">Order #</th>
              <th className="px-3 py-3 text-left">Buy / Sell</th>
              <th className="px-3 py-3 text-left">DateTime Entry</th>
              <th className="px-3 py-3 text-left">Entry Price</th>
              <th className="px-3 py-3 text-left">Lots</th>
              <th className="px-3 py-3 text-left">SL</th>
              <th className="px-3 py-3 text-left">TP</th>
              <th className="px-3 py-3 text-left">DateTime End</th>
              <th className="px-3 py-3 text-left">End Price</th>
              <th className="px-3 py-3 text-left">Broker Comm</th>
              <th className="px-3 py-3 text-left">Swap</th>
              <th className="px-3 py-3 text-left">Master Comm</th>
              <th className="px-3 py-3 text-left">P/L</th>
              <th className="px-3 py-3 text-left">Master</th>
              <th className="px-3 py-3 text-left">TO</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td className="px-3 py-8 text-center text-muted-foreground" colSpan={17}>
                  No data available in table
                </td>
              </tr>
            ) : (
              filteredRows.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-3">{row.account}</td>
                  <td className="px-3 py-3">{row.symbol}</td>
                  <td className="px-3 py-3">{row.orderNo}</td>
                  <td className="px-3 py-3">{row.side}</td>
                  <td className="px-3 py-3">{row.dateTimeEntry}</td>
                  <td className="px-3 py-3">{row.entryPrice.toFixed(5)}</td>
                  <td className="px-3 py-3">{row.lots.toFixed(2)}</td>
                  <td className="px-3 py-3">{row.sl}</td>
                  <td className="px-3 py-3">{row.tp}</td>
                  <td className="px-3 py-3">{row.dateTimeEnd}</td>
                  <td className="px-3 py-3">{row.endPrice.toFixed(5)}</td>
                  <td className="px-3 py-3">{row.brokerComm.toFixed(2)}</td>
                  <td className="px-3 py-3">{row.swap.toFixed(2)}</td>
                  <td className="px-3 py-3">{row.masterComm.toFixed(2)}</td>
                  <td className="px-3 py-3">{row.pl.toFixed(2)}</td>
                  <td className="px-3 py-3">{row.master.toFixed(2)}</td>
                  <td className="px-3 py-3">{row.to.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="border-t border-border bg-muted/20 font-semibold">
              <td className="px-3 py-3 text-right" colSpan={11}>
                TOTAL:
              </td>
              <td className="px-3 py-3">{totals.brokerComm.toFixed(2)}</td>
              <td className="px-3 py-3">{totals.swap.toFixed(2)}</td>
              <td className="px-3 py-3">{totals.masterComm.toFixed(2)}</td>
              <td className="px-3 py-3">{totals.pl.toFixed(2)}</td>
              <td className="px-3 py-3">{totals.master.toFixed(2)}</td>
              <td className="px-3 py-3">{totals.to.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}
