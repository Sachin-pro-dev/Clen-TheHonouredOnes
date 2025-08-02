import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export interface RewardBalance {
  ctTokens: number;
  cashbackEarned: string;
  totalRedeemed: string;
  loyaltyTier: string;
  nextTierProgress: number;
}

export interface CashbackHistory {
  id: string;
  amount: string;
  source: string;
  date: string;
  transactionId: string;
}

export interface RedemptionOption {
  id: string;
  type: 'crypto' | 'voucher' | 'cashback';
  title: string;
  description: string;
  costInCT: number;
  value: string;
  available: boolean;
}

const mockRewardBalance: RewardBalance = {
  ctTokens: 1247,
  cashbackEarned: "₹3,420",
  totalRedeemed: "₹1,850",
  loyaltyTier: "Silver",
  nextTierProgress: 68
};

const mockCashbackHistory: CashbackHistory[] = [
  {
    id: 'cb_001',
    amount: '₹125',
    source: 'Swiggy Purchase',
    date: '2024-01-15T14:30:00Z',
    transactionId: 'tx_001'
  },
  {
    id: 'cb_002',
    amount: '₹85',
    source: 'Amazon Shopping',
    date: '2024-01-13T16:45:00Z',
    transactionId: 'tx_003'
  },
  {
    id: 'cb_003',
    amount: '₹200',
    source: 'Monthly Bonus',
    date: '2024-01-01T00:00:00Z',
    transactionId: 'bonus_001'
  }
];

const mockRedemptionOptions: RedemptionOption[] = [
  {
    id: 'redeem_001',
    type: 'crypto',
    title: 'USDT',
    description: 'Redeem for USDT stablecoin',
    costInCT: 100,
    value: '₹100',
    available: true
  },
  {
    id: 'redeem_002',
    type: 'voucher',
    title: 'Amazon Voucher',
    description: '₹500 Amazon gift voucher',
    costInCT: 500,
    value: '₹500',
    available: true
  },
  {
    id: 'redeem_003',
    type: 'voucher',
    title: 'Swiggy Voucher',
    description: '₹200 Swiggy food voucher',
    costInCT: 200,
    value: '₹200',
    available: true
  },
  {
    id: 'redeem_004',
    type: 'cashback',
    title: 'Direct Cashback',
    description: 'Transfer to wallet as cashback',
    costInCT: 150,
    value: '₹150',
    available: true
  }
];

export const useRewards = () => {
  const { address, isConnected } = useAccount();
  const [rewardBalance, setRewardBalance] = useState<RewardBalance | null>(null);
  const [cashbackHistory, setCashbackHistory] = useState<CashbackHistory[]>([]);
  const [redemptionOptions, setRedemptionOptions] = useState<RedemptionOption[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRewardsData = async () => {
    if (!isConnected || !address) {
      setRewardBalance(null);
      setCashbackHistory([]);
      setRedemptionOptions([]);
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRewardBalance(mockRewardBalance);
      setCashbackHistory(mockCashbackHistory);
      setRedemptionOptions(mockRedemptionOptions);
    } catch (error) {
      console.error('Error fetching rewards data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processCashback = async (amount: string, source: string, transactionId: string) => {
    if (!rewardBalance) return;

    const newCashback: CashbackHistory = {
      id: `cb_${Date.now()}`,
      amount,
      source,
      date: new Date().toISOString(),
      transactionId
    };

    setCashbackHistory(prev => [newCashback, ...prev]);
    
    // Update CT tokens
    const ctEarned = Math.floor(parseFloat(amount.replace('₹', '')) / 10);
    setRewardBalance(prev => prev ? {
      ...prev,
      ctTokens: prev.ctTokens + ctEarned,
      cashbackEarned: `₹${(parseFloat(prev.cashbackEarned.replace('₹', '')) + parseFloat(amount.replace('₹', ''))).toLocaleString()}`
    } : null);
  };

  const redeemRewards = async (optionId: string) => {
    if (!rewardBalance) return { success: false, error: 'No reward balance found' };

    const option = redemptionOptions.find(opt => opt.id === optionId);
    if (!option) return { success: false, error: 'Invalid redemption option' };

    if (rewardBalance.ctTokens < option.costInCT) {
      return { success: false, error: 'Insufficient CT tokens' };
    }

    setLoading(true);
    try {
      // Simulate redemption transaction
      await new Promise(resolve => setTimeout(resolve, 2000));

      setRewardBalance(prev => prev ? {
        ...prev,
        ctTokens: prev.ctTokens - option.costInCT,
        totalRedeemed: `₹${(parseFloat(prev.totalRedeemed.replace('₹', '')) + parseFloat(option.value.replace('₹', ''))).toLocaleString()}`
      } : null);

      return { success: true, redemptionId: `redeem_${Date.now()}` };
    } catch (error) {
      console.error('Error processing redemption:', error);
      return { success: false, error: 'Failed to process redemption' };
    } finally {
      setLoading(false);
    }
  };

  const getReferralRewards = async () => {
    // Simulate referral rewards calculation
    return {
      referralCount: 3,
      totalEarned: '₹450',
      pendingRewards: '₹150'
    };
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchRewardsData();
    }
  }, [isConnected, address]);

  return {
    rewardBalance,
    cashbackHistory,
    redemptionOptions,
    loading,
    fetchRewardsData,
    processCashback,
    redeemRewards,
    getReferralRewards
  };
};