import React, { useState } from 'react';
import WelcomeHero from '@/components/dashboard/WelcomeHero';
import ActiveCardsCarousel from '@/components/dashboard/ActiveCardsCarousel';
import CreditScoreRing from '@/components/dashboard/CreditScoreRing';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { MintCardModal } from '@/components/modals/MintCardModal';
import { QuickSpendModal } from '@/components/modals/QuickSpendModal';
import { PayNowModal } from '@/components/modals/PayNowModal';
import { TrendingUp, Zap, Clock, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';

const QuickStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <div className="card-glass p-6 text-center">
      <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
        <TrendingUp className="h-6 w-6 text-primary-foreground" />
      </div>
      <div className="text-2xl font-bold">₹32,750</div>
      <div className="text-sm text-muted-foreground">Total Credit Limit</div>
    </div>
    
    <div className="card-glass p-6 text-center">
      <div className="h-12 w-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-3">
        <Zap className="h-6 w-6 text-secondary-foreground" />
      </div>
      <div className="text-2xl font-bold">₹8,430</div>
      <div className="text-sm text-muted-foreground">This Month Spent</div>
    </div>
    
    <div className="card-glass p-6 text-center">
      <div className="h-12 w-12 bg-gradient-to-r from-accent to-accent-light rounded-full flex items-center justify-center mx-auto mb-3">
        <Clock className="h-6 w-6 text-accent-foreground" />
      </div>
      <div className="text-2xl font-bold">₹1,250</div>
      <div className="text-sm text-muted-foreground">Next Payment Due</div>
    </div>
    
    <div className="card-glass p-6 text-center">
      <div className="h-12 w-12 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-3">
        <Gift className="h-6 w-6 text-success-foreground" />
      </div>
      <div className="text-2xl font-bold">1,247</div>
      <div className="text-sm text-muted-foreground">CT Tokens Earned</div>
    </div>
  </div>
);

const UpcomingPayments = ({ onPayNow }: { onPayNow: () => void }) => (
  <div className="card-glass p-6">
    <h3 className="text-lg font-semibold mb-4">Upcoming Payments</h3>
    <div className="space-y-3">
      <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg border border-warning/20">
        <div>
          <div className="font-medium">Premium Card EMI</div>
          <div className="text-sm text-muted-foreground">Due in 3 days</div>
        </div>
        <div className="text-right">
          <div className="font-semibold">₹1,250</div>
          <Button size="sm" className="mt-1" onClick={onPayNow}>Pay Now</Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
        <div>
          <div className="font-medium">Standard Card EMI</div>
          <div className="text-sm text-muted-foreground">Due in 18 days</div>
        </div>
        <div className="text-right">
          <div className="font-semibold">₹800</div>
          <Button variant="outline" size="sm" className="mt-1" onClick={onPayNow}>Schedule</Button>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { isConnected } = useAccount();
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const [isQuickSpendOpen, setIsQuickSpendOpen] = useState(false);
  const [isPayNowOpen, setIsPayNowOpen] = useState(false);

  if (!isConnected) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Clen 3.0</h1>
          <p className="text-xl text-muted-foreground mb-8">Connect your wallet to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Welcome Hero Section */}
      <WelcomeHero 
        onMintCard={() => setIsMintModalOpen(true)}
        onQuickSpend={() => setIsQuickSpendOpen(true)}
        onPayNow={() => setIsPayNowOpen(true)}
      />
      
      {/* Quick Stats */}
      <QuickStats />
      
      {/* Active Cards */}
      <ActiveCardsCarousel />
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credit Score */}
        <CreditScoreRing />
        
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
      
      {/* Upcoming Payments */}
      <UpcomingPayments onPayNow={() => setIsPayNowOpen(true)} />

      {/* Modals */}
      <MintCardModal isOpen={isMintModalOpen} onClose={() => setIsMintModalOpen(false)} />
      <QuickSpendModal isOpen={isQuickSpendOpen} onClose={() => setIsQuickSpendOpen(false)} />
      <PayNowModal isOpen={isPayNowOpen} onClose={() => setIsPayNowOpen(false)} />
    </div>
  );
};

export default Dashboard;