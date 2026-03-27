import { useLocation } from "react-router-dom";
import { ArrowLeft, Camera, Expand, Settings } from "lucide-react";

type TradingAccount = {
  id: string;
  name: string;
  balance: number;
  leverage: string;
};

type DomRow = {
  bid: string;
  lots: string;
  spread: string;
  ask: string;
};

type TradeRow = {
  symbol: string;
  order: string;
  dateTime: string;
  type: "Buy" | "Sell";
  entryPrice: string;
  lots: string;
  sl: string;
  tp: string;
  currentPrice: string;
  pl: string;
};

const domRows: DomRow[] = [
  { bid: "1.12349", lots: "tob", spread: "0.2", ask: "1.12351" },
  { bid: "", lots: "1", spread: "11,235.1", ask: "" },
  { bid: "", lots: "5", spread: "0.2", ask: "" },
  { bid: "1.12350", lots: "10", spread: "0.2", ask: "1.12352" },
  { bid: "", lots: "30", spread: "0.2", ask: "" },
  { bid: "", lots: "50", spread: "0.2", ask: "" },
];

const openTrades: TradeRow[] = [
  {
    symbol: "EURUSD",
    order: "000008204",
    dateTime: "2026-03-27 21:50:35",
    type: "Sell",
    entryPrice: "1.12352",
    lots: "1.0",
    sl: "1.12852",
    tp: "1.12342",
    currentPrice: "1.12351",
    pl: "-1 USD",
  },
];

const candleData = [
  { o: 46, c: 47, h: 48, l: 45 },
  { o: 47, c: 46, h: 48, l: 45 },
  { o: 46, c: 47, h: 49, l: 45 },
  { o: 47, c: 48, h: 49, l: 46 },
  { o: 48, c: 47, h: 49, l: 46 },
  { o: 47, c: 46, h: 48, l: 45 },
  { o: 46, c: 47, h: 48, l: 45 },
  { o: 47, c: 48, h: 49, l: 46 },
  { o: 48, c: 49, h: 50, l: 47 },
  { o: 49, c: 48, h: 50, l: 47 },
  { o: 48, c: 47, h: 49, l: 46 },
  { o: 47, c: 46, h: 48, l: 45 },
  { o: 46, c: 45, h: 47, l: 44 },
  { o: 45, c: 46, h: 47, l: 44 },
  { o: 46, c: 47, h: 48, l: 45 },
  { o: 47, c: 48, h: 49, l: 46 },
  { o: 48, c: 47, h: 49, l: 46 },
  { o: 47, c: 46, h: 48, l: 45 },
  { o: 46, c: 45, h: 47, l: 44 },
  { o: 45, c: 38, h: 46, l: 34 },
];

