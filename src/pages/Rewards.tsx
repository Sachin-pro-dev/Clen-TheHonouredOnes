import React from 'react';
import { Gift, Star, Trophy, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Rewards = () => {
  const ctBalance = 1247;
  const loyaltyPoints = 3420;
  const nextTierPoints = 5000;
  const progressToNextTier = (loyaltyPoints / nextTierPoints) * 100;

  const recentRewards = [
    {
      id: 1,
      type: 'cashback',
      amount: 25,
      source: 'Amazon Purchase',
      date: '2024-01-15',
      status: 'earned'
    },
    {
      id: 2,
      type: 'bonus',
      amount: 100,
      source: 'On-time Payment Bonus',
      date: '2024-01-14',
      status: 'earned'
    },
    {
      id: 3,
      type: 'referral',
      amount: 500,
      source: 'Friend Referral',
      date: '2024-01-12',
      status: 'earned'
    }
  ];

  const redemptionOptions = [
    {
      id: 1,
      title: 'Transfer to Wallet',
      description: 'Convert CT tokens to USDT',
      rate: '1 CT = ₹0.8',
      minAmount: 100,
      icon: ArrowRight,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Shopping Vouchers',
      description: 'Amazon, Flipkart, Zomato vouchers',
      rate: '1 CT = ₹1.0',
      minAmount: 500,
      icon: Gift,
      gradient: 'from-green-500 to-teal-500'
    },
    {
      id: 3,
      title: 'Premium Benefits',
      description: 'Unlock exclusive features',
      rate: 'Special pricing',
      minAmount: 1000,
      icon: Star,
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Card Minted',
      description: 'Welcome to Clen!',
      points: 100,
      earned: true,
      icon: '🎉'
    },
    {
      id: 2,
      title: 'Spending Streak',
      description: '7 days consecutive spending',
      points: 250,
      earned: true,
      icon: '🔥'
    },
    {
      id: 3,
      title: 'Payment Hero',
      description: '10 on-time payments',
      points: 300,
      earned: false,
      progress: 7,
      total: 10,
      icon: '⚡'
    },
    {
      id: 4,
      title: 'Social Butterfly',
      description: 'Refer 5 friends',
      points: 500,
      earned: false,
      progress: 2,
      total: 5,
      icon: '🦋'
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Rewards & Loyalty</h1>
        <p className="text-muted-foreground">Earn CT tokens and unlock exclusive benefits</p>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card-glass p-6 text-center">
          <div className="h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="text-3xl font-bold text-primary mb-2">{ctBalance.toLocaleString()}</div>
          <div className="text-muted-foreground">CT Tokens</div>
          <div className="text-sm text-success mt-2">≈ ₹{(ctBalance * 0.8).toLocaleString()}</div>
        </div>

        <div className="card-glass p-6 text-center">
          <div className="h-16 w-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-secondary-foreground" />
          </div>
          <div className="text-3xl font-bold text-secondary mb-2">{loyaltyPoints.toLocaleString()}</div>
          <div className="text-muted-foreground">Loyalty Points</div>
          <div className="text-sm text-info mt-2">Silver Tier</div>
        </div>

        <div className="card-glass p-6">
          <div className="flex items-center gap-3 mb-4">
            <Star className="h-8 w-8 text-warning" />
            <div>
              <div className="font-semibold">Next Tier: Gold</div>
              <div className="text-sm text-muted-foreground">
                {nextTierPoints - loyaltyPoints} points to go
              </div>
            </div>
          </div>
          <Progress value={progressToNextTier} className="mb-2" />
          <div className="text-xs text-muted-foreground">
            {progressToNextTier.toFixed(1)}% complete
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Rewards */}
        <div className="card-glass p-6">
          <h3 className="text-lg font-semibold mb-6">Recent Rewards</h3>
          <div className="space-y-4">
            {recentRewards.map((reward) => (
              <div key={reward.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-medium">{reward.source}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(reward.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-success">+{reward.amount} CT</div>
                  <div className="text-xs text-muted-foreground capitalize">{reward.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="card-glass p-6">
          <h3 className="text-lg font-semibold mb-6">Achievements</h3>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`p-4 rounded-lg border ${
                achievement.earned ? 'bg-success/10 border-success/20' : 'bg-muted/30 border-border'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <div className="font-medium">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                  </div>
                  <Badge className={achievement.earned ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}>
                    {achievement.points} CT
                  </Badge>
                </div>
                
                {!achievement.earned && achievement.progress !== undefined && (
                  <div className="mt-3">
                    <Progress value={(achievement.progress / achievement.total) * 100} className="mb-1" />
                    <div className="text-xs text-muted-foreground">
                      {achievement.progress} / {achievement.total}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Redemption Options */}
      <div className="card-glass p-6">
        <h3 className="text-lg font-semibold mb-6">Redeem Your Tokens</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {redemptionOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div key={option.id} className="border border-border rounded-lg p-6 hover:shadow-card transition-all cursor-pointer group">
                <div className={`h-12 w-12 bg-gradient-to-br ${option.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                
                <h4 className="font-semibold mb-2">{option.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                
                <div className="text-sm font-medium text-primary mb-3">{option.rate}</div>
                <div className="text-xs text-muted-foreground mb-4">
                  Min: {option.minAmount} CT
                </div>
                
                <Button 
                  className="w-full"
                  variant={ctBalance >= option.minAmount ? "default" : "outline"}
                  disabled={ctBalance < option.minAmount}
                >
                  {ctBalance >= option.minAmount ? 'Redeem Now' : 'Insufficient Balance'}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Referral Program */}
      <div className="mt-8 card-glass p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Users className="h-6 w-6" />
              Refer Friends, Earn More
            </h3>
            <p className="text-muted-foreground mb-4">
              Invite friends and earn 500 CT tokens for each successful referral
            </p>
            <Button className="btn-primary">
              Share Invite Link
            </Button>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">2</div>
            <div className="text-sm text-muted-foreground">Friends referred</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;