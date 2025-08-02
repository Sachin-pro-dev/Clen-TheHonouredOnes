import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCards } from '@/hooks/useCards';
import { useTransactions } from '@/hooks/useTransactions';
import { useToast } from '@/hooks/use-toast';
import { Zap, CreditCard, Store, DollarSign } from 'lucide-react';

interface QuickSpendModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCardId?: string;
}

const merchantCategories = [
  { name: 'Swiggy', category: 'Food & Dining' },
  { name: 'Zomato', category: 'Food & Dining' },
  { name: 'Amazon', category: 'Shopping' },
  { name: 'Flipkart', category: 'Shopping' },
  { name: 'Uber', category: 'Transportation' },
  { name: 'BookMyShow', category: 'Entertainment' },
  { name: 'BigBasket', category: 'Groceries' },
  { name: 'Myntra', category: 'Fashion' },
  { name: 'PayTM Mall', category: 'Shopping' },
  { name: 'Dominos', category: 'Food & Dining' }
];

export const QuickSpendModal: React.FC<QuickSpendModalProps> = ({ 
  isOpen, 
  onClose, 
  preSelectedCardId 
}) => {
  const [selectedCardId, setSelectedCardId] = useState(preSelectedCardId || '');
  const [spendAmount, setSpendAmount] = useState('');
  const [selectedMerchant, setSelectedMerchant] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { cards, spendFromCard } = useCards();
  const { addTransaction } = useTransactions();
  const { toast } = useToast();

  const selectedCard = cards.find(card => card.id === selectedCardId);
  const selectedMerchantData = merchantCategories.find(m => m.name === selectedMerchant);

  const handleSpend = async () => {
    if (!selectedCardId || !spendAmount || !selectedMerchant) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!selectedCard) {
      toast({
        title: "Invalid Card",
        description: "Please select a valid card",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(spendAmount);
    const cardBalance = parseFloat(selectedCard.remainingBalance.replace('₹', '').replace(',', ''));

    if (amount > cardBalance) {
      toast({
        title: "Insufficient Balance",
        description: `Card balance: ${selectedCard.remainingBalance}`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await spendFromCard(selectedCardId, spendAmount, selectedMerchant);
      
      if (result.success) {
        // Add transaction to history
        await addTransaction({
          cardId: selectedCardId,
          cardName: selectedCard.name,
          type: 'spend',
          amount: `₹${amount.toLocaleString()}`,
          merchant: selectedMerchant,
          category: selectedMerchantData?.category || 'General',
          description: `Purchase at ${selectedMerchant}`
        });

        toast({
          title: "Spending Successful!",
          description: `₹${amount.toLocaleString()} spent at ${selectedMerchant}`,
        });
        
        onClose();
        setSpendAmount('');
        setSelectedMerchant('');
      } else {
        toast({
          title: "Spending Failed",
          description: result.error || "Failed to process spending",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Zap className="h-5 w-5 text-primary" />
            Quick Spend
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Card Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Select Card
            </label>
            <Select value={selectedCardId} onValueChange={setSelectedCardId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a card to spend from" />
              </SelectTrigger>
              <SelectContent>
                {cards.map((card) => (
                  <SelectItem key={card.id} value={card.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{card.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {card.remainingBalance}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCard && (
              <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Available Balance</span>
                  <span className="font-semibold text-lg">{selectedCard.remainingBalance}</span>
                </div>
              </div>
            )}
          </div>

          {/* Merchant Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <Store className="h-4 w-4" />
              Select Merchant
            </label>
            <Select value={selectedMerchant} onValueChange={setSelectedMerchant}>
              <SelectTrigger>
                <SelectValue placeholder="Where are you spending?" />
              </SelectTrigger>
              <SelectContent>
                {merchantCategories.map((merchant) => (
                  <SelectItem key={merchant.name} value={merchant.name}>
                    <div className="flex flex-col">
                      <span>{merchant.name}</span>
                      <span className="text-xs text-muted-foreground">{merchant.category}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Input */}
          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Spend Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                type="number"
                value={spendAmount}
                onChange={(e) => setSpendAmount(e.target.value)}
                placeholder="0.00"
                className="pl-8 text-lg"
                min="1"
                max={selectedCard ? parseFloat(selectedCard.remainingBalance.replace('₹', '').replace(',', '')) : undefined}
              />
            </div>
            {spendAmount && selectedCard && (
              <div className="mt-2 text-sm text-muted-foreground">
                Remaining after spend: ₹{(parseFloat(selectedCard.remainingBalance.replace('₹', '').replace(',', '')) - parseFloat(spendAmount || '0')).toLocaleString()}
              </div>
            )}
          </div>

          {/* Transaction Summary */}
          {spendAmount && selectedMerchant && selectedCard && (
            <div className="card-glass p-4">
              <h4 className="font-semibold mb-3">Transaction Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Merchant</span>
                  <span>{selectedMerchant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Card</span>
                  <span>{selectedCard.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-semibold">₹{parseFloat(spendAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span>{selectedMerchantData?.category}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSpend}
              className="flex-1 btn-primary"
              disabled={isLoading || !spendAmount || !selectedMerchant || !selectedCardId}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Spend ₹{spendAmount || '0'}
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};