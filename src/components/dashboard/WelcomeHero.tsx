import React from 'react';
import { Sparkles, TrendingUp, Wallet, Zap, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface WelcomeHeroProps {
  onMintCard?: () => void;
  onQuickSpend?: () => void;
  onPayNow?: () => void;
}

const WelcomeHero = ({ onMintCard, onQuickSpend, onPayNow }: WelcomeHeroProps) => {
  const navigate = useNavigate();
  return <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 text-primary-foreground">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-glass"></div>
      <div className="absolute top-4 right-4 opacity-20">
        <Sparkles className="h-32 w-32" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
            <p className="text-primary-foreground/80 text-lg">
              Your Web3 credit journey continues to grow
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">+5.2% this week</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Wallet className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Total Balance</span>
            </div>
            <div className="text-2xl font-bold">₹24,580</div>
            <div className="text-xs opacity-75">Across 3 active cards</div>
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Credit Score</span>
            </div>
            <div className="text-2xl font-bold">742</div>
            <div className="text-xs opacity-75">Excellent rating</div>
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">CT Rewards</span>
            </div>
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-xs opacity-75">Ready to redeem</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button 
            className="bg-white/10 hover:bg-white/20 text-primary-foreground border border-white/20"
            onClick={onMintCard}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Mint New Card
          </Button>
          <Button 
            className="bg-white/10 hover:bg-white/20 text-primary-foreground border border-white/20"
            onClick={onQuickSpend}
          >
            <Zap className="h-4 w-4 mr-2" />
            Quick Spend
          </Button>
          <Button 
            className="bg-white/10 hover:bg-white/20 text-primary-foreground border border-white/20"
            onClick={onPayNow}
          >
            <Wallet className="h-4 w-4 mr-2" />
            Pay Now
          </Button>
          <Button 
            variant="outline" 
            className="border-white/20 text-primary-foreground hover:bg-white/10"
            onClick={() => navigate('/spend-analysis')}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>
    </div>;
};
export default WelcomeHero;