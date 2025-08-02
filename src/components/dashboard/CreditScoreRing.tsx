import React from 'react';
import { TrendingUp, Target, Award } from 'lucide-react';

const CreditScoreRing = () => {
  const score = 742;
  const maxScore = 850;
  const percentage = (score / maxScore) * 100;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getScoreColor = (score) => {
    if (score >= 750) return 'text-success';
    if (score >= 650) return 'text-info';
    if (score >= 550) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreLabel = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="card-glass p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Credit Score</h3>
        <Target className="h-5 w-5 text-primary" />
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg width="140" height="140" className="-rotate-90">
            {/* Background circle */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
              style={{
                filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.3))'
              }}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}
            </span>
            <span className="text-xs text-muted-foreground">of {maxScore}</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 ${getScoreColor(score)}`}>
          <Award className="h-4 w-4" />
          <span className="text-sm font-medium">{getScoreLabel(score)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-success">
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">+12</span>
          </div>
          <div className="text-muted-foreground">This month</div>
        </div>
        <div className="text-center">
          <div className="font-medium text-foreground">18</div>
          <div className="text-muted-foreground">Points to next tier</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground mb-2">Score Factors</div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs">Payment History</span>
            <span className="text-xs font-medium text-success">Excellent</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">Transaction Volume</span>
            <span className="text-xs font-medium text-info">Good</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">Account Age</span>
            <span className="text-xs font-medium text-warning">Fair</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditScoreRing;