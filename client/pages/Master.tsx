import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Pencil, Trash2, Star, TrendingUp } from "lucide-react";

interface MasterTrader {
  id: string;
  name: string;
  rating: number;
  winRate: number;
  followers: number;
  avgReturn: number;
  riskLevel: "Low" | "Medium" | "High";
  experience: string;
  selected: boolean;
}

interface SlaveAccount {
  id: string;
  name: string;
  masterTrader: string;
  status: "Active" | "Inactive";
  connected: string;
}

const masterTraders: MasterTrader[] = [
  {
    id: "1",
    name: "Pro Trader Alpha",
    rating: 4.8,
    winRate: 68,
    followers: 1250,
    avgReturn: 24.5,
    riskLevel: "Medium",
    experience: "8+ years",
    selected: true,
  },
  {
    id: "2",
    name: "Conservative Master",
    rating: 4.6,
    winRate: 62,
    followers: 890,
    avgReturn: 18.2,
    riskLevel: "Low",
    experience: "10+ years",
    selected: false,
  },
  {
    id: "3",
    name: "Aggressive Trader",
    rating: 4.4,
    winRate: 71,
    followers: 2100,
    avgReturn: 32.1,
    riskLevel: "High",
    experience: "6+ years",
    selected: false,
  },
  {
    id: "4",
    name: "Balanced Strategy",
    rating: 4.7,
    winRate: 65,
    followers: 1560,
    avgReturn: 21.8,
    riskLevel: "Medium",
    experience: "9+ years",
    selected: false,
  },
];

const slaveAccounts: SlaveAccount[] = [
  {
    id: "1",
    name: "DEMO1",
    masterTrader: "Pro Trader Alpha",
    status: "Active",
    connected: "2026-01-15",
  },
  {
    id: "2",
    name: "LIVE1",
    masterTrader: "Balanced Strategy",
    status: "Active",
    connected: "2026-02-10",
  },
];

