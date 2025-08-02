import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export interface Card {
  id: string;
  name: string;
  tier: number;
  balance: string;
  limit: string;
  expiry: string;
  gradient: string;
  isExpiring: boolean;
  depositAmount: string;
  spendingLimit: string;
  remainingBalance: string;
  validityPeriod: string;
  mintTimestamp: string;
  isActive: boolean;
  isBlacklisted: boolean;
}

// Mock card data
const mockCards: Card[] = [
  {
    id: '1',
    name: "Premium Card",
    tier: 3,
    balance: "₹15,400",
    limit: "₹20,000",
    expiry: "12/25",
    gradient: "from-purple-500 to-pink-500",
    isExpiring: false,
    depositAmount: "₹10,000",
    spendingLimit: "₹20,000",
    remainingBalance: "₹15,400",
    validityPeriod: "2025-12-31",
    mintTimestamp: "2024-01-15",
    isActive: true,
    isBlacklisted: false
  },
  {
    id: '2',
    name: "Standard Card",
    tier: 2,
    balance: "₹7,200",
    limit: "₹10,000",
    expiry: "08/24",
    gradient: "from-blue-500 to-cyan-500",
    isExpiring: true,
    depositAmount: "₹5,000",
    spendingLimit: "₹10,000",
    remainingBalance: "₹7,200",
    validityPeriod: "2024-08-31",
    mintTimestamp: "2024-01-10",
    isActive: true,
    isBlacklisted: false
  },
  {
    id: '3',
    name: "Starter Card",
    tier: 1,
    balance: "₹1,980",
    limit: "₹5,000",
    expiry: "03/25",
    gradient: "from-green-500 to-teal-500",
    isExpiring: false,
    depositAmount: "₹2,500",
    spendingLimit: "₹5,000",
    remainingBalance: "₹1,980",
    validityPeriod: "2025-03-31",
    mintTimestamp: "2024-01-20",
    isActive: true,
    isBlacklisted: false
  }
];

export const useCards = () => {
  const { address, isConnected } = useAccount();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserCards = async () => {
    if (!isConnected || !address) {
      setCards([]);
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCards(mockCards);
    } catch (error) {
      console.error('Error fetching cards:', error);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  const mintNewCard = async (depositAmount: string, tier: number) => {
    setLoading(true);
    try {
      // Simulate minting transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newCard: Card = {
        id: (cards.length + 1).toString(),
        name: `${tier === 1 ? 'Starter' : tier === 2 ? 'Standard' : 'Premium'} Card`,
        tier,
        balance: `₹${(parseFloat(depositAmount) * 2).toLocaleString()}`,
        limit: `₹${(parseFloat(depositAmount) * 2).toLocaleString()}`,
        expiry: "12/25",
        gradient: tier === 1 ? "from-green-500 to-teal-500" : 
                 tier === 2 ? "from-blue-500 to-cyan-500" : 
                 "from-purple-500 to-pink-500",
        isExpiring: false,
        depositAmount: `₹${parseFloat(depositAmount).toLocaleString()}`,
        spendingLimit: `₹${(parseFloat(depositAmount) * 2).toLocaleString()}`,
        remainingBalance: `₹${(parseFloat(depositAmount) * 2).toLocaleString()}`,
        validityPeriod: "2025-12-31",
        mintTimestamp: new Date().toISOString(),
        isActive: true,
        isBlacklisted: false
      };
      
      setCards(prev => [...prev, newCard]);
      return { success: true, cardId: newCard.id };
    } catch (error) {
      console.error('Error minting card:', error);
      return { success: false, error: 'Failed to mint card' };
    } finally {
      setLoading(false);
    }
  };

  const spendFromCard = async (cardId: string, amount: string, merchant: string) => {
    setLoading(true);
    try {
      // Simulate spending transaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCards(prev => prev.map(card => {
        if (card.id === cardId) {
          const currentBalance = parseFloat(card.remainingBalance.replace('₹', '').replace(',', ''));
          const spendAmount = parseFloat(amount);
          const newBalance = currentBalance - spendAmount;
          
          return {
            ...card,
            remainingBalance: `₹${newBalance.toLocaleString()}`,
            balance: `₹${newBalance.toLocaleString()}`
          };
        }
        return card;
      }));
      
      return { success: true, transactionId: `tx_${Date.now()}` };
    } catch (error) {
      console.error('Error spending from card:', error);
      return { success: false, error: 'Failed to process spending' };
    } finally {
      setLoading(false);
    }
  };

  const makeRepayment = async (cardId: string, amount: string) => {
    setLoading(true);
    try {
      // Simulate repayment transaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCards(prev => prev.map(card => {
        if (card.id === cardId) {
          const currentBalance = parseFloat(card.remainingBalance.replace('₹', '').replace(',', ''));
          const repayAmount = parseFloat(amount);
          const newBalance = currentBalance + repayAmount;
          
          return {
            ...card,
            remainingBalance: `₹${newBalance.toLocaleString()}`,
            balance: `₹${newBalance.toLocaleString()}`
          };
        }
        return card;
      }));
      
      return { success: true, transactionId: `repay_${Date.now()}` };
    } catch (error) {
      console.error('Error making repayment:', error);
      return { success: false, error: 'Failed to process repayment' };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchUserCards();
    }
  }, [isConnected, address]);

  return {
    cards,
    loading,
    fetchUserCards,
    mintNewCard,
    spendFromCard,
    makeRepayment
  };
};