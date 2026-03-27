import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Wallet,
  Send,
  TrendingUp,
  User,
  Settings,
  LogOut,
  BarChart3,
  Eye,
  TrendingDown,
  Clock,
  Zap,
  DollarSign,
  CreditCard,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth";

export default function Layout() {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/accounts", label: "Accounts", icon: Wallet },
    { path: "/transfer", label: "Transfer", icon: Send },
    { path: "/master", label: "Master", icon: TrendingUp },
    { path: "/profile", label: "Profile", icon: User },
  ];

  const tradingItems = [
    { path: "/market-watch", label: "Market", icon: Eye },
    { path: "/trades", label: "Trades", icon: TrendingUp },
    { path: "/pending-trades", label: "Pending", icon: Clock },
    { path: "/charts", label: "Charts", icon: BarChart3 },
    { path: "/depth-of-market", label: "DOM", icon: Zap },
    { path: "/news-trades", label: "News", icon: Settings },
  ];

  const accountItems = [
    { path: "/deposits", label: "Deposits", icon: DollarSign },
    { path: "/withdrawals", label: "Withdrawals", icon: CreditCard },
    { path: "/reporting", label: "Reports", icon: BarChart3 },
    { path: "/history", label: "History", icon: TrendingDown },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-primary text-primary-foreground flex-col border-r border-border">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-lg">
              4X
            </div>
            <h1 className="text-xl font-bold">4xbrokers</h1>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
          {/* Main Navigation */}
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/60 font-semibold px-3 py-2">
              Main
            </p>
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  isActive(path)
                    ? "bg-sidebar-primary text-primary-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{label}</span>
              </Link>
            ))}
          </div>

          {/* Trading */}
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/60 font-semibold px-3 py-2">
              Trading
            </p>
            {tradingItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  isActive(path)
                    ? "bg-sidebar-primary text-primary-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{label}</span>
              </Link>
            ))}
          </div>

          {/* Account */}
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/60 font-semibold px-3 py-2">
              Account
            </p>
            {accountItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  isActive(path)
                    ? "bg-sidebar-primary text-primary-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-primary/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-primary text-primary-foreground z-40 md:hidden transform transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-lg">
              4X
            </div>
            <h1 className="text-xl font-bold">4xbrokers</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 hover:bg-primary/80 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
          {/* Main Navigation */}
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/60 font-semibold px-3 py-2">
              Main
            </p>
            {navItems.map(({ path, label, icon: Icon }) => (
              <button
                key={path}
                onClick={() => handleNavClick(path)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors",
                  isActive(path)
                    ? "bg-sidebar-primary text-primary-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{label}</span>
              </button>
            ))}
          </div>

          {/* Trading */}
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/60 font-semibold px-3 py-2">
              Trading
            </p>
            {tradingItems.map(({ path, label, icon: Icon }) => (
              <button
                key={path}
                onClick={() => handleNavClick(path)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors",
                  isActive(path)
                    ? "bg-sidebar-primary text-primary-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{label}</span>
              </button>
            ))}
          </div>

          {/* Account */}
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/60 font-semibold px-3 py-2">
              Account
            </p>
            {accountItems.map(({ path, label, icon: Icon }) => (
              <button
                key={path}
                onClick={() => handleNavClick(path)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors",
                  isActive(path)
                    ? "bg-sidebar-primary text-primary-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-primary/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full">
        {/* Desktop Header */}
        <div className="hidden md:flex bg-white border-b border-border px-6 py-3 items-center justify-end gap-3 sticky top-0 z-20">
          <span className="text-sm text-muted-foreground truncate max-w-[240px]">
            {user?.email}
          </span>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden bg-primary text-primary-foreground px-4 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-primary/80 rounded"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded flex items-center justify-center font-bold text-sm">
                4X
              </div>
              <h1 className="text-base font-bold">4xbrokers</h1>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="w-5 h-5" />
            <button
              onClick={handleLogout}
              className="p-1 hover:bg-primary/80 rounded"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto w-full pb-20 md:pb-0">
          <div className="p-3 sm:p-4 md:p-6 max-w-full">
            <Outlet />
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden bg-white border-t border-border grid grid-cols-5 gap-0 fixed bottom-0 left-0 right-0 z-20 md:hidden">
          {navItems.map(({ path, label, icon: Icon }) => (
            <button
              key={path}
              onClick={() => handleNavClick(path)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 transition-colors border-t-2",
                isActive(path)
                  ? "border-t-primary text-primary bg-primary/5"
                  : "border-t-transparent text-muted-foreground hover:text-primary"
              )}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-xs font-medium truncate">{label}</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
}
