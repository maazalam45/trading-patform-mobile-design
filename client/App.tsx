import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot, type Root } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout";
import ProtectedRoute from "@/components/protected-route";
import { AuthProvider } from "@/context/auth";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";

// Main Pages
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transfer from "./pages/Transfer";
import Master from "./pages/Master";
import Profile from "./pages/Profile";

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
                <Route path="/" element={<Dashboard />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/transfer" element={<Transfer />} />
                <Route path="/master" element={<Master />} />
                <Route path="/profile" element={<Profile />} />

                {/* Account Management */}
                <Route path="/deposits" element={<Deposits />} />
                <Route path="/withdrawals" element={<Withdrawals />} />

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
