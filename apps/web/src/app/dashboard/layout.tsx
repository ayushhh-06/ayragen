'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, FolderOpen, Wand2, LayoutTemplate, 
  BarChart3, Globe, Users, Settings, Search, Bell, HelpCircle, Sparkles, Menu, X
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { icon: <LayoutDashboard size={16} />, label: 'Dashboard', href: '/dashboard' },
  { icon: <Wand2 size={16} />, label: 'AI Generate', href: '/builder' },
  { icon: <LayoutTemplate size={16} />, label: 'Templates', href: '/templates' },
  { icon: <Globe size={16} />, label: 'Deployment', href: '/dashboard/deployment' },
  { icon: <BarChart3 size={16} />, label: 'Analytics', href: '#' },
  { icon: <Settings size={16} />, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-[#050505] text-[#FAFAFA] font-sans overflow-hidden relative">
      
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-purple-900/10 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-pink-900/10 blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-white/[0.08] bg-white/[0.01] backdrop-blur-3xl flex-col justify-between hidden md:flex relative z-50">
        <div>
          {/* Logo */}
          <div className="h-20 flex items-center px-6 border-b border-white/[0.04]">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
                <Sparkles className="h-3.5 w-3.5 text-purple-300" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-white/90">AyraGen</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1.5">
            {NAV_ITEMS.map((item) => (
              <NavItem 
                key={item.label} 
                icon={item.icon} 
                label={item.label} 
                href={item.href} 
                active={pathname === item.href} 
              />
            ))}
          </nav>
        </div>

        {/* Bottom - Profile/Plan */}
        <div className="p-4 border-t border-white/[0.04] space-y-4">
          <Link href="/pricing" className="block rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 relative overflow-hidden group hover:bg-white/[0.04] transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-[30px] pointer-events-none group-hover:bg-purple-500/10 transition-all" />
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Usage</span>
              <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded-full capitalize">
                {user?.subscription?.planId || 'Genesis'}
              </span>
            </div>
            <div className="w-full bg-white/[0.05] h-1 rounded-full overflow-hidden mb-2 relative z-10">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-[72%] h-full rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            </div>
            <p className="text-[10px] text-white/50 relative z-10">720 / 1000 Credits</p>
          </Link>
          
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-white/40 hover:bg-red-500/5 hover:text-red-400 transition-all border border-transparent hover:border-red-500/10"
          >
            <LogOut size={16} />
            Logout Studio
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] md:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-[#050505] border-r border-white/10 z-[70] p-6 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  <span className="font-bold text-lg">AyraGen</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/5 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 space-y-2">
                {NAV_ITEMS.map((item) => (
                  <NavItem 
                    key={item.label} 
                    icon={item.icon} 
                    label={item.label} 
                    href={item.href} 
                    active={pathname === item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        
        {/* Topbar */}
        <header className="h-16 border-b border-white/[0.08] bg-[#050505]/40 backdrop-blur-xl flex items-center justify-between px-6 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-1.5 w-48 sm:w-80 focus-within:border-white/20 transition-all">
              <Search className="w-3.5 h-3.5 text-white/30 mr-2" />
              <input 
                type="text" 
                placeholder="Search assets..." 
                className="bg-transparent border-none outline-none text-[13px] text-white placeholder:text-white/30 w-full font-light"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden sm:flex items-center gap-4 text-white/30">
              <HelpCircle className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              <Bell className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            </div>
            <div className="h-8 w-px bg-white/[0.08] hidden sm:block" />
            <Link href="/profile" className="flex items-center gap-3 group">
              <div className="hidden md:block text-right">
                <p className="text-[12px] font-bold text-white/90 leading-tight">{user?.name || 'Explorer'}</p>
                <p className="text-[10px] text-white/30 font-light tracking-wide capitalize">{user?.role || 'Guest'}</p>
              </div>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 shadow-lg group-hover:border-white/40 transition-all bg-white/5 flex items-center justify-center">
                {user?.name ? (
                  <span className="text-xs font-bold text-white/50">{user.name.charAt(0)}</span>
                ) : (
                  <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" width={32} height={32} alt="Avatar" className="object-cover w-full h-full" />
                )}
              </div>
            </Link>
          </div>
        </header>

        {/* Scrollable Content with Page Transitions */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, href, active = false, onClick }: { icon: React.ReactNode, label: string, href: string, active?: boolean, onClick?: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${active ? 'bg-white/[0.06] text-white border border-white/[0.08] shadow-lg' : 'text-white/40 hover:bg-white/[0.03] hover:text-white border border-transparent'}`}
    >
      <span className={active ? 'text-purple-400' : 'group-hover:text-white transition-colors'}>{icon}</span>
      {label}
    </Link>
  );
}
