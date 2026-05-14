'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@auragen/schema';

export const CountdownSection = ({ section }: { section: Section }) => {
  const { targetDate, message } = section.content;
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const TimeUnit = ({ label, value }: { label: string, value: number }) => (
    <div className="flex flex-col items-center glass p-6 rounded-3xl min-w-[120px]">
      <span className="text-4xl md:text-6xl font-bold text-glow">{value.toString().padStart(2, '0')}</span>
      <span className="text-xs uppercase tracking-widest mt-2 opacity-60">{label}</span>
    </div>
  );

  return (
    <section className="min-h-[50vh] flex flex-col items-center justify-center section-gap px-4">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-2xl md:text-3xl mb-12 font-medium opacity-80"
      >
        {message || 'The Big Day Is Coming'}
      </motion.h2>
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        <TimeUnit label="Days" value={timeLeft.days} />
        <TimeUnit label="Hours" value={timeLeft.hours} />
        <TimeUnit label="Minutes" value={timeLeft.mins} />
        <TimeUnit label="Seconds" value={timeLeft.secs} />
      </div>
    </section>
  );
};