export default function Master() {
  const [activeTab, setActiveTab] = useState<"request" | "slaves" | "choose">(
    "request"
  );
  const [flatFee, setFlatFee] = useState("10");
  const [percentage, setPercentage] = useState("10.00");
  const [selectProducts, setSelectProducts] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [account, setAccount] = useState("DEM01");
  const [selectedMaster, setSelectedMaster] = useState<string | null>(
    masterTraders[0].id
  );

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      flatFee,
      percentage,
      selectProducts,
      qualifications,
      account,
    });
  };

  const handleSelectMaster = (masterId: string) => {
    setSelectedMaster(selectedMaster === masterId ? null : masterId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Master Trading</h1>
        <p className="text-muted-foreground mt-1">
          Request master status, manage slave accounts, and choose master traders
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border border-border rounded-xl">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("request")}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === "request"
                ? "bg-primary/10 text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Request Master Status
          </button>
          <button
            onClick={() => setActiveTab("slaves")}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === "slaves"
                ? "bg-primary/10 text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Show Slaves
          </button>
          <button
            onClick={() => setActiveTab("choose")}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === "choose"
                ? "bg-primary/10 text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Choose Master
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8">
          {activeTab === "request" && (
            <RequestMasterStatus
              flatFee={flatFee}
              setFlatFee={setFlatFee}
              percentage={percentage}
              setPercentage={setPercentage}
              selectProducts={selectProducts}
              setSelectProducts={setSelectProducts}
              qualifications={qualifications}
              setQualifications={setQualifications}
              account={account}
              setAccount={setAccount}
              onSubmit={handleSubmitRequest}
            />
          )}

          {activeTab === "slaves" && (
            <ShowSlaves slaveAccounts={slaveAccounts} />
          )}

          {activeTab === "choose" && (
            <ChooseMaster
              masterTraders={masterTraders}
              selectedMaster={selectedMaster}
              onSelectMaster={handleSelectMaster}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface RequestMasterStatusProps {
  flatFee: string;
  setFlatFee: (value: string) => void;
  percentage: string;
  setPercentage: (value: string) => void;
  selectProducts: string;
  setSelectProducts: (value: string) => void;
  qualifications: string;
  setQualifications: (value: string) => void;
  account: string;
  setAccount: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function RequestMasterStatus({
  flatFee,
  setFlatFee,
  percentage,
  setPercentage,
  selectProducts,
  setSelectProducts,
  qualifications,
  setQualifications,
  account,
  setAccount,
  onSubmit,
}: RequestMasterStatusProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Request Master Status
        </h2>
        <p className="text-muted-foreground">
          Submit your request to become a master trader
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Flat Fee
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={flatFee}
                onChange={(e) => setFlatFee(e.target.value)}
                placeholder="0.00"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                className="px-4 py-2 border border-border rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              >
                Actions
              </button>
            </div>
            <button
              type="button"
              className="text-xs text-accent mt-2 hover:text-accent/80"
            >
              Add Flat Forex Value
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Fee Percentage
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="0.00"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                className="px-4 py-2 border border-border rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              >
                Actions
              </button>
            </div>
            <button
              type="button"
              className="text-xs text-accent mt-2 hover:text-accent/80"
            >
              Add Plus Percentage Value
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Select Products
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={selectProducts}
              onChange={(e) => setSelectProducts(e.target.value)}
              placeholder="e.g., EUR/USD, GBP/USD"
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              className="px-4 py-2 border border-border rounded-lg text-muted-foreground hover:bg-muted transition-colors"
            >
              Actions
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Qualifications
          </label>
          <input
            type="text"
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            placeholder="Describe your trading qualifications"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Account
          </label>
          <select
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          >
            <option value="DEM01">DEM01</option>
            <option value="DEM02">DEM02</option>
            <option value="LIVE1">LIVE1</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Submit Request
          </button>
          <button
            type="button"
            className="flex-1 border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

interface ShowSlavesProps {
  slaveAccounts: SlaveAccount[];
}

function ShowSlaves({ slaveAccounts }: ShowSlavesProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Slave Accounts
        </h2>
        <p className="text-muted-foreground">
          View all accounts connected to master traders
        </p>
      </div>

      <div className="space-y-3">
        {slaveAccounts.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              No slave accounts connected yet
            </p>
          </div>
        ) : (
          slaveAccounts.map((slave) => (
            <div
              key={slave.id}
              className="bg-muted/30 border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-lg">
                    {slave.name}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Master Trader
                      </p>
                      <p className="font-semibold text-foreground text-sm">
                        {slave.masterTrader}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Status
                      </p>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium inline-block ${
                          slave.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {slave.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Connected
                      </p>
                      <p className="font-semibold text-foreground text-sm">
                        {slave.connected}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

interface ChooseMasterProps {
  masterTraders: MasterTrader[];
  selectedMaster: string | null;
  onSelectMaster: (masterId: string) => void;
}

function ChooseMaster({
  masterTraders,
  selectedMaster,
  onSelectMaster,
}: ChooseMasterProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Choose Master Trader
        </h2>
        <p className="text-muted-foreground">
          Browse and select from available professional master traders
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {masterTraders.map((trader) => (
          <div
            key={trader.id}
            className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
              selectedMaster === trader.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => onSelectMaster(trader.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground">
                  {trader.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {trader.experience} experience
                </p>
              </div>
              {selectedMaster === trader.id && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
              )}
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">
                    {trader.rating}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Win Rate</span>
                <span className="font-semibold text-foreground">
                  {trader.winRate}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Avg Return
                </span>
                <span className="font-semibold text-green-600">
                  +{trader.avgReturn}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Followers</span>
                <span className="font-semibold text-foreground">
                  {trader.followers.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Risk Level</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    trader.riskLevel === "Low"
                      ? "bg-green-100 text-green-700"
                      : trader.riskLevel === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {trader.riskLevel}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-border">
              <button className="flex-1 text-accent font-medium text-sm py-2 hover:bg-primary/10 rounded-lg transition-colors">
                View Master
              </button>
              <button className="flex-1 border border-primary text-primary font-medium text-sm py-2 rounded-lg hover:bg-primary/10 transition-colors">
                Edit Choice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
