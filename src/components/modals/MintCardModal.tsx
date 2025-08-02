import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useCards } from '@/hooks/useCards';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Sparkles, Calculator, CheckCircle } from 'lucide-react';

interface MintCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CardTier {
  id: number;
  name: string;
  minDeposit: number;
  maxDeposit: number;
  multiplier: number;
  joiningBonus: number;
  features: string[];
  gradient: string;
}

const cardTiers: CardTier[] = [
  {
    id: 1,
    name: 'Starter',
    minDeposit: 1000,
    maxDeposit: 5000,
    multiplier: 2,
    joiningBonus: 500,
    features: ['2x Spending Power', '₹500 Joining Bonus', 'Basic Rewards'],
    gradient: 'from-emerald-400 to-teal-500'
  },
  {
    id: 2,
    name: 'Standard',
    minDeposit: 5000,
    maxDeposit: 15000,
    multiplier: 2,
    joiningBonus: 1000,
    features: ['2x Spending Power', '₹1,000 Joining Bonus', 'Enhanced Rewards', 'Priority Support'],
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    id: 3,
    name: 'Premium',
    minDeposit: 15000,
    maxDeposit: 50000,
    multiplier: 2,
    joiningBonus: 2000,
    features: ['2x Spending Power', '₹2,000 Joining Bonus', 'Premium Rewards', 'VIP Support', 'Exclusive Offers'],
    gradient: 'from-purple-400 to-pink-500'
  }
];

export const MintCardModal: React.FC<MintCardModalProps> = ({ isOpen, onClose }) => {
  const [selectedTier, setSelectedTier] = useState<CardTier>(cardTiers[0]);
  const [depositAmount, setDepositAmount] = useState([selectedTier.minDeposit]);
  const [isLoading, setIsLoading] = useState(false);
  const { mintNewCard } = useCards();
  const { toast } = useToast();

  const handleTierSelect = (tier: CardTier) => {
    setSelectedTier(tier);
    setDepositAmount([tier.minDeposit]);
  };

  const calculateTotals = () => {
    const deposit = depositAmount[0];
    const spendingLimit = deposit * selectedTier.multiplier;
    const total = spendingLimit + selectedTier.joiningBonus;
    return { deposit, spendingLimit, joiningBonus: selectedTier.joiningBonus, total };
  };

  const handleMint = async () => {
    setIsLoading(true);
    try {
      const result = await mintNewCard(depositAmount[0].toString(), selectedTier.id);
      if (result.success) {
        toast({
          title: "Card Minted Successfully!",
          description: `Your ${selectedTier.name} card has been created with ID: ${result.cardId}`,
        });
        onClose();
      } else {
        toast({
          title: "Minting Failed",
          description: result.error || "Failed to mint card",
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

  const totals = calculateTotals();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <CreditCard className="h-6 w-6 text-primary" />
            Mint New Spend Card
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tier Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Card Tier</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cardTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${
                    selectedTier.id === tier.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleTierSelect(tier)}
                >
                  <div className={`w-full h-32 bg-gradient-to-br ${tier.gradient} rounded-lg mb-3 flex items-center justify-center text-white font-bold text-lg`}>
                    {tier.name} Card
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Deposit Range</span>
                      <span className="font-semibold">₹{tier.minDeposit.toLocaleString()} - ₹{tier.maxDeposit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Joining Bonus</span>
                      <Badge variant="secondary">₹{tier.joiningBonus.toLocaleString()}</Badge>
                    </div>
                    <div className="space-y-1">
                      {tier.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-success" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {selectedTier.id === tier.id && (
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-primary text-primary-foreground rounded-full p-1">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Deposit Amount */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Deposit Amount</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium min-w-0">₹{selectedTier.minDeposit.toLocaleString()}</span>
                <Slider
                  value={depositAmount}
                  onValueChange={setDepositAmount}
                  min={selectedTier.minDeposit}
                  max={selectedTier.maxDeposit}
                  step={500}
                  className="flex-1"
                />
                <span className="text-sm font-medium min-w-0">₹{selectedTier.maxDeposit.toLocaleString()}</span>
              </div>
              <div className="flex justify-center">
                <Input
                  type="number"
                  value={depositAmount[0]}
                  onChange={(e) => setDepositAmount([parseInt(e.target.value) || selectedTier.minDeposit])}
                  min={selectedTier.minDeposit}
                  max={selectedTier.maxDeposit}
                  className="text-center text-xl font-bold w-48"
                />
              </div>
            </div>
          </div>

          {/* Calculation Preview */}
          <div className="card-glass p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Spending Power Calculation</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">₹{totals.deposit.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Your Deposit</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-info">₹{totals.spendingLimit.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">2x Spending Power</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">₹{totals.joiningBonus.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Joining Bonus</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">₹{totals.total.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Available</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleMint}
              className="flex-1 btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Minting Card...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Mint Card for ₹{totals.deposit.toLocaleString()}
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};