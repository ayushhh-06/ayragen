'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle, ExternalLink, MoreVertical } from 'lucide-react';

export const MonitoringTable = ({ type }: { type: 'generation' | 'deployment' }) => {
  const jobs = [
    { id: 'job_821', user: 'ayush@example.com', status: 'COMPLETED', time: '2m ago', duration: '14s' },
    { id: 'job_820', user: 'sara@example.com', status: 'PROCESSING', time: '5m ago', duration: 'running' },
    { id: 'job_819', user: 'mike@example.com', status: 'FAILED', time: '12m ago', duration: '45s' },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden mt-8">
      <div className="p-8 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-xl font-bold capitalize">{type} Monitoring</h3>
        <button className="text-xs font-bold text-primary hover:underline">View All Logs</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-white/20 text-[10px] uppercase tracking-widest border-b border-white/5">
              <th className="px-8 py-6 font-bold">ID</th>
              <th className="px-8 py-6 font-bold">User</th>
              <th className="px-8 py-6 font-bold">Status</th>
              <th className="px-8 py-6 font-bold">Duration</th>
              <th className="px-8 py-6 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {jobs.map((job, i) => (
              <tr key={job.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6 font-mono text-sm text-white/40">{job.id}</td>
                <td className="px-8 py-6 font-medium">{job.user}</td>
                <td className="px-8 py-6">
                  <StatusBadge status={job.status} />
                </td>
                <td className="px-8 py-6 text-sm text-white/40">{job.duration}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/20 hover:text-white">
                      <ExternalLink size={16} />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/20 hover:text-white">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    COMPLETED: 'bg-green-500/10 text-green-500',
    PROCESSING: 'bg-blue-500/10 text-blue-500',
    FAILED: 'bg-red-500/10 text-red-500',
  };

  const icons = {
    COMPLETED: <CheckCircle2 size={12} />,
    PROCESSING: <Clock size={12} className="animate-spin" />,
    FAILED: <AlertCircle size={12} />,
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status as keyof typeof styles]}`}>
      {icons[status as keyof typeof icons]}
      {status}
    </div>
  );
};
