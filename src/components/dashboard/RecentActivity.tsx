import React from 'react';
import { 
  ShoppingBag, 
  Coffee, 
  Car, 
  Utensils, 
  ArrowUpRight, 
  ArrowDownLeft,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockTransactions = [
  {
    id: 1,
    type: 'spend',
    merchant: 'Amazon',
    category: 'Shopping',
    amount: -1250,
    date: '2 hours ago',
    icon: ShoppingBag,
    status: 'completed',
    cashback: 25
  },
  {
    id: 2,
    type: 'spend',
    merchant: 'Starbucks',
    category: 'Food & Drink',
    amount: -180,
    date: '5 hours ago',
    icon: Coffee,
    status: 'completed',
    cashback: 5
  },
  {
    id: 3,
    type: 'repayment',
    merchant: 'Card Payment',
    category: 'Repayment',
    amount: 5000,
    date: 'Yesterday',
    icon: ArrowDownLeft,
    status: 'completed',
    cashback: 0
  },
  {
    id: 4,
    type: 'spend',
    merchant: 'Uber',
    category: 'Transport',
    amount: -320,
    date: 'Yesterday',
    icon: Car,
    status: 'pending',
    cashback: 8
  },
  {
    id: 5,
    type: 'spend',
    merchant: 'Zomato',
    category: 'Food & Delivery',
    amount: -450,
    date: '2 days ago',
    icon: Utensils,
    status: 'completed',
    cashback: 12
  }
];

const TransactionItem = ({ transaction }) => {
  const IconComponent = transaction.icon;
  const isSpend = transaction.type === 'spend';
  const isPositive = transaction.amount > 0;

  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/30 rounded-lg transition-colors group">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
          isSpend ? 'bg-primary/10' : 'bg-success/10'
        }`}>
          <IconComponent className={`h-5 w-5 ${
            isSpend ? 'text-primary' : 'text-success'
          }`} />
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{transaction.merchant}</span>
            {transaction.status === 'pending' && (
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Pending
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {transaction.category} • {transaction.date}
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className={`font-semibold ${
          isPositive ? 'text-success' : 'text-foreground'
        }`}>
          {isPositive ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
        </div>
        {transaction.cashback > 0 && (
          <div className="text-xs text-success">
            +₹{transaction.cashback} cashback
          </div>
        )}
      </div>
    </div>
  );
};

const RecentActivity = () => {
  return (
    <div className="card-glass p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1">
          View All
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-1">
        {mockTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-semibold text-destructive">₹2,200</div>
            <div className="text-muted-foreground">This week spending</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-success">₹50</div>
            <div className="text-muted-foreground">Cashback earned</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;