export default function TradingPlatform() {
  const location = useLocation();
  const state = location.state as { account?: TradingAccount } | null;

  const account = state?.account ?? {
    id: "1",
    name: "Maaz Alam",
    balance: 9827.66,
    leverage: "50",
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-[300px_300px_1fr] gap-2">
        <section className="bg-white border border-border rounded-xl p-2 space-y-2 shadow-sm">
          <div className="bg-gradient-to-r from-muted/50 to-muted/20 border border-border rounded px-2 py-1 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Market Watch</h2>
            <button className="border border-border rounded px-2 py-0.5 text-base hover:bg-muted">
              Symbols
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[280px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-foreground">
                  <th className="py-1.5 px-1">Symbol</th>
                  <th className="py-1.5 px-1">Bid</th>
                  <th className="py-1.5 px-1">Ask</th>
                  <th className="py-1.5 px-1">DOM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-1 font-medium">EURUSD</td>
                  <td className="py-2 px-1 text-red-600 tabular-nums">1.12349</td>
                  <td className="py-2 px-1 text-red-600 tabular-nums">1.12351</td>
                  <td className="py-2 px-1">
                    <button className="border border-border rounded px-2 py-0.5 text-xs">DOM</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-border rounded-xl p-2 space-y-2 shadow-sm">
          <div className="bg-gradient-to-r from-muted/50 to-muted/20 border border-border rounded px-2 py-1">
            <h2 className="text-2xl font-semibold text-foreground">Depth of Market</h2>
          </div>

          <div className="border border-border rounded overflow-hidden">
            <div className="bg-muted/30 text-center text-2xl font-bold py-1 border-b border-border">
              EURUSD
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[290px] text-sm">
                <thead>
                  <tr className="bg-muted/20 text-foreground">
                    <th className="px-2 py-1.5 text-left w-[80px]">Bid</th>
                    <th className="px-2 py-1.5 text-left w-[60px]">Lots</th>
                    <th className="px-2 py-1.5 text-left w-[70px]">Spread</th>
                    <th className="px-2 py-1.5 text-left w-[80px]">Ask</th>
                  </tr>
                </thead>
                <tbody>
                  {domRows.map((row, idx) => (
                    <tr key={idx} className="border-t border-border/60">
                      <td className="px-2 py-1.5 bg-red-50 text-red-700 tabular-nums">{row.bid}</td>
                      <td className="px-2 py-1.5 tabular-nums">{row.lots}</td>
                      <td className="px-2 py-1.5 tabular-nums">{row.spread}</td>
                      <td className="px-2 py-1.5 bg-green-50 text-green-700 tabular-nums">{row.ask}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 border-t border-border">
              <button className="py-1.5 text-sm font-semibold bg-red-600 text-white hover:bg-red-700">
                Sell (Mkt)
              </button>
              <button className="py-1.5 text-sm font-semibold bg-green-600 text-white hover:bg-green-700">
                Buy (Mkt)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-xs">
            <MiniField label="SL" value="1.0" />
            <MiniField label="TP" value="1.0" />
            <MiniField label="Risk %" value="1.0" />
            <MiniField label="Lot" value="LOTS" />
          </div>

          <div className="flex flex-wrap gap-2">
            <select className="border border-border rounded px-2 py-1 text-sm bg-white">
              <option>Market</option>
            </select>
            <button className="border border-border rounded px-2.5 py-1 text-sm hover:bg-muted">
              Trailing Stop
            </button>
          </div>
        </section>

        <section className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-muted/50 to-muted/20 border-b border-border px-2 py-1">
            <h2 className="text-2xl font-semibold text-foreground">Charts</h2>
          </div>

          <div className="bg-[#0f1420] text-white">
            <div className="border-b border-white/10 px-2 py-1 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 flex-wrap text-xs md:text-sm">
                <button className="p-1 hover:bg-white/10 rounded">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="font-semibold px-1.5">EURUSD</span>
                {["1m", "5m", "15m", "1H", "2H", "4H", "D", "W", "M", "Y"].map((t) => (
                  <button
                    key={t}
                    className={`px-1.5 py-0.5 rounded ${t === "5m" ? "bg-blue-700" : "hover:bg-white/10"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[Settings, Camera, Expand].map((Icon, i) => (
                  <button key={i} className="p-1.5 rounded hover:bg-white/10">
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            <div className="px-2 py-2">
              <CandlestickChart />
            </div>

            <div className="border-t border-white/10 px-2 py-1 text-xs md:text-sm">
              EURUSD - 5M
            </div>
          </div>
        </section>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="border-b border-border px-2 py-1 flex flex-wrap gap-1">
          {["Trades (1)", "Pending", "History", "Accounts", "Events", "Alerts"].map((tab) => (
            <button
              key={tab}
              className={`border border-border px-2.5 py-1 rounded text-xs md:text-sm ${
                tab === "Trades (1)"
                  ? "bg-primary text-primary-foreground"
                  : "bg-white hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
          <button className="border border-border px-2.5 py-1 rounded text-xs md:text-sm bg-white hover:bg-muted">
            Group Selected Trades
          </button>
          <button className="border border-border px-2.5 py-1 rounded text-xs md:text-sm bg-white hover:bg-muted">
            Un-Group Selected Trades
          </button>
        </div>

        <div className="px-2 py-2 text-sm md:text-base font-semibold border-b border-border">
          Balance: {account.balance.toFixed(2)} &nbsp; Equity: 9826.66 &nbsp; Margin: 2247.04 &nbsp;
          Free Margin: 7579.62 &nbsp; Margin Level: 437.32%
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-xs md:text-sm">
            <thead>
              <tr className="bg-muted/30 border-b border-border text-left">
                <th className="px-2 py-2">Symbol</th>
                <th className="px-2 py-2">Order</th>
                <th className="px-2 py-2">Date/Time</th>
                <th className="px-2 py-2">Type</th>
                <th className="px-2 py-2">Entry</th>
                <th className="px-2 py-2">Lots</th>
                <th className="px-2 py-2">SL</th>
                <th className="px-2 py-2">TP</th>
                <th className="px-2 py-2">Current</th>
                <th className="px-2 py-2">P/L</th>
              </tr>
            </thead>
            <tbody>
              {openTrades.map((row) => (
                <tr key={row.order} className="border-b border-border last:border-0">
                  <td className="px-2 py-2">{row.symbol}</td>
                  <td className="px-2 py-2">{row.order}</td>
                  <td className="px-2 py-2">{row.dateTime}</td>
                  <td className="px-2 py-2">{row.type}</td>
                  <td className="px-2 py-2">{row.entryPrice}</td>
                  <td className="px-2 py-2">{row.lots}</td>
                  <td className="px-2 py-2">
                    <input value={row.sl} readOnly className="w-24 border border-border rounded px-2 py-1 bg-white" />
                  </td>
                  <td className="px-2 py-2">
                    <input value={row.tp} readOnly className="w-24 border border-border rounded px-2 py-1 bg-white" />
                  </td>
                  <td className="px-2 py-2">{row.currentPrice}</td>
                  <td className="px-2 py-2 text-red-700 font-semibold">{row.pl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MiniField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-foreground mb-0.5">{label}</label>
      <input
        value={value}
        readOnly
        className="w-full rounded border border-border px-1.5 py-1 bg-background text-xs"
      />
    </div>
  );
}

function CandlestickChart() {
  const candles = [
    { o: 1.1230, c: 1.1234, h: 1.1238, l: 1.1226, t: "15:15" },
    { o: 1.1234, c: 1.1232, h: 1.1237, l: 1.1229, t: "15:30" },
    { o: 1.1232, c: 1.1236, h: 1.1240, l: 1.1230, t: "15:45" },
    { o: 1.1236, c: 1.1239, h: 1.1242, l: 1.1233, t: "16:00" },
    { o: 1.1239, c: 1.1237, h: 1.1242, l: 1.1234, t: "16:15" },
    { o: 1.1237, c: 1.1234, h: 1.1239, l: 1.1231, t: "16:30" },
    { o: 1.1234, c: 1.1237, h: 1.1240, l: 1.1232, t: "16:45" },
    { o: 1.1237, c: 1.1240, h: 1.1243, l: 1.1235, t: "17:00" },
    { o: 1.1240, c: 1.1242, h: 1.1245, l: 1.1238, t: "17:15" },
    { o: 1.1242, c: 1.1239, h: 1.1244, l: 1.1236, t: "17:30" },
    { o: 1.1239, c: 1.1235, h: 1.1241, l: 1.1232, t: "17:45" },
    { o: 1.1235, c: 1.1232, h: 1.1237, l: 1.1229, t: "18:00" },
    { o: 1.1232, c: 1.1229, h: 1.1235, l: 1.1227, t: "18:15" },
    { o: 1.1229, c: 1.1233, h: 1.1236, l: 1.1228, t: "18:30" },
    { o: 1.1233, c: 1.1236, h: 1.1239, l: 1.1231, t: "18:45" },
    { o: 1.1236, c: 1.1238, h: 1.1241, l: 1.1233, t: "19:00" },
    { o: 1.1238, c: 1.1234, h: 1.1240, l: 1.1232, t: "19:15" },
    { o: 1.1234, c: 1.1230, h: 1.1236, l: 1.1228, t: "19:30" },
    { o: 1.1230, c: 1.1226, h: 1.1232, l: 1.1224, t: "19:45" },
    { o: 1.1226, c: 1.1203, h: 1.1229, l: 1.1198, t: "20:00" },
  ];
  const maxPrice = Math.max(...candles.map((c) => c.h)) + 0.0003;
  const minPrice = Math.min(...candles.map((c) => c.l)) - 0.0003;
  const range = maxPrice - minPrice;
  const y = (v: number) => ((maxPrice - v) / range) * 100;
  const sl = 1.1237;
  const tp = 1.1214;

  return (
    <div className="relative rounded-xl border border-white/20 overflow-hidden h-[340px] md:h-[540px] bg-[#0b1220]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(93,118,171,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(93,118,171,0.2) 1px, transparent 1px)",
          backgroundSize: "36px 28px",
        }}
      />

      <div className="absolute left-3 right-3 top-3 bottom-12 z-10">
        {candles.map((candle, idx) => {
          const x = (idx / (candles.length - 1)) * 100;
          const up = candle.c >= candle.o;
          const wickTop = y(candle.h);
          const wickBottom = y(candle.l);
          const bodyTop = Math.min(y(candle.o), y(candle.c));
          const bodyHeight = Math.max(1.6, Math.abs(y(candle.o) - y(candle.c)));
          return (
            <div
              key={idx}
              className="absolute"
              style={{ left: `${x}%`, top: 0, bottom: 0, width: "3.8%" }}
            >
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-[2px] ${up ? "bg-emerald-400" : "bg-rose-500"}`}
                style={{ top: `${wickTop}%`, height: `${Math.max(1.5, wickBottom - wickTop)}%` }}
              />
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-[10px] md:w-[12px] rounded-[2px] shadow-sm ${
                  up ? "bg-emerald-400" : "bg-rose-500"
                }`}
                style={{ top: `${bodyTop}%`, height: `${bodyHeight}%` }}
              />
            </div>
          );
        })}

        <div
          className="absolute left-0 right-0 border-t-2 border-rose-500"
          style={{ top: `${y(sl)}%` }}
        />
        <div
          className="absolute left-0 right-0 border-t-2 border-emerald-500"
          style={{ top: `${y(tp)}%` }}
        />

        <div
          className="absolute left-0 -translate-y-full bg-blue-600/95 text-white text-[10px] md:text-xs px-2 py-1 rounded"
          style={{ top: `${y(sl)}%` }}
        >
          SL {sl.toFixed(5)}
        </div>
        <div
          className="absolute left-0 -translate-y-full bg-blue-600/95 text-white text-[10px] md:text-xs px-2 py-1 rounded"
          style={{ top: `${y(tp)}%` }}
        >
          TP {tp.toFixed(5)}
        </div>
      </div>

      <div className="absolute left-3 right-3 bottom-3 flex justify-between text-[10px] md:text-xs text-white/70">
        <span>{candles[0].t}</span>
        <span>{candles[Math.floor(candles.length / 2)].t}</span>
        <span>{candles[candles.length - 1].t}</span>
      </div>
    </div>
  );
}
