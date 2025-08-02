import React from 'react';
import { MoreVertical, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockCards = [
  {
    id: 1,
    name: "Premium Card",
    tier: "Tier 3",
    balance: "₹15,400",
    limit: "₹20,000",
    expiry: "12/25",
    gradient: "from-purple-500 to-pink-500",
    isExpiring: false
  },
  {
    id: 2,
    name: "Standard Card",
    tier: "Tier 2", 
    balance: "₹7,200",
    limit: "₹10,000",
    expiry: "08/24",
    gradient: "from-blue-500 to-cyan-500",
    isExpiring: true
  },
  {
    id: 3,
    name: "Starter Card",
    tier: "Tier 1",
    balance: "₹1,980",
    limit: "₹5,000", 
    expiry: "03/25",
    gradient: "from-green-500 to-teal-500",
    isExpiring: false
  }
];

const CardItem = ({ card }) => (
  <div className={`relative w-80 h-48 bg-gradient-to-br ${card.gradient} rounded-2xl p-6 text-white shadow-glow transition-transform hover:scale-105 hover:shadow-xl`}>
    {/* Card Header */}
    <div className="flex justify-between items-start mb-4">
      <div>
        <Badge className="bg-white/20 text-white border-0 mb-2">
          {card.tier}
        </Badge>
        <h3 className="font-bold text-lg">{card.name}</h3>
      </div>
      <div className="flex items-center gap-2">
        {card.isExpiring && (
          <div className="flex items-center gap-1 bg-warning/20 rounded-full px-2 py-1">
            <Clock className="h-3 w-3" />
            <span className="text-xs">Expiring</span>
          </div>
        )}
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white/80 hover:bg-white/10">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>

    {/* Card Number */}
    <div className="font-mono text-lg tracking-widest mb-6">
      •••• •••• •••• {1000 + card.id}
    </div>

    {/* Card Footer */}
    <div className="flex justify-between items-end">
      <div>
        <div className="text-white/80 text-xs">Available Balance</div>
        <div className="font-bold text-xl">{card.balance}</div>
        <div className="text-white/60 text-xs">of {card.limit}</div>
      </div>
      <div className="text-right">
        <div className="text-white/80 text-xs">Expires</div>
        <div className="font-medium">{card.expiry}</div>
      </div>
    </div>

    {/* Chip */}
    <div className="absolute top-6 right-6 w-8 h-6 bg-white/20 rounded border border-white/30"></div>
  </div>
);

const ActiveCardsCarousel = () => {
  return (
    <div className="card-glass p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Active Cards</h2>
        <Button variant="outline" size="sm" className="gap-2">
          <Zap className="h-4 w-4" />
          Quick Spend
        </Button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {mockCards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
        
        {/* Add New Card */}
        <div className="w-80 h-48 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
            <span className="text-2xl font-light">+</span>
          </div>
          <span className="font-medium">Mint New Card</span>
          <span className="text-sm">Start with ₹1,000</span>
        </div>
      </div>
    </div>
  );
};

export default ActiveCardsCarousel;