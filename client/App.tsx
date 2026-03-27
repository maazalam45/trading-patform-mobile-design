import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot, type Root } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout";
import ProtectedRoute from "@/components/protected-route";
import { AuthProvider } from "@/context/auth";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";

// Main Pages
import Accounts from "./pages/Accounts";
import Transfer from "./pages/Transfer";
import Master from "./pages/Master";
import Profile from "./pages/Profile";
import TradingPlatform from "./pages/TradingPlatform";

// Account Management
import Deposits from "./pages/Deposits";
import Withdrawals from "./pages/Withdrawals";

// Trading & Analysis
import Reporting from "./pages/Reporting";
import MarketWatch from "./pages/MarketWatch";
import Trades from "./pages/Trades";
import PendingTrades from "./pages/PendingTrades";
import NewsTrades from "./pages/NewsTrades";
import History from "./pages/History";
import Charts from "./pages/Charts";
import DepthOfMarket from "./pages/DepthOfMarket";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white border border-border rounded-xl p-6 md:p-8">
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground mt-2">{description}</p>
    </div>
  );
}

export const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Guest-only routes */}
            <Route element={<ProtectedRoute guestOnly />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/otp-verification" element={<OtpVerification />} />
            </Route>

            {/* Authenticated routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/accounts" replace />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/transfer" element={<Navigate to="/transfer/account-to-account" replace />} />
                <Route path="/transfer/wallet-to-account" element={<Transfer />} />
                <Route path="/transfer/account-to-wallet" element={<Transfer />} />
                <Route path="/transfer/account-to-account" element={<Transfer />} />
                <Route path="/wallets" element={<PlaceholderPage title="Display Wallets" description="Wallet list and actions will be implemented here." />} />
                <Route path="/master" element={<Navigate to="/master/request" replace />} />
                <Route path="/master/request" element={<Master />} />
                <Route path="/master/choose" element={<Master />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/trading-platform/:accountId" element={<TradingPlatform />} />

                {/* Account Management */}
                <Route path="/deposits" element={<Deposits />} />
                <Route path="/withdrawals" element={<Withdrawals />} />
                <Route path="/support-help" element={<PlaceholderPage title="Support & Help" description="Support center and contact options will be implemented here." />} />
                <Route path="/tutorials" element={<PlaceholderPage title="Tutorials" description="Tutorial resources will be implemented here." />} />
                <Route path="/faq" element={<PlaceholderPage title="FAQ" description="Frequently asked questions will be implemented here." />} />
                <Route path="/notifications-alerts" element={<PlaceholderPage title="Notification & Alerts" description="Notifications center will be implemented here." />} />
                <Route path="/audit-trail" element={<PlaceholderPage title="Log & Audit Trail" description="Audit logs and activity trail will be implemented here." />} />

                {/* Trading & Analysis */}
                <Route path="/reporting" element={<Reporting />} />
                <Route path="/market-watch" element={<MarketWatch />} />
                <Route path="/trades" element={<Trades />} />
                <Route path="/pending-trades" element={<PendingTrades />} />
                <Route path="/news-trades" element={<NewsTrades />} />
                <Route path="/history" element={<History />} />
                <Route path="/charts" element={<Charts />} />
                <Route path="/depth-of-market" element={<DepthOfMarket />} />
              </Route>
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

// Create root only once and reuse for HMR updates
let root: Root | null = null;

function renderApp() {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  if (!root) {
    root = createRoot(rootElement);
  }
  root.render(<App />);
}

renderApp();

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    renderApp();
  });
}
