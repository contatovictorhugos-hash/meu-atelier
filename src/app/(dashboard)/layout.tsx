import React from 'react';
import { BottomNav } from '@/components/layout/BottomNav';
import { UserHeader } from '@/components/layout/UserHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="flex-1 w-full px-4 pt-4 safe-top">
        <UserHeader />
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
