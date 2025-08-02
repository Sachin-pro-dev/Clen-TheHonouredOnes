import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export interface Transaction {
  id: string;
  cardId: string;
  cardName: string;
  type: 'spend' | 'repayment' | 'mint' | 'cashback';
  amount: string;
  merchant?: string;
  category: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 'tx_001',
    cardId: '1',
    cardName: 'Premium Card',
    type: 'spend',
    amount: '₹2,500',
    merchant: 'Swiggy',
    category: 'Food & Dining',
    date: '2024-01-15T14:30:00Z',
    status: 'completed',
    description: 'Food order from Swiggy'
  },
  {
    id: 'tx_002',
    cardId: '1',
    cardName: 'Premium Card',
    type: 'repayment',
    amount: '₹1,250',
    category: 'Repayment',
    date: '2024-01-14T10:15:00Z',
    status: 'completed',
    description: 'Monthly EMI payment'
  },
  {
    id: 'tx_003',
    cardId: '2',
    cardName: 'Standard Card',
    type: 'spend',
    amount: '₹850',
    merchant: 'Amazon',
    category: 'Shopping',
    date: '2024-01-13T16:45:00Z',
    status: 'completed',
    description: 'Online shopping'
  },
  {
    id: 'tx_004',
    cardId: '1',
    cardName: 'Premium Card',
    type: 'cashback',
    amount: '₹125',
    category: 'Rewards',
    date: '2024-01-12T12:00:00Z',
    status: 'completed',
    description: 'Cashback reward'
  },
  {
    id: 'tx_005',
    cardId: '3',
    cardName: 'Starter Card',
    type: 'mint',
    amount: '₹5,000',
    category: 'Card Mint',
    date: '2024-01-10T09:30:00Z',
    status: 'completed',
    description: 'New card minted'
  }
];

export const useTransactions = () => {
  const { address, isConnected } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactionHistory = async (cardId?: string) => {
    if (!isConnected || !address) {
      setTransactions([]);
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredTransactions = mockTransactions;
      if (cardId) {
        filteredTransactions = mockTransactions.filter(tx => tx.cardId === cardId);
      }
      
      setTransactions(filteredTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'date' | 'status'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx_${Date.now()}`,
      date: new Date().toISOString(),
      status: 'completed'
    };

    setTransactions(prev => [newTransaction, ...prev]);
    return newTransaction;
  };

  const filterTransactions = (filters: {
    type?: string;
    category?: string;
    dateRange?: { start: string; end: string };
    merchant?: string;
  }) => {
    return transactions.filter(tx => {
      if (filters.type && tx.type !== filters.type) return false;
      if (filters.category && tx.category !== filters.category) return false;
      if (filters.merchant && tx.merchant !== filters.merchant) return false;
      if (filters.dateRange) {
        const txDate = new Date(tx.date);
        const start = new Date(filters.dateRange.start);
        const end = new Date(filters.dateRange.end);
        if (txDate < start || txDate > end) return false;
      }
      return true;
    });
  };

  const searchTransactions = (query: string) => {
    return transactions.filter(tx =>
      tx.description.toLowerCase().includes(query.toLowerCase()) ||
      tx.merchant?.toLowerCase().includes(query.toLowerCase()) ||
      tx.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchTransactionHistory();
    }
  }, [isConnected, address]);

  return {
    transactions,
    loading,
    fetchTransactionHistory,
    addTransaction,
    filterTransactions,
    searchTransactions
  };
};