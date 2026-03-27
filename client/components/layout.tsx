import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ComponentType } from "react";
import {
  Wallet,
  Send,
  User,
  TrendingUp,
  BarChart3,
  LifeBuoy,
  BookOpen,
  CircleHelp,
  Bell,
  DollarSign,
  CreditCard,
  ScrollText,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ChevronDown,
  Landmark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth";

type MenuItem = {
  label: string;
  path?: string;
  icon: ComponentType<{ className?: string }>;
  children?: { label: string; path: string }[];
};

export default function Layout() {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [masterOpen, setMasterOpen] = useState(true);

  const menuItems: MenuItem[] = [
    { label: "Account Management", path: "/accounts", icon: Wallet },
    { label: "Transfer Wallet to Account", path: "/transfer/wallet-to-account", icon: Send },
    { label: "Transfer Account to Wallet", path: "/transfer/account-to-wallet", icon: Send },
    { label: "Transfer Account to Account", path: "/transfer/account-to-account", icon: Send },
    { label: "Display Wallets", path: "/wallets", icon: Landmark },
    { label: "User Profile & Settings", path: "/profile", icon: User },
    {
      label: "Master Trading",
      icon: TrendingUp,
      children: [
        { label: "Request Master Status", path: "/master/request" },
        { label: "Choose a Master Trader", path: "/master/choose" },
      ],
    },
    { label: "Reporting & Analysis", path: "/reporting", icon: BarChart3 },
    { label: "Support & Help", path: "/support-help", icon: LifeBuoy },
    { label: "Tutorials", path: "/tutorials", icon: BookOpen },
    { label: "FAQ", path: "/faq", icon: CircleHelp },
    { label: "Notification & Alerts", path: "/notifications-alerts", icon: Bell },
    { label: "Deposits", path: "/deposits", icon: DollarSign },
    { label: "Withdrawals", path: "/withdrawals", icon: CreditCard },
    { label: "Log & Audit Trail", path: "/audit-trail", icon: ScrollText },
  ];

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const isMasterActive =
    location.pathname.startsWith("/master/request") ||
    location.pathname.startsWith("/master/choose") ||
    location.pathname === "/master";

  const getMobileHeaderTitle = () => {
    const path = location.pathname;

    if (path === "/" || path.startsWith("/accounts")) return "Account Management";
    if (path.startsWith("/transfer/wallet-to-account")) return "Transfer Wallet to Account";
    if (path.startsWith("/transfer/account-to-wallet")) return "Transfer Account to Wallet";
    if (path.startsWith("/transfer/account-to-account") || path.startsWith("/transfer")) {
      return "Transfer Account to Account";
    }
    if (path.startsWith("/wallets")) return "Display Wallets";
    if (path.startsWith("/profile")) return "User Profile & Settings";
    if (path.startsWith("/trading-platform")) return "Trading Platform";
    if (path.startsWith("/master/request")) return "Request Master Status";
    if (path.startsWith("/master/choose")) return "Choose a Master Trader";
    if (path.startsWith("/master")) return "Master Trading";
    if (path.startsWith("/reporting")) return "Reporting & Analysis";
    if (path.startsWith("/support-help")) return "Support & Help";
    if (path.startsWith("/tutorials")) return "Tutorials";
    if (path.startsWith("/faq")) return "FAQ";
    if (path.startsWith("/notifications-alerts")) return "Notification & Alerts";
    if (path.startsWith("/deposits")) return "Deposits";
    if (path.startsWith("/withdrawals")) return "Withdrawals";
    if (path.startsWith("/audit-trail")) return "Log & Audit Trail";

    return "4xbrokers";
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate("/login", { replace: true });
  };

  const renderMenu = (mobile = false) => (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {menuItems.map((item) => {
        if (item.children) {
          return (
            <div key={item.label} className="space-y-1">
              <button
                onClick={() => setMasterOpen((prev) => !prev)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  isMasterActive
                    ? "bg-sidebar-primary text-primary-foreground"
                    : "text-primary-foreground/85 hover:text-primary-foreground hover:bg-primary/80"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                {masterOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {masterOpen && (
                <div className="ml-5 space-y-1 border-l border-primary/30 pl-3">
                  {item.children.map((child) => (
                    <button
                      key={child.path}
                      onClick={() => handleNavClick(child.path)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        isActive(child.path)
                          ? "bg-sidebar-primary text-primary-foreground"
                          : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
                      )}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return mobile ? (
          <button
            key={item.label}
            onClick={() => handleNavClick(item.path!)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
              isActive(item.path!)
                ? "bg-sidebar-primary text-primary-foreground"
                : "text-primary-foreground/85 hover:text-primary-foreground hover:bg-primary/80"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm text-left">{item.label}</span>
          </button>
        ) : (
          <Link
            key={item.label}
            to={item.path!}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
              isActive(item.path!)
                ? "bg-sidebar-primary text-primary-foreground"
                : "text-primary-foreground/85 hover:text-primary-foreground hover:bg-primary/80"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside
        className={cn(
          "hidden md:flex w-72 bg-primary text-primary-foreground flex-col border-r border-border",
          !desktopSidebarOpen && "md:hidden"
        )}
      >
        <div className="p-6">
          <div className="text-3xl font-semibold tracking-wide">4xbrokers</div>
          <div className="mt-5 h-px bg-primary-foreground/30" />
        </div>

        {renderMenu()}

        <div className="px-3 py-4 border-t border-primary/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-primary-foreground/85 hover:text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-72 bg-primary text-primary-foreground z-40 md:hidden transform transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <div>
            <div className="text-3xl font-semibold tracking-wide">4xbrokers</div>
            <div className="mt-5 h-px bg-primary-foreground/30" />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 hover:bg-primary/80 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {renderMenu(true)}

        <div className="px-3 py-4 border-t border-primary/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-primary-foreground/85 hover:text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col w-full">
        <div className="hidden md:flex bg-white border-b border-border px-6 py-3 items-center justify-between gap-3 sticky top-0 z-20">
          <button
            onClick={() => setDesktopSidebarOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            aria-label={desktopSidebarOpen ? "Close menu" : "Open menu"}
            title={desktopSidebarOpen ? "Close menu" : "Open menu"}
          >
            {desktopSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            Menu
          </button>

          <div className="flex items-center gap-3 min-w-0">
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
        </div>

        <div className="md:hidden bg-primary text-primary-foreground px-4 py-4 flex items-center gap-2 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-primary/80 rounded shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="flex-1 min-w-0 text-sm font-semibold truncate text-center px-1">
            {getMobileHeaderTitle()}
          </h1>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-primary/80 rounded shrink-0"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto w-full md:pb-0">
          <div className="p-3 sm:p-4 md:p-6 max-w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
