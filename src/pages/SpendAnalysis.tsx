import React, { useState } from 'react';
import { TrendingUp, PieChart, Calendar, Target, ShoppingBag, Coffee, Car, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const SpendAnalysis = () => {
  const [timeFilter, setTimeFilter] = useState('month');

  const monthlySpending = [
    { month: 'Dec', amount: 8500 },
    { month: 'Nov', amount: 7200 },
    { month: 'Oct', amount: 9100 },
    { month: 'Sep', amount: 6800 },
    { month: 'Aug', amount: 7900 },
    { month: 'Jul', amount: 8300 }
  ];

  const categoryData = [
    { name: 'Shopping', amount: 3200, percentage: 38, icon: ShoppingBag, color: 'text-blue-500' },
    { name: 'Food & Dining', amount: 2100, percentage: 25, icon: Utensils, color: 'text-green-500' },
    { name: 'Transport', amount: 1800, percentage: 21, icon: Car, color: 'text-yellow-500' },
    { name: 'Beverages', amount: 900, percentage: 11, icon: Coffee, color: 'text-purple-500' },
    { name: 'Others', amount: 430, percentage: 5, icon: PieChart, color: 'text-gray-500' }
  ];

  const topMerchants = [
    { name: 'Amazon', amount: 2100, transactions: 8, category: 'Shopping' },
    { name: 'Zomato', amount: 1250, transactions: 15, category: 'Food' },
    { name: 'Uber', amount: 980, transactions: 12, category: 'Transport' },
    { name: 'Starbucks', amount: 720, transactions: 24, category: 'Beverages' },
    { name: 'Flipkart', amount: 650, transactions: 4, category: 'Shopping' }
  ];

  const budgetTracking = [
    { category: 'Shopping', budget: 4000, spent: 3200, percentage: 80 },
    { category: 'Food', budget: 2500, spent: 2100, percentage: 84 },
    { category: 'Transport', budget: 2000, spent: 1800, percentage: 90 },
    { category: 'Entertainment', budget: 1500, spent: 900, percentage: 60 }
  ];

  const insights = [
    {
      type: 'trend',
      title: 'Spending Increased',
      description: 'Your spending increased by 18% compared to last month',
      impact: 'neutral',
      suggestion: 'Consider reviewing your shopping category'
    },
    {
      type: 'achievement',
      title: 'Budget Goal Met',
      description: 'You stayed within your transport budget this month',
      impact: 'positive',
      suggestion: 'Great job! Keep up the good spending habits'
    },
    {
      type: 'warning',
      title: 'High Food Spending',
      description: 'Food expenses are 84% of your monthly budget',
      impact: 'warning',
      suggestion: 'Try cooking at home more often to save money'
    }
  ];

  const maxSpending = Math.max(...monthlySpending.map(m => m.amount));

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Spend Analysis</h1>
          <p className="text-muted-foreground">Understand your spending patterns and optimize your budget</p>
        </div>
        <div className="flex gap-2">
          {['week', 'month', 'quarter', 'year'].map((period) => (
            <Button
              key={period}
              variant={timeFilter === period ? 'default' : 'outline'}
              onClick={() => setTimeFilter(period)}
              className="capitalize"
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card-glass p-6 text-center">
          <div className="text-2xl font-bold text-foreground">₹8,430</div>
          <div className="text-sm text-muted-foreground">This Month</div>
          <div className="flex items-center justify-center gap-1 text-xs text-destructive mt-1">
            <TrendingUp className="h-3 w-3" />
            +18% from last month
          </div>
        </div>
        
        <div className="card-glass p-6 text-center">
          <div className="text-2xl font-bold text-foreground">₹280</div>
          <div className="text-sm text-muted-foreground">Daily Average</div>
          <div className="text-xs text-muted-foreground mt-1">Based on 30 days</div>
        </div>
        
        <div className="card-glass p-6 text-center">
          <div className="text-2xl font-bold text-success">₹1,570</div>
          <div className="text-sm text-muted-foreground">Budget Remaining</div>
          <div className="text-xs text-success mt-1">16% left</div>
        </div>
        
        <div className="card-glass p-6 text-center">
          <div className="text-2xl font-bold text-info">47</div>
          <div className="text-sm text-muted-foreground">Transactions</div>
          <div className="text-xs text-muted-foreground mt-1">This month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Spending Trend */}
        <div className="card-glass p-6">
          <h3 className="text-lg font-semibold mb-6">Spending Trend</h3>
          <div className="space-y-4">
            {monthlySpending.map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium">{data.month}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">₹{data.amount.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary rounded-full transition-all duration-300"
                      style={{ width: `${(data.amount / maxSpending) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="card-glass p-6">
          <h3 className="text-lg font-semibold mb-6">Category Breakdown</h3>
          <div className="space-y-4">
            {categoryData.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full bg-muted flex items-center justify-center`}>
                      <IconComponent className={`h-4 w-4 ${category.color}`} />
                    </div>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-muted-foreground">{category.percentage}% of total</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{category.amount.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Merchants */}
        <div className="card-glass p-6">
          <h3 className="text-lg font-semibold mb-6">Top Merchants</h3>
          <div className="space-y-3">
            {topMerchants.map((merchant, index) => (
              <div key={index} className="flex justify-between items-center p-3 hover:bg-muted/30 rounded-lg transition-colors">
                <div>
                  <div className="font-medium">{merchant.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {merchant.transactions} transactions • {merchant.category}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{merchant.amount.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Tracking */}
        <div className="card-glass p-6">
          <h3 className="text-lg font-semibold mb-6">Budget Tracking</h3>
          <div className="space-y-4">
            {budgetTracking.map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{budget.category}</span>
                  <span className="text-sm text-muted-foreground">
                    ₹{budget.spent} / ₹{budget.budget}
                  </span>
                </div>
                <Progress 
                  value={budget.percentage} 
                  className={`h-2 ${budget.percentage > 90 ? 'bg-destructive/20' : 'bg-muted'}`}
                />
                <div className="flex justify-between items-center text-xs">
                  <span className={
                    budget.percentage > 90 ? 'text-destructive' :
                    budget.percentage > 75 ? 'text-warning' : 'text-success'
                  }>
                    {budget.percentage}% used
                  </span>
                  <span className="text-muted-foreground">
                    ₹{budget.budget - budget.spent} remaining
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="card-glass p-6">
        <h3 className="text-lg font-semibold mb-6">AI Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              insight.impact === 'positive' ? 'bg-success/10 border-success/20' :
              insight.impact === 'warning' ? 'bg-warning/10 border-warning/20' :
              'bg-muted/30 border-border'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  insight.impact === 'positive' ? 'bg-success/20' :
                  insight.impact === 'warning' ? 'bg-warning/20' :
                  'bg-muted'
                }`}>
                  {insight.impact === 'positive' ? '✅' :
                   insight.impact === 'warning' ? '⚠️' : '📊'}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                  <p className="text-xs text-info">{insight.suggestion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendAnalysis;