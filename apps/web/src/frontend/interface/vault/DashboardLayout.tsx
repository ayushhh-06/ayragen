'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, PlusCircle, Settings, Folder, BarChart2, LogOut } from 'lucide-react';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col gap-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold">A</div>
          <span className="text-xl font-black tracking-tighter">AuraGen</span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" active />
          <NavItem icon={<Folder size={20} />} label="My Projects" />
          <NavItem icon={<BarChart2 size={20} />} label="Analytics" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="pt-6 border-t border-white/5">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-white/40 hover:text-white transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <button className={`
    flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-300
    ${active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-white/40 hover:bg-white/5 hover:text-white'}
  `}>
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);
