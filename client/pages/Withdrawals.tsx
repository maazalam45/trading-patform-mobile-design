import { useState } from "react";
import { Plus, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

interface WithdrawalRequest {
  id: string;
  date: string;
  method: string;
  amount: number;
  currency: string;
  status: "Pending" | "Processing" | "Completed" | "Failed";
  account: string;
}

const withdrawals: WithdrawalRequest[] = [
  {
    id: "1",
    date: "2026-03-12 11:30:00",
    method: "Bank Transfer",
    amount: 2500,
    currency: "USD",
    status: "Processing",
    account: "LIVE1",
  },
  {
    id: "2",
    date: "2026-03-09 15:20:00",
    method: "Crypto Wallet",
    amount: 1500,
    currency: "USD",
    status: "Completed",
    account: "DEMO1",
  },
  {
    id: "3",
    date: "2026-03-01 09:45:00",
    method: "Bank Transfer",
    amount: 5000,
    currency: "USD",
    status: "Completed",
    account: "LIVE1",
  },
  {
    id: "4",
    date: "2026-02-25 14:15:00",
    method: "Credit Card",
    amount: 1000,
    currency: "USD",
    status: "Failed",
    account: "DEMO1",
  },
];

export default function Withdrawals() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(withdrawals.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Withdrawals</h1>
          <p className="text-muted-foreground mt-1">
            Manage your withdrawal requests and transaction history
          </p>
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Withdrawal
        </button>
      </div>

      {/* Withdrawals Table */}
      <div className="bg-white border border-border rounded-xl p-6 overflow-x-auto">
        <h2 className="text-xl font-bold text-foreground mb-4">Withdrawal Requests</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Date
              </th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Method
              </th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Amount
              </th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Account
              </th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Status
              </th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal) => (
              <tr
                key={withdrawal.id}
                className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <td className="py-4 px-2 text-foreground">{withdrawal.date}</td>
                <td className="py-4 px-2 text-foreground font-medium">
                  {withdrawal.method}
                </td>
                <td className="py-4 px-2 text-foreground font-semibold">
                  ${withdrawal.amount.toLocaleString()}
                </td>
                <td className="py-4 px-2 text-foreground">{withdrawal.account}</td>
                <td className="py-4 px-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(withdrawal.status)}`}>
                    {withdrawal.status}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-muted rounded transition-colors">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing 1 to {Math.min(itemsPerPage, withdrawals.length)} of{" "}
            {withdrawals.length} entries
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
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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
