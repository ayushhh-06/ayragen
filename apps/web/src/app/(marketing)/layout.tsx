import React from 'react';
import { GlobalNavbar } from '@/frontend/interface/common/GlobalNavbar';
import { GlobalFooter } from '@/frontend/interface/common/GlobalFooter';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalNavbar />
      <div className="pt-24 min-h-screen">
        {children}
      </div>
      <GlobalFooter />
    </>
  );
}
