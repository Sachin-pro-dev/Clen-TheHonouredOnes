import React, { useState } from 'react';
import { Check, Star, Crown, Diamond, Calculator, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const tiers = [
  {
    id: 1,
    name: "Starter",
    icon: Star,
    minDeposit: 1000,
    maxDeposit: 5000,
    multiplier: 2,
    joiningBonus: 500,
    benefits: ["2x spending power", "Basic cashback", "Credit building"],
    gradient: "from-green-500 to-teal-500",
    popular: false
  },
  {
    id: 2,
    name: "Standard", 
    icon: Crown,
    minDeposit: 5000,
    maxDeposit: 15000,
    multiplier: 2,
    joiningBonus: 1000,
    benefits: ["2x spending power", "Enhanced cashback", "Priority support", "Merchant rewards"],
    gradient: "from-blue-500 to-cyan-500",
    popular: true
  },
  {
    id: 3,
    name: "Premium",
    icon: Diamond,
    minDeposit: 15000,
    maxDeposit: 50000,
    multiplier: 2,
    joiningBonus: 2500,
    benefits: ["2x spending power", "Premium cashback", "VIP support", "Exclusive rewards", "Insurance coverage"],
    gradient: "from-purple-500 to-pink-500",
    popular: false
  }
];

const TierCard = ({ tier, isSelected, onSelect }) => {
  const IconComponent = tier.icon;
  
  return (
    <div 
      className={`card-glass p-6 cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-primary shadow-glow' : 'hover:shadow-card'
      } ${tier.popular ? 'relative' : ''}`}
      onClick={() => onSelect(tier)}
    >
      {tier.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
          Most Popular
        </Badge>
      )}
      
      <div className="text-center mb-4">
        <div className={`h-12 w-12 bg-gradient-to-br ${tier.gradient} rounded-full flex items-center justify-center mx-auto mb-3`}>
          <IconComponent className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold">{tier.name}</h3>
        <p className="text-sm text-muted-foreground">
          ₹{tier.minDeposit.toLocaleString()} - ₹{tier.maxDeposit.toLocaleString()}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {tier.benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            <span className="text-sm">{benefit}</span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <div className="text-lg font-semibold">+₹{tier.joiningBonus.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">Joining Bonus</div>
      </div>
    </div>
  );
};

const DepositCalculator = ({ selectedTier, depositAmount, setDepositAmount }) => {
  if (!selectedTier) return null;

  const spendingLimit = (depositAmount * selectedTier.multiplier) + selectedTier.joiningBonus;
  const totalValue = depositAmount + selectedTier.joiningBonus;

  return (
    <div className="card-glass p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Calculator className="h-5 w-5" />
        Calculate Your Card
      </h3>

      <div className="space-y-6">
        {/* Deposit Amount Input */}
        <div>
          <label className="text-sm font-medium mb-2 block">Deposit Amount</label>
          <div className="space-y-3">
            <Input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(Number(e.target.value))}
              min={selectedTier.minDeposit}
              max={selectedTier.maxDeposit}
              className="text-lg font-semibold"
            />
            <Slider
              value={[depositAmount]}
              onValueChange={(value) => setDepositAmount(value[0])}
              min={selectedTier.minDeposit}
              max={selectedTier.maxDeposit}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹{selectedTier.minDeposit.toLocaleString()}</span>
              <span>₹{selectedTier.maxDeposit.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Calculation Breakdown */}
        <div className="bg-muted/30 rounded-xl p-4 space-y-3">
          <div className="flex justify-between">
            <span>Your Deposit</span>
            <span className="font-semibold">₹{depositAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>2x Multiplier</span>
            <span className="font-semibold">₹{(depositAmount * 2).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Joining Bonus</span>
            <span className="font-semibold text-success">+₹{selectedTier.joiningBonus.toLocaleString()}</span>
          </div>
          <div className="border-t border-border pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Spending Limit</span>
              <span className="text-primary">₹{spendingLimit.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Card Preview */}
        <div className="text-center">
          <div className={`relative h-40 bg-gradient-to-br ${selectedTier.gradient} rounded-xl p-4 text-white mx-auto max-w-sm`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs opacity-80">{selectedTier.name} Card</div>
                <div className="font-mono text-sm">•••• •••• •••• 1234</div>
              </div>
              <div className="w-6 h-4 bg-white/20 rounded border border-white/30"></div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs opacity-80">Available</div>
                  <div className="font-bold">₹{spendingLimit.toLocaleString()}</div>
                </div>
                <div className="text-xs opacity-80">12/25</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MintCard = () => {
  const [selectedTier, setSelectedTier] = useState(tiers[1]);
  const [depositAmount, setDepositAmount] = useState(5000);

  const handleMintCard = () => {
    // TODO: Implement minting logic
    console.log('Minting card:', { selectedTier, depositAmount });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Mint Your NFT Spend Card</h1>
        <p className="text-xl text-muted-foreground">
          Choose your tier and unlock 2x spending power with joining bonus
        </p>
      </div>

      {/* Tier Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Choose Your Tier</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              isSelected={selectedTier?.id === tier.id}
              onSelect={setSelectedTier}
            />
          ))}
        </div>
      </div>

      {/* Calculator and Summary */}
      {selectedTier && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DepositCalculator
            selectedTier={selectedTier}
            depositAmount={depositAmount}
            setDepositAmount={setDepositAmount}
          />

          {/* Transaction Summary */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Transaction Summary
            </h3>

            <div className="space-y-4">
              <div className="bg-gradient-primary p-4 rounded-xl text-primary-foreground">
                <div className="text-sm opacity-90 mb-1">You're getting</div>
                <div className="text-2xl font-bold">
                  ₹{((depositAmount * selectedTier.multiplier) + selectedTier.joiningBonus).toLocaleString()} 
                  <span className="text-sm opacity-90 ml-2">spending power</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Card Tier</span>
                  <span className="font-semibold">{selectedTier.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deposit Required</span>
                  <span className="font-semibold">₹{depositAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span className="font-semibold">₹0</span>
                </div>
                <div className="flex justify-between text-success">
                  <span>Joining Bonus</span>
                  <span className="font-semibold">₹{selectedTier.joiningBonus.toLocaleString()}</span>
                </div>
              </div>

              <Button 
                className="w-full btn-primary text-lg py-6"
                onClick={handleMintCard}
              >
                Mint Card for ₹{depositAmount.toLocaleString()}
              </Button>

              <div className="text-xs text-muted-foreground text-center space-y-1">
                <p>• Card expires in 12 months</p>
                <p>• 80% refund if unused at expiry</p>
                <p>• Build credit score with every transaction</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MintCard;