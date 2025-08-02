import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const mockTransactions = [
  {
    id: 1,
    type: 'spend',
    merchant: 'Amazon India',
    category: 'Shopping',
    amount: -1250,
    date: '2024-01-15T10:30:00',
    status: 'completed',
    cardId: 'Card #1001',
    cashback: 25,
    description: 'Electronics purchase'
  },
  {
    id: 2,
    type: 'spend',
    merchant: 'Starbucks',
    category: 'Food & Drink',
    amount: -180,
    date: '2024-01-15T08:15:00',
    status: 'completed',
    cardId: 'Card #1001',
    cashback: 5,
    description: 'Coffee and snack'
  },
  {
    id: 3,
    type: 'repayment',
    merchant: 'Card Repayment',
    category: 'Repayment',
    amount: 5000,
    date: '2024-01-14T16:45:00',
    status: 'completed',
    cardId: 'Card #1002',
    cashback: 0,
    description: 'Monthly EMI payment'
  }
];

const TransactionItem = ({ transaction }) => {
  const isSpend = transaction.type === 'spend';
  const isPositive = transaction.amount > 0;
  
  const getCategoryColor = (category) => {
    const colors = {
      'Shopping': 'bg-blue-100 text-blue-800',
      'Food & Drink': 'bg-green-100 text-green-800',
      'Transport': 'bg-yellow-100 text-yellow-800',
      'Repayment': 'bg-gray-100 text-gray-800',
      'Entertainment': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="card-glass p-4 hover:shadow-card transition-all">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              isSpend ? 'bg-primary/10' : 'bg-success/10'
            }`}>
              <span className="text-sm font-semibold">
                {transaction.merchant.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold">{transaction.merchant}</h3>
              <p className="text-sm text-muted-foreground">{transaction.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-13">
            <Badge className={getCategoryColor(transaction.category)}>
              {transaction.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{transaction.cardId}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(transaction.date).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className={`text-lg font-semibold ${
            isPositive ? 'text-success' : 'text-foreground'
          }`}>
            {isPositive ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
          </div>
          {transaction.cashback > 0 && (
            <div className="text-sm text-success">
              +₹{transaction.cashback} cashback
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            {new Date(transaction.date).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Shopping', 'Food & Drink', 'Transport', 'Repayment', 'Entertainment'];

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
          <p className="text-muted-foreground">Track all your spending and payments</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>

        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Date Range
        </Button>

        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card-glass p-4 text-center">
          <div className="text-2xl font-bold text-foreground">₹8,430</div>
          <div className="text-sm text-muted-foreground">Total Spent</div>
        </div>
        <div className="card-glass p-4 text-center">
          <div className="text-2xl font-bold text-success">₹5,000</div>
          <div className="text-sm text-muted-foreground">Total Repaid</div>
        </div>
        <div className="card-glass p-4 text-center">
          <div className="text-2xl font-bold text-warning">₹30</div>
          <div className="text-sm text-muted-foreground">Cashback Earned</div>
        </div>
        <div className="card-glass p-4 text-center">
          <div className="text-2xl font-bold text-info">127</div>
          <div className="text-sm text-muted-foreground">Total Transactions</div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">No transactions found</div>
          <Button variant="outline">Clear Filters</Button>
        </div>
      )}
    </div>
  );
};

export default Transactions;