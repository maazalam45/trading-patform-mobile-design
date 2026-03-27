import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type AccountStatus = "Active" | "Inactive";
type AccountKind = "live" | "demo";

type AccountRow = {
  id: string;
  name: string;
  type: AccountKind;
  leverage: string;
  balance: number;
  status: AccountStatus;
};

type AccountForm = {
  name: string;
  type: AccountKind;
  leverage: string;
  status: AccountStatus;
};

const LEVERAGE_OPTIONS = ["No Leverage", "10", "20", "30", "50", "100"];

const initialAccounts: AccountRow[] = [
  {
    id: "1",
    name: "Maaz Alam",
    type: "demo",
    leverage: "50",
    balance: 9827.66,
    status: "Active",
  },
];

const initialForm: AccountForm = {
  name: "",
  type: "live",
  leverage: "No Leverage",
  status: "Active",
};

export default function Accounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<AccountRow[]>(initialAccounts);
  const [query, setQuery] = useState("");

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [balanceModalOpen, setBalanceModalOpen] = useState(false);

  const [form, setForm] = useState<AccountForm>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [balanceId, setBalanceId] = useState<string | null>(null);
  const [balanceValue, setBalanceValue] = useState("");

  const filteredAccounts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return accounts;

    return accounts.filter((account) => {
      return (
        account.name.toLowerCase().includes(term) ||
        account.type.toLowerCase().includes(term) ||
        account.status.toLowerCase().includes(term)
      );
    });
  }, [accounts, query]);

  const liveAccounts = filteredAccounts.filter((account) => account.type === "live");
  const demoAccounts = filteredAccounts.filter((account) => account.type === "demo");

  const totalLiveBalance = accounts
    .filter((account) => account.type === "live")
    .reduce((sum, account) => sum + account.balance, 0);

  const openAddModal = (type: AccountKind) => {
    setForm({ ...initialForm, type });
    setAddModalOpen(true);
  };

  const openEditModal = (account: AccountRow) => {
    setEditingId(account.id);
    setForm({
      name: account.name,
      type: account.type,
      leverage: account.leverage,
      status: account.status,
    });
    setEditModalOpen(true);
  };

  const openBalanceModal = (account: AccountRow) => {
    setBalanceId(account.id);
    setBalanceValue(account.balance.toFixed(2));
    setBalanceModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    setForm(initialForm);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingId(null);
    setForm(initialForm);
  };

  const closeBalanceModal = () => {
    setBalanceModalOpen(false);
    setBalanceId(null);
    setBalanceValue("");
  };

  const handleSaveNewAccount = () => {
    if (!form.name.trim()) return;

    const next: AccountRow = {
      id: String(Date.now()),
      name: form.name.trim(),
      type: form.type,
      leverage: form.leverage,
      status: form.status,
      balance: 0,
    };

    setAccounts((prev) => [next, ...prev]);
    closeAddModal();
  };

  const handleSaveEditAccount = () => {
    if (!editingId || !form.name.trim()) return;

    setAccounts((prev) =>
      prev.map((account) => {
        if (account.id !== editingId) return account;
        return {
          ...account,
          name: form.name.trim(),
          type: form.type,
          leverage: form.leverage,
          status: form.status,
        };
      })
    );

    closeEditModal();
  };

  const handleUpdateBalance = () => {
    if (!balanceId) return;
    const parsed = Number(balanceValue);
    if (Number.isNaN(parsed)) return;

    setAccounts((prev) =>
      prev.map((account) => {
        if (account.id !== balanceId) return account;
        return { ...account, balance: parsed };
      })
    );

    closeBalanceModal();
  };

  const handleDelete = (id: string) => {
    setAccounts((prev) => prev.filter((account) => account.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-border rounded-xl p-4 md:p-6 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Account Management</h1>
            <p className="text-muted-foreground mt-1">
              You have {accounts.length} account(s) total. Displaying entries 1 to {Math.max(accounts.length, 1)}.
            </p>
          </div>

          <div className="w-full md:w-[340px]">
            <label className="text-sm font-medium text-foreground">Filter Configure</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2"
              placeholder="Search account name / type / status"
            />
          </div>
        </div>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-foreground">Live Accounts</h2>
            <button
              onClick={() => openAddModal("live")}
              className="rounded-md border border-border bg-white px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Add a LIVE Account
            </button>
          </div>

          <AccountsTable
            rows={liveAccounts}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onUpdateBalance={openBalanceModal}
            onOpenTradingPlatform={(account) =>
              navigate(`/trading-platform/${account.id}`, { state: { account } })
            }
          />

          <p className="text-base">Total Live Balance: {formatMoney(totalLiveBalance)}</p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-foreground">Demo Accounts</h2>
            <button
              onClick={() => openAddModal("demo")}
              className="rounded-md border border-border bg-white px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Add a DEMO Account
            </button>
          </div>

          <AccountsTable
            rows={demoAccounts}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onUpdateBalance={openBalanceModal}
            onOpenTradingPlatform={(account) =>
              navigate(`/trading-platform/${account.id}`, { state: { account } })
            }
          />

          <p className="text-sm text-muted-foreground">
            Note: the leverage on Demo accounts will mirror the leverage on live accounts, anywhere up to 100:1 for some currency pairs.
          </p>
        </section>
      </div>

      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="sm:max-w-[620px] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Add {form.type.toUpperCase()} Account
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-4">
            <AccountFormFields form={form} onChange={setForm} />
            <button
              onClick={handleSaveNewAccount}
              className="rounded-md bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700"
            >
              Save Account
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[620px] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Edit Account
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-4">
            <AccountFormFields form={form} onChange={setForm} />
            <button
              onClick={handleSaveEditAccount}
              className="rounded-md bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700"
            >
              Save Account
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={balanceModalOpen} onOpenChange={setBalanceModalOpen}>
        <DialogContent className="sm:max-w-[620px] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Update Balance
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-2">
              <label className="text-lg font-medium text-foreground">Balance USD</label>
              <input
                type="number"
                value={balanceValue}
                onChange={(e) => setBalanceValue(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5"
              />
            </div>

            <button
              onClick={handleUpdateBalance}
              className="rounded-md bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700"
            >
              Update Balance
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AccountFormFields({
  form,
  onChange,
}: {
  form: AccountForm;
  onChange: (next: AccountForm) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-lg font-medium text-foreground">Account Name</label>
        <input
          value={form.name}
          onChange={(e) => onChange({ ...form, name: e.target.value })}
          className="w-full rounded-md border border-border bg-background px-3 py-2.5"
        />
      </div>

      <div className="space-y-2">
        <label className="text-lg font-medium text-foreground">Account Type</label>
        <input
          value={form.type}
          onChange={(e) => onChange({ ...form, type: e.target.value as AccountKind })}
          className="w-full rounded-md border border-border bg-background px-3 py-2.5"
        />
      </div>

      <div className="space-y-2">
        <label className="text-lg font-medium text-foreground">Leverage</label>
        <select
          value={form.leverage}
          onChange={(e) => onChange({ ...form, leverage: e.target.value })}
          className="w-full rounded-md border border-border bg-background px-3 py-2.5"
        >
          {LEVERAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-lg font-medium text-foreground">Status</label>
        <select
          value={form.status}
          onChange={(e) => onChange({ ...form, status: e.target.value as AccountStatus })}
          className="w-full rounded-md border border-border bg-background px-3 py-2.5"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}

function AccountsTable({
  rows,
  onEdit,
  onDelete,
  onUpdateBalance,
  onOpenTradingPlatform,
}: {
  rows: AccountRow[];
  onEdit: (account: AccountRow) => void;
  onDelete: (id: string) => void;
  onUpdateBalance: (account: AccountRow) => void;
  onOpenTradingPlatform: (account: AccountRow) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full min-w-[820px] text-sm">
        <thead>
          <tr className="bg-muted/30 border-b border-border">
            <th className="px-3 py-3 text-left font-semibold">Account Name</th>
            <th className="px-3 py-3 text-left font-semibold">Account Type</th>
            <th className="px-3 py-3 text-left font-semibold">Leverage</th>
            <th className="px-3 py-3 text-left font-semibold">Balance USD</th>
            <th className="px-3 py-3 text-left font-semibold">Status</th>
            <th className="px-3 py-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">
                No accounts found.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="px-3 py-3">{row.name}</td>
                <td className="px-3 py-3">{row.type === "demo" ? "Demo" : "Live"}</td>
                <td className="px-3 py-3">{row.leverage}</td>
                <td className="px-3 py-3">{formatMoney(row.balance)}</td>
                <td className="px-3 py-3">{row.status}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3 text-sm">
                    <button
                      onClick={() => onEdit(row)}
                      className="inline-flex items-center text-foreground hover:text-primary"
                      title="Edit account"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(row.id)}
                      className="inline-flex items-center text-foreground hover:text-red-600"
                      title="Delete account"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onOpenTradingPlatform(row)}
                      className="text-green-600 hover:text-green-700"
                    >
                      Trading Platform
                    </button>
                    <button
                      onClick={() => onUpdateBalance(row)}
                      className="inline-flex items-center text-foreground hover:text-primary"
                      title="Update balance"
                    >
                      <DollarSign className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function formatMoney(value: number) {
  return `$ ${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
