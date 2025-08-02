import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export interface CreditProfile {
  score: number;
  totalTransactions: number;
  onTimePayments: number;
  latePayments: number;
  defaults: number;
  totalSpent: string;
  avgRepaymentTime: number;
  lastUpdated: string;
  scoreHistory: { date: string; score: number }[];
  factorBreakdown: {
    repaymentHistory: number;
    transactionVolume: number;
    merchantDiversity: number;
    accountAge: number;
  };
}

const mockCreditProfile: CreditProfile = {
  score: 742,
  totalTransactions: 156,
  onTimePayments: 142,
  latePayments: 14,
  defaults: 0,
  totalSpent: "₹2,45,600",
  avgRepaymentTime: 12,
  lastUpdated: new Date().toISOString(),
  scoreHistory: [
    { date: '2024-01', score: 650 },
    { date: '2024-02', score: 668 },
    { date: '2024-03', score: 685 },
    { date: '2024-04', score: 701 },
    { date: '2024-05', score: 718 },
    { date: '2024-06', score: 735 },
    { date: '2024-07', score: 742 },
  ],
  factorBreakdown: {
    repaymentHistory: 85,
    transactionVolume: 78,
    merchantDiversity: 92,
    accountAge: 67,
  }
};

export const useCreditScore = () => {
  const { address, isConnected } = useAccount();
  const [creditProfile, setCreditProfile] = useState<CreditProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCreditData = async () => {
    if (!isConnected || !address) {
      setCreditProfile(null);
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCreditProfile(mockCreditProfile);
    } catch (error) {
      console.error('Error fetching credit data:', error);
      setCreditProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const updateScoreAfterTransaction = async (type: 'spend' | 'repayment', isOnTime?: boolean) => {
    if (!creditProfile) return;

    try {
      // Simulate score update
      const scoreChange = type === 'repayment' && isOnTime ? 2 : type === 'spend' ? 1 : -1;
      const newScore = Math.min(850, Math.max(300, creditProfile.score + scoreChange));
      
      setCreditProfile(prev => prev ? {
        ...prev,
        score: newScore,
        totalTransactions: prev.totalTransactions + 1,
        onTimePayments: type === 'repayment' && isOnTime ? prev.onTimePayments + 1 : prev.onTimePayments,
        latePayments: type === 'repayment' && !isOnTime ? prev.latePayments + 1 : prev.latePayments,
        lastUpdated: new Date().toISOString()
      } : null);
    } catch (error) {
      console.error('Error updating credit score:', error);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchCreditData();
    }
  }, [isConnected, address]);

  return {
    creditProfile,
    loading,
    fetchCreditData,
    updateScoreAfterTransaction
  };
};