import React from 'react';
import { Calendar, Clock, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Repayments = () => {
  const outstandingBalance = 12500;
  const totalCredit = 35000;
  const utilizationPercentage = (outstandingBalance / totalCredit) * 100;

  const upcomingPayments = [
    {
      id: 1,
      cardName: 'Premium Card',
      amount: 1250,
      dueDate: '2024-01-18',
      daysLeft: 3,
      status: 'urgent',
      minAmount: 125
    },
    {
      id: 2,
      cardName: 'Standard Card',
      amount: 800,
      dueDate: '2024-01-25',
      daysLeft: 10,
      status: 'upcoming',
      minAmount: 80
    },
    {
      id: 3,
      cardName: 'Starter Card',
      amount: 450,
      dueDate: '2024-02-01',
      daysLeft: 17,
      status: 'upcoming',
      minAmount: 45
    }
  ];

  const paymentHistory = [
    {
      id: 1,
      cardName: 'Premium Card',
      amount: 1500,
      paidDate: '2023-12-18',
      status: 'paid',
      onTime: true
    },
    {
      id: 2,
      cardName: 'Standard Card',
      amount: 650,
      paidDate: '2023-12-20',
      status: 'paid',
      onTime: false
    },
    {
      id: 3,
      cardName: 'Starter Card',
      amount: 300,
      paidDate: '2023-12-15',
      status: 'paid',
      onTime: true
    }
  ];

  const getStatusColor = (status, daysLeft) => {
    if (status === 'urgent' || daysLeft <= 3) return 'text-destructive';
    if (daysLeft <= 7) return 'text-warning';
    return 'text-success';
  };

  const getStatusBadge = (status, daysLeft) => {
    if (status === 'urgent' || daysLeft <= 3) return 'bg-destructive/10 text-destructive';
    if (daysLeft <= 7) return 'bg-warning/10 text-warning';
    return 'bg-success/10 text-success';
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Repayments</h1>
        <p className="text-muted-foreground">Manage your card payments and EMI schedule</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card-glass p-6">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-8 w-8 text-destructive" />
            <div>
              <div className="text-sm text-muted-foreground">Total Outstanding</div>
              <div className="text-2xl font-bold text-destructive">₹{outstandingBalance.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="card-glass p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-8 w-8 text-warning" />
            <div>
              <div className="text-sm text-muted-foreground">Next Payment</div>
              <div className="text-2xl font-bold text-warning">₹1,250</div>
              <div className="text-xs text-muted-foreground">Due in 3 days</div>
            </div>
          </div>
        </div>

        <div className="card-glass p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-8 w-8 text-success" />
            <div>
              <div className="text-sm text-muted-foreground">On-time Rate</div>
              <div className="text-2xl font-bold text-success">94%</div>
            </div>
          </div>
        </div>

        <div className="card-glass p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-8 w-8 text-info" />
            <div>
              <div className="text-sm text-muted-foreground">This Month</div>
              <div className="text-2xl font-bold text-info">₹2,500</div>
              <div className="text-xs text-muted-foreground">Total paid</div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Utilization */}
      <div className="card-glass p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Credit Utilization</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Used Credit</span>
            <span className="font-semibold">₹{outstandingBalance.toLocaleString()} / ₹{totalCredit.toLocaleString()}</span>
          </div>
          <Progress value={utilizationPercentage} className="h-3" />
          <div className="text-sm text-muted-foreground">
            {utilizationPercentage.toFixed(1)}% utilization - {utilizationPercentage < 30 ? 'Good' : 'Consider paying down'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Payments */}
        <div className="card-glass p-6">
          <h3 className="text-lg font-semibold mb-6">Upcoming Payments</h3>
          <div className="space-y-4">
            {upcomingPayments.map((payment) => (
              <div key={payment.id} className={`border rounded-lg p-4 ${
                payment.daysLeft <= 3 ? 'border-destructive/20 bg-destructive/5' :
                payment.daysLeft <= 7 ? 'border-warning/20 bg-warning/5' :
                'border-border bg-muted/20'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{payment.cardName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Due: {new Date(payment.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={getStatusBadge(payment.status, payment.daysLeft)}>
                    {payment.daysLeft <= 3 ? 'Urgent' : 
                     payment.daysLeft <= 7 ? 'Due Soon' : 'Upcoming'}
                  </Badge>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className={`text-xl font-bold ${getStatusColor(payment.status, payment.daysLeft)}`}>
                      ₹{payment.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Min: ₹{payment.minAmount}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getStatusColor(payment.status, payment.daysLeft)}`}>
                      {payment.daysLeft} days left
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 btn-primary">
                    Pay Full Amount
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Pay Minimum
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Payment */}
        <div className="space-y-6">
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Payment</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Card</label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                  <option>Premium Card - ₹1,250 due</option>
                  <option>Standard Card - ₹800 due</option>
                  <option>Starter Card - ₹450 due</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Payment Amount</label>
                <Input 
                  type="number" 
                  placeholder="Enter amount"
                  className="text-lg"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Minimum</Button>
                <Button variant="outline" className="flex-1">Half</Button>
                <Button variant="outline" className="flex-1">Full</Button>
              </div>

              <Button className="w-full btn-primary">
                Make Payment
              </Button>
            </div>
          </div>

          {/* Payment History */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium">{payment.cardName}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(payment.paidDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{payment.amount.toLocaleString()}</div>
                    <div className={`text-xs ${payment.onTime ? 'text-success' : 'text-warning'}`}>
                      {payment.onTime ? 'On time' : 'Late'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repayments;