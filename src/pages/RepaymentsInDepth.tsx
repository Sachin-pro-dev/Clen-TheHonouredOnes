import React, { useState } from 'react';
import { useCards } from '@/hooks/useCards';
import { useTransactions } from '@/hooks/useTransactions';
import { useCreditScore } from '@/hooks/useCreditScore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  DollarSign,
  BarChart3,
  Target
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for detailed repayment information
const mockRepaymentData = {
  totalOutstanding: "₹8,450",
  totalInterest: "₹245",
  monthlyEMI: "₹1,250",
  nextDueDate: "2024-02-15",
  overdueAmount: "₹0",
  cards: [
    {
      id: '1',
      name: 'Premium Card',
      outstandingBalance: "₹4,600",
      emiAmount: "₹750",
      nextDueDate: "2024-02-15",
      interestRate: 1.5,
      daysOverdue: 0,
      status: 'current'
    },
    {
      id: '2',
      name: 'Standard Card',
      outstandingBalance: "₹2,800",
      emiAmount: "₹400",
      nextDueDate: "2024-02-18",
      interestRate: 1.8,
      daysOverdue: 0,
      status: 'current'
    },
    {
      id: '3',
      name: 'Starter Card',
      outstandingBalance: "₹1,050",
      emiAmount: "₹100",
      nextDueDate: "2024-02-20",
      interestRate: 2.0,
      daysOverdue: 0,
      status: 'current'
    }
  ],
  paymentHistory: [
    { date: '2024-01-15', amount: '₹1,250', status: 'paid', type: 'on-time' },
    { date: '2023-12-15', amount: '₹1,200', status: 'paid', type: 'on-time' },
    { date: '2023-11-15', amount: '₹1,150', status: 'paid', type: 'on-time' },
    { date: '2023-10-15', amount: '₹1,100', status: 'paid', type: 'late' },
    { date: '2023-09-15', amount: '₹1,050', status: 'paid', type: 'on-time' }
  ],
  analytics: {
    onTimePayments: 18,
    latePayments: 2,
    totalPayments: 20,
    averagePaymentTime: 2.3,
    paymentPerformanceScore: 85
  }
};

const RepaymentsInDepth = () => {
  const [selectedCard, setSelectedCard] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { cards, makeRepayment } = useCards();
  const { addTransaction } = useTransactions();
  const { updateScoreAfterTransaction } = useCreditScore();
  const { toast } = useToast();

  const handleRepayment = async () => {
    if (!selectedCard || !paymentAmount) {
      toast({
        title: "Missing Information",
        description: "Please select a card and enter payment amount",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(paymentAmount);
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await makeRepayment(selectedCard, paymentAmount);
      
      if (result.success) {
        const selectedCardData = cards.find(card => card.id === selectedCard);
        
        // Add transaction
        await addTransaction({
          cardId: selectedCard,
          cardName: selectedCardData?.name || 'Unknown Card',
          type: 'repayment',
          amount: `₹${amount.toLocaleString()}`,
          category: 'Repayment',
          description: `EMI payment for ${selectedCardData?.name}`
        });

        // Update credit score
        await updateScoreAfterTransaction('repayment', true);

        toast({
          title: "Repayment Successful!",
          description: `₹${amount.toLocaleString()} paid successfully`,
        });
        
        setPaymentAmount('');
        setSelectedCard('');
      } else {
        toast({
          title: "Repayment Failed",
          description: result.error || "Failed to process repayment",
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
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: string, daysOverdue: number) => {
    if (daysOverdue > 0) {
      return <Badge variant="destructive">Overdue ({daysOverdue} days)</Badge>;
    }
    return <Badge variant="default">Current</Badge>;
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Repayments In-Depth</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive overview of your repayment obligations and performance
        </p>
      </div>

      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-glass">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold">{mockRepaymentData.totalOutstanding}</div>
            <div className="text-sm text-muted-foreground">Total Outstanding</div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold">{mockRepaymentData.totalInterest}</div>
            <div className="text-sm text-muted-foreground">Total Interest</div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold">{mockRepaymentData.monthlyEMI}</div>
            <div className="text-sm text-muted-foreground">Monthly EMI</div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold">{mockRepaymentData.analytics.paymentPerformanceScore}</div>
            <div className="text-sm text-muted-foreground">Performance Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Card-Specific Details */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Card-Specific Repayment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRepaymentData.cards.map((card) => (
              <div key={card.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{card.name}</h3>
                    {getStatusBadge(card.status, card.daysOverdue)}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{card.outstandingBalance}</div>
                    <div className="text-sm text-muted-foreground">Outstanding</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">EMI Amount</div>
                    <div className="font-semibold">{card.emiAmount}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Interest Rate</div>
                    <div className="font-semibold">{card.interestRate}% monthly</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Next Due</div>
                    <div className="font-semibold">{card.nextDueDate}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Status</div>
                    <div className="font-semibold text-green-600">Current</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Interface */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Make a Payment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Card</label>
              <Select value={selectedCard} onValueChange={setSelectedCard}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a card to pay for" />
                </SelectTrigger>
                <SelectContent>
                  {mockRepaymentData.cards.map((card) => (
                    <SelectItem key={card.id} value={card.id}>
                      <div className="flex justify-between w-full">
                        <span>{card.name}</span>
                        <span className="text-muted-foreground ml-2">{card.outstandingBalance}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Payment Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="0.00"
                  className="pl-8"
                  min="1"
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={handleRepayment}
            className="w-full btn-primary"
            disabled={isProcessing || !selectedCard || !paymentAmount}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Processing Payment...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Make Payment
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Payment History Timeline */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRepaymentData.paymentHistory.map((payment, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className={`h-3 w-3 rounded-full ${payment.type === 'on-time' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">{payment.amount}</div>
                    <div className="text-sm text-muted-foreground">{payment.date}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {payment.type === 'on-time' ? 'Paid on time' : 'Late payment'}
                  </div>
                </div>
                <Badge variant={payment.type === 'on-time' ? 'default' : 'secondary'}>
                  {payment.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Performance Analytics */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Payment Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{mockRepaymentData.analytics.onTimePayments}</div>
              <div className="text-sm text-muted-foreground">On-Time Payments</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{mockRepaymentData.analytics.latePayments}</div>
              <div className="text-sm text-muted-foreground">Late Payments</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{mockRepaymentData.analytics.averagePaymentTime}</div>
              <div className="text-sm text-muted-foreground">Avg. Payment Time (days)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RepaymentsInDepth;