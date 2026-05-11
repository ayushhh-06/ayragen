'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Cpu, Globe, Users, Database } from 'lucide-react';

export const AdminStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard 
        label="Total Generations" 
        value="12,842" 
        change="+14%" 
        icon={<Cpu className="text-primary" />} 
      />
      <StatCard 
        label="Active Deployments" 
        value="8,291" 
        change="+5%" 
        icon={<Globe className="text-blue-400" />} 
      />
      <StatCard 
        label="System Health" 
        value="99.9%" 
        change="Stable" 
        icon={<Activity className="text-green-400" />} 
      />
      <StatCard 
        label="Generation Errors" 
        value="24" 
        change="-12%" 
        icon={<ShieldAlert className="text-red-400" />} 
      />
      <StatCard 
        label="Total Users" 
        value="4,102" 
        change="+22%" 
        icon={<Users className="text-purple-400" />} 
      />
      <StatCard 
        label="Template Usage" 
        value="84%" 
        change="High" 
        icon={<Database className="text-yellow-400" />} 
      />
    </div>
  );
};

const StatCard = ({ label, value, change, icon }: { label: string, value: string, change: string, icon: any }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 bg-white/5 border border-white/10 rounded-[32px] space-y-4"
  >
    <div className="flex items-center justify-between">
      <div className="p-3 bg-white/5 rounded-2xl">
        {icon}
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-white/10 text-white/40'}`}>
        {change}
      </span>
    </div>
    <div>
      <p className="text-white/40 text-sm font-medium">{label}</p>
      <h3 className="text-3xl font-black tracking-tight mt-1">{value}</h3>
    </div>
  </motion.div>
);
