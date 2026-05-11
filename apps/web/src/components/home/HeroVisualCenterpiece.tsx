'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Stars, Sparkles } from 'lucide-react';
import { OrbitingParticles } from './OrbitingParticles';

export const HeroVisualCenterpiece = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto py-40 flex items-center justify-center pointer-events-none">
      <OrbitingParticles count={30} />
      {/* The Giant Aura Sphere - The Heart of the Engine */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-30"
      >
        <div className="relative w-[500px] h-[500px]">
          {/* Massive Atmospheric Glow */}
          <div className="absolute inset-[-100px] bg-gradient-to-tr from-[#4facfe]/30 to-[#D4145A]/20 rounded-full blur-[120px] animate-pulse" />
          
          {/* Crystalline Shell */}
          <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent rounded-full border border-white/20 backdrop-blur-3xl shadow-[0_0_100px_rgba(79,172,254,0.1)]" />
          
          {/* Living Core */}
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.3, 1] 
            }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute inset-32 bg-white/5 rounded-full border border-white/30 flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.15)]"
          >
            <Sparkles className="text-white/60 w-20 h-20 blur-[1px]" />
          </motion.div>

          {/* Orbiting Elements */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20px] rounded-full border border-white/5"
            >
              <div className="w-2 h-2 bg-primary rounded-full absolute top-0 left-1/2 -translate-x-1/2 blur-[2px]" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating Glass Card (Memory Frame) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-20 flex items-center justify-center"
      >
        <div className="w-80 h-96 glass-card rounded-[40px] border border-white/20 relative overflow-hidden flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          
          {/* Animated Memory Elements */}
          <motion.div 
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-white/20 italic font-light text-center p-8 select-none"
          >
            "A rainy midnight apology..."
          </motion.div>

          <Sparkles className="absolute top-6 right-6 text-white/30" size={24} />
          <Stars className="absolute bottom-6 left-6 text-white/30" size={24} />
        </div>
      </motion.div>

      {/* Atmospheric Glow Orbs (Visual Centerpiece) */}
      <div className="absolute inset-0 z-10">
        <motion.div
          animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 blur-[60px] rounded-full"
        />
        <motion.div
          animate={{ x: [20, -20, 20], y: [20, -20, 20] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 blur-[80px] rounded-full"
        />
      </div>
    </div>
  );
};
