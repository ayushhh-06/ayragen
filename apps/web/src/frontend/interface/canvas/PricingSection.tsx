'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const PricingSection = ({ section }: { section: any }) => {
  const { title, subtitle, tiers = [] } = section.content || {};

  return (
    <section className="py-24 px-6 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4">{title || 'Simple Pricing'}</h2>
          <p className="text-white/40 font-light">{subtitle || 'Choose the plan that fits your vision.'}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-10 rounded-[40px] flex flex-col ${tier.popular ? 'bg-white/[0.08] border-primary/50 border-2 shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)] scale-105' : 'bg-white/[0.02] border border-white/10'}`}
            >
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-2 uppercase tracking-widest text-white/60">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tighter">${tier.price}</span>
                  <span className="text-white/30 text-sm">/mo</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/50">
                    <Check className="w-4 h-4 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-2xl font-bold transition-all ${tier.popular ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02]' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                {tier.buttonText || 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
