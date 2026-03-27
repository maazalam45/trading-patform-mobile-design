import { Eye, EyeOff, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  leverage: string;
  status: "active" | "inactive";
}

const demoAccounts: Account[] = [
  {
    id: "1",
    name: "DEMO1",
    type: "Demo",
    balance: 5000,
    leverage: "50",
    status: "active",
  },
  {
    id: "2",
    name: "DEMO2",
    type: "Demo",
    balance: 10000,
    leverage: "100",
    status: "active",
  },
  {
    id: "3",
    name: "LIVE1",
    type: "Live",
    balance: 25000,
    leverage: "30",
    status: "active",
  },
];

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const totalBalance = demoAccounts.reduce((sum, acc) => sum + acc.balance, 0);

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Account Management</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Manage your trading accounts and balances
        </p>
      </div>

      {/* Total Balance Card */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-primary-foreground/80 font-medium mb-2 text-xs md:text-sm">
              Total Balance
            </p>
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <h2 className="text-2xl md:text-4xl font-bold truncate">
                {showBalance ? formatCurrency(totalBalance) : "••••••"}
              </h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-primary/80 rounded-lg transition-colors flex-shrink-0"
              >
                {showBalance ? (
                  <Eye className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <EyeOff className="w-5 h-5 md:w-6 md:h-6" />
                )}
              </button>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-primary-foreground/80 text-xs md:text-sm">Accounts</p>
            <p className="text-2xl md:text-3xl font-bold">{demoAccounts.length}</p>
          </div>
        </div>
      </div>

      {/* Accounts Section */}
      <div>
        <div className="flex items-center justify-between mb-4 gap-2">
          <h2 className="text-lg md:text-xl font-bold text-foreground">Your Accounts</h2>
          <button className="text-accent font-medium text-xs md:text-sm hover:text-accent/80 transition-colors whitespace-nowrap">
            + Add
          </button>
        </div>

        <div className="space-y-3">
          {demoAccounts.map((account) => (
            <div
              key={account.id}
              className="bg-white border border-border rounded-lg md:rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground text-sm md:text-base">
                        {account.name}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {account.type}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                        account.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {account.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        Balance
                      </p>
                      <p className="font-semibold text-foreground text-sm md:text-base truncate">
                        {formatCurrency(account.balance)}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        Leverage
                      </p>
                      <p className="font-semibold text-foreground text-sm md:text-base">
                        1:{account.leverage}
                      </p>
                    </div>
                  </div>
                </div>

                <button className="p-2 md:p-3 hover:bg-muted rounded-lg transition-colors flex-shrink-0">
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <button className="bg-white border border-border rounded-lg md:rounded-xl p-3 md:p-4 text-center hover:shadow-md transition-shadow">
          <p className="font-semibold text-foreground text-sm md:text-base mb-1">Transfer</p>
          <p className="text-xs text-muted-foreground">Move funds</p>
        </button>
        <button className="bg-white border border-border rounded-lg md:rounded-xl p-3 md:p-4 text-center hover:shadow-md transition-shadow">
          <p className="font-semibold text-foreground text-sm md:text-base mb-1">Master</p>
          <p className="text-xs text-muted-foreground">Request traders</p>
        </button>
      </div>
    </div>
  );
}
