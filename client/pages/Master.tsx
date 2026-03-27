import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

type MasterTab = "request" | "choose";

type MasterTraderRow = {
  id: number;
  userName: string;
  flatFee: number;
  feePercentage: string;
  products: string;
  qualification: string;
};

const rows: MasterTraderRow[] = [
  {
    id: 9,
    userName: "Multipair User",
    flatFee: 100,
    feePercentage: "10.00%",
    products: "EURUSD",
    qualification: "My Temporary Qualification",
  },
  {
    id: 17,
    userName: "master user",
    flatFee: 10,
    feePercentage: "10.00%",
    products: "EURUSD",
    qualification: "Temp Qual",
  },
  {
    id: 18,
    userName: "master userTwo",
    flatFee: 10,
    feePercentage: "10.00%",
    products: "EURUSD, AUDUSD, USDJPY",
    qualification: "New Temp Qual",
  },
];

export default function Master() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tab, setTab] = useState<MasterTab>("request");
  const [flatFee, setFlatFee] = useState("10");
  const [percentage, setPercentage] = useState("10.00");
  const [selectProducts, setSelectProducts] = useState("");
  const [qualifications, setQualifications] = useState("New Temp Qual");
  const [account, setAccount] = useState("DEM01");
  const [search, setSearch] = useState("");

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "choose">("choose");
  const [selectedTrader, setSelectedTrader] = useState<MasterTraderRow | null>(null);
  const [effectiveMonth, setEffectiveMonth] = useState<"current" | "next">("current");
  const [globalSelection, setGlobalSelection] = useState<"select_all" | "deselect_all">("select_all");
  const [globalFixedLots, setGlobalFixedLots] = useState("");
  const [globalPercentBalance, setGlobalPercentBalance] = useState("");
  const [globalMaxLots, setGlobalMaxLots] = useState("");
  const [masterFlat, setMasterFlat] = useState("");
  const [masterPercent, setMasterPercent] = useState("");
  const [feeFlat, setFeeFlat] = useState(false);
  const [feePercentage, setFeePercentage] = useState(true);
  const [pauseAll, setPauseAll] = useState(false);
  const [traderFixedLots, setTraderFixedLots] = useState("");
  const [traderPercentBalance, setTraderPercentBalance] = useState("");
  const [traderMaxLots, setTraderMaxLots] = useState("");
  const [traderFlat, setTraderFlat] = useState(false);
  const [traderPercentage, setTraderPercentage] = useState(true);
  const [traderPause, setTraderPause] = useState(false);
  const [symbolEURUSD, setSymbolEURUSD] = useState(true);

  useEffect(() => {
    if (location.pathname.startsWith("/master/choose")) {
      setTab("choose");
    } else {
      setTab("request");
    }
  }, [location.pathname]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((row) =>
      `${row.id} ${row.userName} ${row.products} ${row.qualification}`
        .toLowerCase()
        .includes(term)
    );
  }, [search]);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ flatFee, percentage, selectProducts, qualifications, account });
  };

  const openTraderDetails = (row: MasterTraderRow, mode: "view" | "choose") => {
    setModalMode(mode);
    setSelectedTrader(row);
    setMasterFlat(String(row.flatFee));
    setMasterPercent(row.feePercentage.replace("%", ""));
    setGlobalFixedLots("");
    setGlobalPercentBalance("");
    setGlobalMaxLots("");
    setTraderFixedLots("");
    setTraderPercentBalance("");
    setTraderMaxLots("");
    setEffectiveMonth("current");
    setGlobalSelection("select_all");
    setFeeFlat(false);
    setFeePercentage(true);
    setPauseAll(false);
    setTraderFlat(false);
    setTraderPercentage(true);
    setTraderPause(false);
    setSymbolEURUSD(true);
    setDetailsOpen(true);
  };

  const handleChooseMaster = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === "view") {
      setDetailsOpen(false);
      return;
    }
    console.log({
      selectedTrader,
      effectiveMonth,
      globalSelection,
      globalFixedLots,
      globalPercentBalance,
      globalMaxLots,
      masterFlat,
      masterPercent,
      feeFlat,
      feePercentage,
      pauseAll,
      traderFixedLots,
      traderPercentBalance,
      traderMaxLots,
      traderFlat,
      traderPercentage,
      traderPause,
      symbolEURUSD,
    });
    setDetailsOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white border border-border rounded-xl p-3 sm:p-4 md:p-6 overflow-hidden">
          <div className="grid grid-cols-2 border-b border-border mb-6">
            <button
              onClick={() => {
                setTab("request");
                navigate("/master/request");
              }}
              className={`px-2 sm:px-4 py-3 text-xs sm:text-sm md:text-base text-center font-medium border-b-2 transition-colors ${
                tab === "request"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Request Master Status
            </button>
            <button
              onClick={() => {
                setTab("choose");
                navigate("/master/choose");
              }}
              className={`px-2 sm:px-4 py-3 text-xs sm:text-sm md:text-base text-center font-medium border-b-2 transition-colors ${
                tab === "choose"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Choose a Master Trader
            </button>
          </div>

          {tab === "request" ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Master Status Request</h2>

              <form onSubmit={handleSubmitRequest} className="space-y-5 max-w-2xl">
                <Field label="Flat Fee">
                  <input
                    type="number"
                    value={flatFee}
                    onChange={(e) => setFlatFee(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-white"
                  />
                </Field>

                <Field label="Percentage">
                  <input
                    type="number"
                    step="0.01"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-white"
                  />
                </Field>

                <Field label="Select Products">
                  <input
                    type="text"
                    value={selectProducts}
                    onChange={(e) => setSelectProducts(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-white"
                  />
                </Field>

                <Field label="Qualifications">
                  <textarea
                    value={qualifications}
                    onChange={(e) => setQualifications(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-white min-h-20"
                  />
                </Field>

                <Field label="Account">
                  <select
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-white"
                  >
                    <option value="DEM01">DEM01</option>
                    <option value="DEM02">DEM02</option>
                    <option value="LIVE1">LIVE1</option>
                  </select>
                </Field>

                <button
                  type="submit"
                  className="rounded-md border border-border px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Submit
                </button>
              </form>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Selected Products</h3>
                <div className="flex flex-wrap gap-2">
                  {["EURUSD", "AUDUSD", "USDCAD", "USDJPY"].map((p) => (
                    <span key={p} className="px-3 py-2 border border-border rounded-md bg-muted/30 text-foreground">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-md border border-border">
                <table className="w-full min-w-[780px] text-sm">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border">
                      <th className="px-3 py-3 text-left">Flat Fee</th>
                      <th className="px-3 py-3 text-left">Percentage Fee</th>
                      <th className="px-3 py-3 text-left">Qualifications</th>
                      <th className="px-3 py-3 text-left">Account</th>
                      <th className="px-3 py-3 text-left">Status</th>
                      <th className="px-3 py-3 text-left">Approved On</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-3 border-t border-border">10</td>
                      <td className="px-3 py-3 border-t border-border">10.00%</td>
                      <td className="px-3 py-3 border-t border-border">New Temp Qual</td>
                      <td className="px-3 py-3 border-t border-border">DEM01</td>
                      <td className="px-3 py-3 border-t border-border text-green-600 font-medium">Approved</td>
                      <td className="px-3 py-3 border-t border-border">2026-02-04 10:58:10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span>Show</span>
                  <select className="border border-border rounded px-2 py-1 bg-white">
                    <option>10</option>
                  </select>
                  <span>entries</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span>Search:</span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-56 border border-border rounded px-2 py-1 bg-white"
                  />
                </div>
              </div>

              <div className="md:hidden rounded-md border border-border overflow-hidden">
                <table className="w-full text-sm table-fixed">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border">
                      <th className="px-3 py-3 text-left w-3/5">Qualification</th>
                      <th className="px-3 py-3 text-left w-2/5">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row) => (
                      <tr key={row.id} className="border-b border-border last:border-0">
                        <td className="px-3 py-3 align-top">{row.qualification}</td>
                        <td className="px-3 py-3 align-top">
                          <div className="flex flex-wrap gap-2">
                            <button
                              className="px-3 py-1 border border-border rounded hover:bg-muted"
                              onClick={() => openTraderDetails(row, "view")}
                            >
                              View
                            </button>
                            <button
                              className="px-3 py-1 border border-border rounded hover:bg-muted"
                              onClick={() => openTraderDetails(row, "choose")}
                            >
                              Choose
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="hidden md:block overflow-x-auto rounded-md border border-border">
                <table className="w-full min-w-[980px] text-sm">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border">
                      <th className="px-3 py-3 text-left">ID</th>
                      <th className="px-3 py-3 text-left">User Name</th>
                      <th className="px-3 py-3 text-left">Flat Fee</th>
                      <th className="px-3 py-3 text-left">Fee Percentage</th>
                      <th className="px-3 py-3 text-left">Products</th>
                      <th className="px-3 py-3 text-left">Qualification</th>
                      <th className="px-3 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row) => (
                      <tr key={row.id} className="border-b border-border last:border-0">
                        <td className="px-3 py-3">{row.id}</td>
                        <td className="px-3 py-3">{row.userName}</td>
                        <td className="px-3 py-3">{row.flatFee}</td>
                        <td className="px-3 py-3">{row.feePercentage}</td>
                        <td className="px-3 py-3">{row.products}</td>
                        <td className="px-3 py-3">{row.qualification}</td>
                        <td className="px-3 py-3">
                          <div className="flex gap-2">
                            <button
                              className="px-3 py-1 border border-border rounded hover:bg-muted"
                              onClick={() => openTraderDetails(row, "view")}
                            >
                              View
                            </button>
                            <button
                              className="px-3 py-1 border border-border rounded hover:bg-muted"
                              onClick={() => openTraderDetails(row, "choose")}
                            >
                              Choose
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-sm text-muted-foreground">
                Showing 1 to {filteredRows.length} of {filteredRows.length} entries
              </div>
            </div>
          )}
        </div>
      </div>

      {detailsOpen ? (
        <div className="fixed inset-0 z-50 bg-black/70" onClick={() => setDetailsOpen(false)}>
          <div
            className="absolute inset-0 overflow-y-auto overscroll-contain p-0 md:p-6"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="min-h-full flex items-start md:items-center justify-center">
              <form
                className="w-full md:max-w-[1100px] min-h-[100dvh] md:min-h-0 md:max-h-[90dvh] bg-background rounded-none md:rounded-lg border border-border shadow-lg flex flex-col"
                onSubmit={handleChooseMaster}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3 sm:px-4 md:px-6 pt-4 pb-3 border-b border-border flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl text-foreground font-semibold">
                    {modalMode === "view" ? "View Master Trader" : "Choose a Master Trader"}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setDetailsOpen(false)}
                    className="p-2 rounded hover:bg-muted"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div
                  className="flex-1 px-3 sm:px-4 md:px-6 py-4 space-y-6 overflow-y-auto overscroll-contain"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="ID">
                  <input
                    value={selectedTrader?.id ?? ""}
                    readOnly
                    className="w-full px-3 py-2 border border-border rounded bg-muted/20"
                  />
                </Field>
                <Field label="Name">
                  <input
                    value={selectedTrader?.userName ?? ""}
                    readOnly
                    className="w-full px-3 py-2 border border-border rounded bg-muted/20"
                  />
                </Field>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="effective-month"
                    checked={effectiveMonth === "current"}
                    onChange={() => setEffectiveMonth("current")}
                  />
                  <span>For the remainder of the current month.</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="effective-month"
                    checked={effectiveMonth === "next"}
                    onChange={() => setEffectiveMonth("next")}
                  />
                  <span>For the next month.</span>
                </label>
              </div>

              <div className="border-t border-border pt-5 space-y-4">
                <h3 className="text-xl font-semibold text-foreground underline">
                  Global Selection Criteria
                </h3>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="global-selection"
                      checked={globalSelection === "select_all"}
                      onChange={() => setGlobalSelection("select_all")}
                    />
                    <span>Select All Accounts and Use Global Selections.</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="global-selection"
                      checked={globalSelection === "deselect_all"}
                      onChange={() => setGlobalSelection("deselect_all")}
                    />
                    <span>Deselect All Accounts.</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:items-end">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:col-span-2">
                    <Field label="Fixed # of Lots">
                      <input
                        value={globalFixedLots}
                        onChange={(e) => setGlobalFixedLots(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded bg-white"
                      />
                    </Field>
                    <Field label="% of Balance">
                      <input
                        value={globalPercentBalance}
                        onChange={(e) => setGlobalPercentBalance(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded bg-white"
                      />
                    </Field>
                    <Field label="Max Lots">
                      <input
                        value={globalMaxLots}
                        onChange={(e) => setGlobalMaxLots(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded bg-white"
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Master Flat">
                      <input
                        value={masterFlat}
                        onChange={(e) => setMasterFlat(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded bg-white"
                      />
                    </Field>
                    <Field label="Master %">
                      <input
                        value={masterPercent}
                        onChange={(e) => setMasterPercent(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded bg-white"
                      />
                    </Field>

                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={feeFlat}
                        onChange={(e) => setFeeFlat(e.target.checked)}
                      />
                      <span>Flat</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={feePercentage}
                        onChange={(e) => setFeePercentage(e.target.checked)}
                      />
                      <span>Percentage</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm sm:col-span-2">
                      <input
                        type="checkbox"
                        checked={pauseAll}
                        onChange={(e) => setPauseAll(e.target.checked)}
                      />
                      <span>Pause</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-5 space-y-4">
                <h3 className="text-xl font-semibold text-foreground underline">
                  Individual Account Selections
                </h3>

                <div className="md:hidden rounded-lg border border-border p-3 space-y-4 bg-muted/10">
                  <div className="text-sm font-semibold text-foreground">DEMO1</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Fixed # of Lots">
                      <input
                        value={traderFixedLots}
                        onChange={(e) => setTraderFixedLots(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded bg-white"
                      />
                    </Field>
                    <Field label="% of Balance">
                      <input
                        value={traderPercentBalance}
                        onChange={(e) => setTraderPercentBalance(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded bg-white"
                      />
                    </Field>
                    <Field label="Max Lots">
                      <input
                        value={traderMaxLots}
                        onChange={(e) => setTraderMaxLots(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded bg-white"
                      />
                    </Field>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={traderFlat}
                        onChange={(e) => setTraderFlat(e.target.checked)}
                      />
                      <span>Flat</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={traderPercentage}
                        onChange={(e) => setTraderPercentage(e.target.checked)}
                      />
                      <span>Percentage</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={traderPause}
                        onChange={(e) => setTraderPause(e.target.checked)}
                      />
                      <span>Pause</span>
                    </label>
                  </div>
                </div>

                <div className="hidden md:block -mx-3 sm:mx-0 px-3 sm:px-0 rounded-lg border border-border max-w-full overflow-x-auto overflow-y-hidden touch-pan-x">
                  <table className="min-w-[860px] w-max text-sm">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border">
                        <th className="px-3 py-3 text-left">Trader Acct Name</th>
                        <th className="px-3 py-3 text-left">Fixed # of Lots</th>
                        <th className="px-3 py-3 text-left">% of Balance</th>
                        <th className="px-3 py-3 text-left">Max Lots</th>
                        <th className="px-3 py-3 text-left">Flat</th>
                        <th className="px-3 py-3 text-left">Percentage</th>
                        <th className="px-3 py-3 text-left">Pause</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-3 border-t border-border">DEMO1</td>
                        <td className="px-3 py-3 border-t border-border">
                          <input
                            value={traderFixedLots}
                            onChange={(e) => setTraderFixedLots(e.target.value)}
                            className="w-full px-2 py-1.5 border border-border rounded bg-white"
                          />
                        </td>
                        <td className="px-3 py-3 border-t border-border">
                          <input
                            value={traderPercentBalance}
                            onChange={(e) => setTraderPercentBalance(e.target.value)}
                            className="w-full px-2 py-1.5 border border-border rounded bg-white"
                          />
                        </td>
                        <td className="px-3 py-3 border-t border-border">
                          <input
                            value={traderMaxLots}
                            onChange={(e) => setTraderMaxLots(e.target.value)}
                            className="w-full px-2 py-1.5 border border-border rounded bg-white"
                          />
                        </td>
                        <td className="px-3 py-3 border-t border-border">
                          <input
                            type="checkbox"
                            checked={traderFlat}
                            onChange={(e) => setTraderFlat(e.target.checked)}
                          />
                        </td>
                        <td className="px-3 py-3 border-t border-border">
                          <input
                            type="checkbox"
                            checked={traderPercentage}
                            onChange={(e) => setTraderPercentage(e.target.checked)}
                          />
                        </td>
                        <td className="px-3 py-3 border-t border-border">
                          <input
                            type="checkbox"
                            checked={traderPause}
                            onChange={(e) => setTraderPause(e.target.checked)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t border-border pt-5 space-y-4">
                <h3 className="text-xl font-semibold text-foreground underline">Select Symbols</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={symbolEURUSD}
                      onChange={(e) => setSymbolEURUSD(e.target.checked)}
                    />
                    <span>EURUSD</span>
                  </label>
                  <button
                    type="button"
                    className="px-3 py-2 border border-border rounded hover:bg-muted"
                  >
                    Adjust Time
                  </button>
                </div>
              </div>
            </div>

                <div className="sticky bottom-0 bg-background px-3 sm:px-4 md:px-6 py-4 border-t border-border mt-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2">
                  <button
                    type="button"
                    className="rounded-md border border-border px-4 py-2 hover:bg-muted"
                    onClick={() => setDetailsOpen(false)}
                  >
                    {modalMode === "view" ? "Close" : "Cancel"}
                  </button>
                  {modalMode === "choose" ? (
                    <button
                      type="submit"
                      className="rounded-md border border-border px-5 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Choose
                    </button>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}
