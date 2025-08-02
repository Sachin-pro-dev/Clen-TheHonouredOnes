import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Header from './Header';
import { AppSidebar } from './AppSidebar';
import { MintCardModal } from '@/components/modals/MintCardModal';
import { QuickSpendModal } from '@/components/modals/QuickSpendModal';
import { PayNowModal } from '@/components/modals/PayNowModal';

const Layout = () => {
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const [isQuickSpendOpen, setIsQuickSpendOpen] = useState(false);
  const [isPayNowOpen, setIsPayNowOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="flex min-h-screen w-full">
        <AppSidebar 
          onMintCard={() => setIsMintModalOpen(true)}
          onQuickSpend={() => setIsQuickSpendOpen(true)}
          onPayNow={() => setIsPayNowOpen(true)}
        />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
      
      {/* Global Modals */}
      <MintCardModal isOpen={isMintModalOpen} onClose={() => setIsMintModalOpen(false)} />
      <QuickSpendModal isOpen={isQuickSpendOpen} onClose={() => setIsQuickSpendOpen(false)} />
      <PayNowModal isOpen={isPayNowOpen} onClose={() => setIsPayNowOpen(false)} />
    </div>
  );
};

export default Layout;