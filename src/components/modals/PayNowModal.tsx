import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCards } from '@/hooks/useCards';
import { useTransactions } from '@/hooks/useTransactions';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, CreditCard, Calendar, CheckCircle } from 'lucide-react';

interface PayNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCardId?: string;
}

// Mock outstanding balances for demonstration
const mockOutstandingBalances = {
  '1': { amount: 1250, dueDate: '2024-01-18', minPayment: 125 },
  '2': { amount: 800, dueDate: '2024-01-25', minPayment: 80 },
  '3': { amount: 450, dueDate: '2024-02-01', minPayment: 45 }
};

export const PayNowModal: React.FC<PayNowModalProps> = ({ 
  isOpen, 
  onClose, 
  preSelectedCardId 
}) => {
  const [selectedCardId, setSelectedCardId] = useState(preSelectedCardId || '');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState<'minimum' | 'half' | 'full' | 'custom'>('minimum');
  const [isLoading, setIsLoading] = useState(false);
  
  const { cards, makeRepayment } = useCards();
  const { addTransaction } = useTransactions();
  const { toast } = useToast();

  const selectedCard = cards.find(card => card.id === selectedCardId);
  const outstandingBalance = selectedCardId ? mockOutstandingBalances[selectedCardId as keyof typeof mockOutstandingBalances] : null;

  const handlePaymentTypeChange = (type: 'minimum' | 'half' | 'full' | 'custom') => {
    setPaymentType(type);
    if (outstandingBalance) {
      switch (type) {
        case 'minimum':
          setPaymentAmount(outstandingBalance.minPayment.toString());
          break;
        case 'half':
          setPaymentAmount((outstandingBalance.amount / 2).toString());
          break;
        case 'full':
          setPaymentAmount(outstandingBalance.amount.toString());
          break;
        case 'custom':
          setPaymentAmount('');
          break;
      }
    }
  };

  const handlePayment = async () => {
    if (!selectedCardId || !paymentAmount) {
      toast({
        title: "Missing Information",
        description: "Please select a card and enter payment amount",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(paymentAmount);
    if (!outstandingBalance || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount",
        variant: "destructive",
      });
      return;
    }

    if (amount > outstandingBalance.amount) {
      toast({
        title: "Amount Too High",
        description: `Maximum payable amount: ₹${outstandingBalance.amount.toLocaleString()}`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await makeRepayment(selectedCardId, paymentAmount);
      
      if (result.success) {
        // Add transaction to history
        await addTransaction({
          cardId: selectedCardId,
          cardName: selectedCard!.name,
          type: 'repayment',
          amount: `₹${amount.toLocaleString()}`,
          category: 'Repayment',
          description: `${paymentType === 'full' ? 'Full' : paymentType === 'minimum' ? 'Minimum' : 'Partial'} payment`
        });

        toast({
          title: "Payment Successful!",
          description: `₹${amount.toLocaleString()} paid for ${selectedCard!.name}`,
        });
        
        onClose();
        setPaymentAmount('');
        setPaymentType('minimum');
      } else {
        toast({
          title: "Payment Failed",
          description: result.error || "Failed to process payment",
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

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <DollarSign className="h-5 w-5 text-primary" />
            Make Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Card Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Select Card to Pay
            </label>
            <Select value={selectedCardId} onValueChange={setSelectedCardId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a card with outstanding balance" />
              </SelectTrigger>
              <SelectContent>
                {cards.map((card) => {
                  const balance = mockOutstandingBalances[card.id as keyof typeof mockOutstandingBalances];
                  return balance ? (
                    <SelectItem key={card.id} value={card.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{card.name}</span>
                        <span className="text-sm text-destructive ml-2">
                          ₹{balance.amount.toLocaleString()} due
                        </span>
                      </div>
                    </SelectItem>
                  ) : null;
                })}
              </SelectContent>
            </Select>
            
            {selectedCard && outstandingBalance && (
              <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Outstanding Balance</span>
                    <span className="font-semibold text-lg text-destructive">
                      ₹{outstandingBalance.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Due Date</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">
                        {new Date(outstandingBalance.dueDate).toLocaleDateString()}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        getDaysUntilDue(outstandingBalance.dueDate) <= 3 
                          ? 'bg-destructive/10 text-destructive' 
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {getDaysUntilDue(outstandingBalance.dueDate)} days left
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Minimum Payment</span>
                    <span className="font-medium">₹{outstandingBalance.minPayment.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Type Selection */}
          {outstandingBalance && (
            <div>
              <label className="text-sm font-medium mb-3 block">Payment Options</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={paymentType === 'minimum' ? 'default' : 'outline'}
                  onClick={() => handlePaymentTypeChange('minimum')}
                  className="h-auto p-3 flex flex-col gap-1"
                >
                  <span className="font-semibold">Minimum</span>
                  <span className="text-xs">₹{outstandingBalance.minPayment.toLocaleString()}</span>
                </Button>
                <Button
                  variant={paymentType === 'half' ? 'default' : 'outline'}
                  onClick={() => handlePaymentTypeChange('half')}
                  className="h-auto p-3 flex flex-col gap-1"
                >
                  <span className="font-semibold">Half</span>
                  <span className="text-xs">₹{(outstandingBalance.amount / 2).toLocaleString()}</span>
                </Button>
                <Button
                  variant={paymentType === 'full' ? 'default' : 'outline'}
                  onClick={() => handlePaymentTypeChange('full')}
                  className="h-auto p-3 flex flex-col gap-1"
                >
                  <span className="font-semibold">Full</span>
                  <span className="text-xs">₹{outstandingBalance.amount.toLocaleString()}</span>
                </Button>
                <Button
                  variant={paymentType === 'custom' ? 'default' : 'outline'}
                  onClick={() => handlePaymentTypeChange('custom')}
                  className="h-auto p-3 flex flex-col gap-1"
                >
                  <span className="font-semibold">Custom</span>
                  <span className="text-xs">Enter amount</span>
                </Button>
              </div>
            </div>
          )}

          {/* Payment Amount */}
          <div>
            <label className="text-sm font-medium mb-2 block">Payment Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                type="number"
                value={paymentAmount}
                onChange={(e) => {
                  setPaymentAmount(e.target.value);
                  setPaymentType('custom');
                }}
                placeholder="0.00"
                className="pl-8 text-lg"
                min={outstandingBalance?.minPayment}
                max={outstandingBalance?.amount}
                disabled={!outstandingBalance}
              />
            </div>
            {paymentAmount && outstandingBalance && (
              <div className="mt-2 text-sm text-muted-foreground">
                Remaining balance: ₹{(outstandingBalance.amount - parseFloat(paymentAmount || '0')).toLocaleString()}
              </div>
            )}
          </div>

          {/* Payment Summary */}
          {paymentAmount && selectedCard && outstandingBalance && (
            <div className="card-glass p-4">
              <h4 className="font-semibold mb-3">Payment Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Card</span>
                  <span>{selectedCard.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Type</span>
                  <span className="capitalize">{paymentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Amount</span>
                  <span className="font-semibold">₹{parseFloat(paymentAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining Balance</span>
                  <span>₹{(outstandingBalance.amount - parseFloat(paymentAmount)).toLocaleString()}</span>
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
              onClick={handlePayment}
              className="flex-1 btn-primary"
              disabled={isLoading || !paymentAmount || !selectedCardId}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Pay ₹{paymentAmount || '0'}
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};