import { useState } from "react";
import { Plus, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

interface DepositRequest {
  id: string;
  date: string;
  method: string;
  amount: number;
  currency: string;
  status: "Pending" | "Approved" | "Rejected";
  account: string;
}

const deposits: DepositRequest[] = [
  {
    id: "1",
    date: "2026-03-10 14:22:00",
    method: "Bank Transfer",
    amount: 5000,
    currency: "USD",
    status: "Approved",
    account: "LIVE1",
  },
  {
    id: "2",
    date: "2026-03-08 10:15:00",
    method: "Credit Card",
    amount: 2500,
    currency: "USD",
    status: "Approved",
    account: "DEMO1",
  },
  {
    id: "3",
    date: "2026-03-05 16:45:00",
    method: "Crypto Wallet",
    amount: 3000,
    currency: "USD",
    status: "Pending",
    account: "LIVE1",
  },
  {
    id: "4",
    date: "2026-02-28 09:30:00",
    method: "Bank Transfer",
    amount: 10000,
    currency: "USD",
    status: "Approved",
    account: "LIVE1",
  },
];

export default function Deposits() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(deposits.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Deposits</h1>
          <p className="text-muted-foreground mt-1">
            Manage your deposit requests and transaction history
          </p>
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Deposit
        </button>
      </div>

      {/* Deposits Table */}
      <div className="bg-white border border-border rounded-xl p-6 overflow-x-auto">
        <h2 className="text-xl font-bold text-foreground mb-4">Deposit Requests</h2>
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
            {deposits.map((deposit) => (
              <tr
                key={deposit.id}
                className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <td className="py-4 px-2 text-foreground">{deposit.date}</td>
                <td className="py-4 px-2 text-foreground font-medium">
                  {deposit.method}
                </td>
                <td className="py-4 px-2 text-foreground font-semibold">
                  ${deposit.amount.toLocaleString()}
                </td>
                <td className="py-4 px-2 text-foreground">{deposit.account}</td>
                <td className="py-4 px-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(deposit.status)}`}>
                    {deposit.status}
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
            Showing 1 to {Math.min(itemsPerPage, deposits.length)} of{" "}
            {deposits.length} entries
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
