'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const OrbitingParticles = ({ count = 20 }: { count?: number }) => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      radius: 200 + Math.random() * 150,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * -20,
      opacity: 0.1 + Math.random() * 0.4,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            style={{
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              x: p.radius,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [p.opacity, p.opacity * 2, p.opacity],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-primary rounded-full blur-[1px]"
          />
        </motion.div>
      ))}
    </div>
  );
};
