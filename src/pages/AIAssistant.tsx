import React, { useState } from 'react';
import { Send, Mic, Bot, User, Sparkles, HelpCircle, TrendingUp, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hi! I'm your Clen AI assistant. I can help you with credit advice, transaction queries, budget planning, and more. What would you like to know?",
      timestamp: new Date()
    }
  ]);

  const quickActions = [
    { text: "What's my credit score?", icon: TrendingUp },
    { text: "Help me budget this month", icon: HelpCircle },
    { text: "When is my next payment due?", icon: CreditCard },
    { text: "Show spending insights", icon: Sparkles }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    // Simulate AI response
    const aiResponse = {
      id: messages.length + 2,
      type: 'assistant',
      content: generateAIResponse(message),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setMessage('');
  };

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('credit score')) {
      return "Your current credit score is 742, which is excellent! You've improved by 12 points this month. Your payment history (95%) and transaction diversity (78%) are your strongest factors. To reach the next tier, focus on maintaining your excellent payment habits.";
    }
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('spending')) {
      return "Based on your spending patterns, you've used ₹8,430 of your ₹10,000 monthly budget (84%). Your biggest categories are Shopping (38%) and Food (25%). I recommend reducing food delivery orders by 20% to stay within budget. Would you like me to set up spending alerts?";
    }
    
    if (lowerMessage.includes('payment') || lowerMessage.includes('due')) {
      return "You have 3 upcoming payments: Premium Card (₹1,250 due in 3 days - Urgent), Standard Card (₹800 due in 10 days), and Starter Card (₹450 due in 17 days). I recommend paying the Premium Card immediately to avoid late fees. Would you like me to set up automatic payments?";
    }
    
    if (lowerMessage.includes('card') || lowerMessage.includes('mint')) {
      return "You currently have 3 active cards with a total limit of ₹35,000. Based on your credit score of 742, you're eligible for a Premium Tier 3 card with up to ₹50,000 limit. Minting a new card would give you 2x spending power plus a joining bonus. Would you like to see available options?";
    }
    
    return "I understand you're asking about your Clen account. Could you be more specific? I can help with credit scores, spending analysis, payment schedules, card management, budgeting tips, and financial planning. Just ask me anything!";
  };

  const handleQuickAction = (actionText) => {
    setMessage(actionText);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          AI Financial Assistant
        </h1>
        <p className="text-muted-foreground">Get personalized financial advice and insights</p>
      </div>

      {/* Chat Container */}
      <div className="card-glass h-[600px] flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.type === 'assistant' && (
                <div className="h-8 w-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.type === 'user' 
                  ? 'bg-gradient-primary text-primary-foreground ml-auto' 
                  : 'bg-muted/50'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p className={`text-xs mt-2 opacity-70 ${
                  msg.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {msg.type === 'user' && (
                <div className="h-8 w-8 bg-gradient-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="border-t border-border p-4">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-3">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.text)}
                    className="gap-2"
                  >
                    <IconComponent className="h-3 w-3" />
                    {action.text}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Message Input */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything about your finances..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleSendMessage} className="btn-primary">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* AI Capabilities */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-glass p-4 text-center">
          <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold mb-1">Credit Insights</h3>
          <p className="text-sm text-muted-foreground">Get personalized advice on improving your credit score</p>
        </div>
        
        <div className="card-glass p-4 text-center">
          <Sparkles className="h-8 w-8 text-secondary mx-auto mb-2" />
          <h3 className="font-semibold mb-1">Smart Budgeting</h3>
          <p className="text-sm text-muted-foreground">AI-powered budget recommendations and spending analysis</p>
        </div>
        
        <div className="card-glass p-4 text-center">
          <HelpCircle className="h-8 w-8 text-accent mx-auto mb-2" />
          <h3 className="font-semibold mb-1">24/7 Support</h3>
          <p className="text-sm text-muted-foreground">Instant answers to your financial questions anytime</p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;