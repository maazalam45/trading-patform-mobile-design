import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Transfer() {
  const location = useLocation();
  const [fromAccount, setFromAccount] = useState("(default)");
  const [toAccount, setToAccount] = useState("(default)");
  const [amount, setAmount] = useState("");

  const accounts = ["(default)", "DEMO1", "DEMO2", "LIVE1"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Transfer submitted:", { fromAccount, toAccount, amount });
  };

  const titleMap: Record<string, string> = {
    "/transfer/wallet-to-account": "Transfer Wallet to Account",
    "/transfer/account-to-wallet": "Transfer Account to Wallet",
    "/transfer/account-to-account": "Transfer Account to Account",
  };

  const title = titleMap[location.pathname] || "Transfer";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-1">
          Select an account to withdraw from
        </p>
      </div>

      <div className="bg-white border border-border rounded-xl p-6 md:p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Select an account to withdraw from
            </label>
            <select
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              {accounts.map((account) => (
                <option key={account} value={account}>
                  {account}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Select an account to transfer into
            </label>
            <select
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              {accounts.map((account) => (
                <option key={account} value={account}>
                  {account}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Enter a transfer amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Transfer
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
    </div>
  );
}
