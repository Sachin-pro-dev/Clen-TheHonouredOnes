import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CreditCard,
  History,
  Target,
  Gift,
  TrendingUp,
  Bot,
  User,
  Calendar,
  HelpCircle,
  Plus,
  Zap,
  DollarSign
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const primaryNavItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'My Cards', url: '/cards', icon: CreditCard },
  { title: 'Transactions', url: '/transactions', icon: History },
  { title: 'Credit Score', url: '/credit-profile', icon: Target },
  { title: 'Rewards', url: '/rewards', icon: Gift },
  { title: 'Analytics', url: '/spend-analysis', icon: TrendingUp },
  { title: 'AI Assistant', url: '/ai-assistant', icon: Bot },
];

const secondaryNavItems = [
  { title: 'Profile', url: '/profile', icon: User },
  { title: 'Repayments', url: '/repayments', icon: Calendar },
  { title: 'Help', url: '/help', icon: HelpCircle },
];

interface AppSidebarProps {
  onMintCard?: () => void;
  onQuickSpend?: () => void;
  onPayNow?: () => void;
}

const quickActions = [
  { title: 'Mint Card', icon: Plus, color: 'bg-gradient-primary', action: 'mint' },
  { title: 'Quick Spend', icon: Zap, color: 'bg-gradient-secondary', action: 'spend' },
  { title: 'Pay Now', icon: DollarSign, color: 'bg-gradient-success', action: 'pay' },
];

export function AppSidebar({ onMintCard, onQuickSpend, onPayNow }: AppSidebarProps = {}) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  
  const getNavClassName = (path: string) =>
    isActive(path) 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"}>
      <SidebarContent className="bg-sidebar/50 backdrop-blur-sm">
        {/* Credit Score Widget */}
        {!isCollapsed && (
          <div className="p-4 m-4 bg-gradient-primary rounded-xl text-primary-foreground">
            <div className="text-sm opacity-90">Credit Score</div>
            <div className="text-2xl font-bold">742</div>
            <div className="flex items-center gap-1 text-xs opacity-75">
              <TrendingUp className="h-3 w-3" />
              +12 this month
            </div>
          </div>
        )}

        {/* Primary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${getNavClassName(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
              Quick Actions
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2 px-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    className={`w-full justify-start gap-3 ${action.color} text-white hover:opacity-90 transition-opacity`}
                    size="sm"
                    onClick={() => {
                      if (action.action === 'mint') onMintCard?.();
                      if (action.action === 'spend') onQuickSpend?.();
                      if (action.action === 'pay') onPayNow?.();
                    }}
                  >
                    <action.icon className="h-4 w-4" />
                    {action.title}
                  </Button>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${getNavClassName(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}