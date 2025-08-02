import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './lib/wagmi';
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import MyCards from "./pages/MyCards";
import MintCard from "./pages/MintCard";
import Transactions from "./pages/Transactions";
import CreditProfile from "./pages/CreditProfile";
import Repayments from "./pages/Repayments";
import RepaymentsInDepth from "./pages/RepaymentsInDepth";
import Rewards from "./pages/Rewards";
import SpendAnalysis from "./pages/SpendAnalysis";
import AIAssistant from "./pages/AIAssistant";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SidebarProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="cards" element={<MyCards />} />
                  <Route path="mint-card" element={<MintCard />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="credit-profile" element={<CreditProfile />} />
                  <Route path="repayments" element={<Repayments />} />
                  <Route path="repayments-in-depth" element={<RepaymentsInDepth />} />
                  <Route path="rewards" element={<Rewards />} />
                  <Route path="spend-analysis" element={<SpendAnalysis />} />
                  <Route path="ai-assistant" element={<AIAssistant />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SidebarProvider>
          </BrowserRouter>
        </TooltipProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
