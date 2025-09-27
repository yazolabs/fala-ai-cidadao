import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { TopBar } from './TopBar';
import { BottomTabs } from './BottomTabs';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (!user) return <>{children}</>;

  const isBackoffice = user.role === 'Admin' || user.role === 'Agent';

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Desktop Sidebar or Backoffice Sidebar */}
        {(!isMobile || isBackoffice) && <Sidebar />}
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Tabs - only for citizens */}
      {isMobile && !isBackoffice && <BottomTabs />}
    </div>
  );
}