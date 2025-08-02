import React from 'react';
import { TrendingUp, Target, Award, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const CreditProfile = () => {
  const creditScore = 742;
  const maxScore = 850;
  const scorePercentage = (creditScore / maxScore) * 100;

  const scoreFactors = [
    { name: 'Payment History', score: 95, weight: 40, status: 'excellent' },
    { name: 'Transaction Volume', score: 78, weight: 30, status: 'good' },
    { name: 'Account Age', score: 65, weight: 20, status: 'fair' },
    { name: 'Merchant Diversity', score: 85, weight: 10, status: 'good' }
  ];

  const milestones = [
    { score: 600, label: 'Good Credit', achieved: true },
    { score: 700, label: 'Very Good Credit', achieved: true },
    { score: 750, label: 'Excellent Credit', achieved: false, current: true },
    { score: 800, label: 'Elite Credit', achieved: false }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-info';
    if (score >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getStatusBadge = (status) => {
    const variants = {
      excellent: 'bg-success/10 text-success',
      good: 'bg-info/10 text-info', 
      fair: 'bg-warning/10 text-warning',
      poor: 'bg-destructive/10 text-destructive'
    };
    return variants[status] || variants.fair;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Credit Profile</h1>
        <p className="text-muted-foreground">Your Web3 CIBIL score and credit health</p>
      </div>

      {/* Credit Score Hero */}
      <div className="card-glass p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Credit Score</h2>
                <p className="text-muted-foreground">Last updated today</p>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="text-5xl font-bold text-primary">{creditScore}</span>
              <span className="text-xl text-muted-foreground ml-2">/ {maxScore}</span>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <Badge className="bg-success/10 text-success">
                <Award className="h-3 w-3 mr-1" />
                Excellent
              </Badge>
              <div className="flex items-center text-success text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12 this month
              </div>
            </div>

            <Progress value={scorePercentage} className="mb-4" />
            
            <p className="text-sm text-muted-foreground">
              You're in the top 15% of Clen users. Keep up the great work!
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="card-glass p-4 text-center">
                <div className="text-xl font-bold">18</div>
                <div className="text-xs text-muted-foreground">Points to next tier</div>
              </div>
              <div className="card-glass p-4 text-center">
                <div className="text-xl font-bold">142</div>
                <div className="text-xs text-muted-foreground">Days credit history</div>
              </div>
              <div className="card-glass p-4 text-center">
                <div className="text-xl font-bold">94%</div>
                <div className="text-xs text-muted-foreground">On-time payments</div>
              </div>
              <div className="card-glass p-4 text-center">
                <div className="text-xl font-bold">₹45K</div>
                <div className="text-xs text-muted-foreground">Total repaid</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Score Factors */}
        <div className="card-glass p-6">
          <h3 className="text-xl font-semibold mb-6">Score Factors</h3>
          <div className="space-y-6">
            {scoreFactors.map((factor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{factor.name}</span>
                  <Badge className={getStatusBadge(factor.status)}>
                    {factor.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={factor.score} className="flex-1" />
                  <span className={`text-sm font-semibold ${getScoreColor(factor.score)}`}>
                    {factor.score}%
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Weight: {factor.weight}% of total score
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Milestones */}
        <div className="card-glass p-6">
          <h3 className="text-xl font-semibold mb-6">Credit Milestones</h3>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                milestone.current ? 'bg-primary/10 border border-primary/20' : 
                milestone.achieved ? 'bg-success/10' : 'bg-muted/30'
              }`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  milestone.achieved ? 'bg-success text-success-foreground' :
                  milestone.current ? 'bg-primary text-primary-foreground' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {milestone.achieved ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-bold">{milestone.score}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{milestone.label}</div>
                  <div className="text-sm text-muted-foreground">
                    Score: {milestone.score}+
                  </div>
                </div>
                {milestone.current && (
                  <Badge className="bg-primary/10 text-primary">
                    <Target className="h-3 w-3 mr-1" />
                    Current Goal
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Improvement Tips */}
      <div className="mt-8 card-glass p-6">
        <h3 className="text-xl font-semibold mb-6">Improve Your Score</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Make Timely Payments</h4>
            <p className="text-sm text-muted-foreground">
              Continue your excellent payment history to maintain high scores
            </p>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <TrendingUp className="h-8 w-8 text-success mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Increase Transaction Volume</h4>
            <p className="text-sm text-muted-foreground">
              Regular usage shows active credit management
            </p>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Target className="h-8 w-8 text-info mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Diversify Spending</h4>
            <p className="text-sm text-muted-foreground">
              Shop at different merchant categories to show responsible usage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditProfile;