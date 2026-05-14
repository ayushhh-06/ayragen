'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const RainSystem = () => {
  const [drops, setDrops] = useState<any[]>([]);

  useEffect(() => {
    const newDrops = [...Array(40)].map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 0.5 + Math.random() * 0.5,
      opacity: 0.1 + Math.random() * 0.2,
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ y: -100, x: drop.x, opacity: 0 }}
          animate={{ 
            y: '120vh', 
            opacity: [0, drop.opacity, 0] 
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: "linear"
          }}
          className="absolute w-[1px] h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent"
          style={{ transform: 'rotate(15deg)' }}
        />
      ))}
    </div>
  );
};
