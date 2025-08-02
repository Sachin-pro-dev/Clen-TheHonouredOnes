import React from 'react';
import { Plus, Search, Filter, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const mockCards = [
  {
    id: 1,
    name: "Premium Card",
    tier: "Tier 3",
    balance: "₹15,400",
    limit: "₹20,000",
    expiry: "12/25",
    status: "active",
    gradient: "from-purple-500 to-pink-500",
    spentThisMonth: "₹4,600"
  },
  {
    id: 2,
    name: "Standard Card", 
    tier: "Tier 2",
    balance: "₹7,200",
    limit: "₹10,000",
    expiry: "08/24",
    status: "expiring",
    gradient: "from-blue-500 to-cyan-500",
    spentThisMonth: "₹2,800"
  },
  {
    id: 3,
    name: "Starter Card",
    tier: "Tier 1",
    balance: "₹1,980",
    limit: "₹5,000",
    expiry: "03/25", 
    status: "active",
    gradient: "from-green-500 to-teal-500",
    spentThisMonth: "₹3,020"
  }
];

const CardItem = ({ card }) => (
  <div className="card-glass card-hover p-6">
    <div className="flex justify-between items-start mb-4">
      <div>
        <Badge className={`mb-2 ${
          card.status === 'expiring' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
        }`}>
          {card.tier}
        </Badge>
        <h3 className="font-bold text-lg">{card.name}</h3>
      </div>
      <Button variant="ghost" size="icon">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>

    {/* Card Preview */}
    <div className={`relative h-32 bg-gradient-to-br ${card.gradient} rounded-xl mb-4 p-4 text-white`}>
      <div className="flex justify-between items-start">
        <div className="font-mono text-sm">•••• •••• •••• {1000 + card.id}</div>
        <div className="w-6 h-4 bg-white/20 rounded border border-white/30"></div>
      </div>
      <div className="absolute bottom-4 left-4">
        <div className="text-xs opacity-80">Expires {card.expiry}</div>
      </div>
    </div>

    {/* Card Stats */}
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <div className="text-sm text-muted-foreground">Available</div>
        <div className="font-semibold text-lg">{card.balance}</div>
        <div className="text-xs text-muted-foreground">of {card.limit}</div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground">Spent This Month</div>
        <div className="font-semibold text-lg">{card.spentThisMonth}</div>
      </div>
    </div>

    {/* Actions */}
    <div className="flex gap-2">
      <Button className="flex-1 btn-primary">Spend</Button>
      <Button variant="outline" className="flex-1">History</Button>
    </div>
  </div>
);

const MyCards = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Cards</h1>
          <p className="text-muted-foreground">Manage your NFT spend cards</p>
        </div>
        <Button className="btn-primary gap-2">
          <Plus className="h-4 w-4" />
          Mint New Card
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search cards..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mockCards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
        
        {/* Add New Card */}
        <div className="card-glass border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer group p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Plus className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Mint New Card</h3>
          <p className="text-sm text-muted-foreground mb-4">Start with as low as ₹1,000</p>
          <Button className="btn-primary">Get Started</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-glass p-4 text-center">
          <div className="text-2xl font-bold text-primary">3</div>
          <div className="text-sm text-muted-foreground">Active Cards</div>
        </div>
        <div className="card-glass p-4 text-center">
          <div className="text-2xl font-bold text-foreground">₹35,000</div>
          <div className="text-sm text-muted-foreground">Total Limit</div>
        </div>
        <div className="card-glass p-4 text-center">
          <div className="text-2xl font-bold text-success">₹24,580</div>
          <div className="text-sm text-muted-foreground">Available</div>
        </div>
        <div className="card-glass p-4 text-center">
          <div className="text-2xl font-bold text-warning">₹10,420</div>
          <div className="text-sm text-muted-foreground">This Month</div>
        </div>
      </div>
    </div>
  );
};

export default MyCards;