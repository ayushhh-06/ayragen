import { tokens } from '@/frontend/experience/themes/designTokens';

export const motionPresets = {
  cinematicFade: {
    initial: { opacity: 0, filter: 'blur(20px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(20px)' },
    transition: { duration: parseFloat(tokens.animation.timing.cinematic), ease: [0.22, 1, 0.36, 1] }
  },
  editorialReveal: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
    transition: { duration: parseFloat(tokens.animation.timing.fluid), ease: [0.22, 1, 0.36, 1] }
  },
  softParallax: {
    initial: { opacity: 0, y: 100, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: parseFloat(tokens.animation.timing.cinematic), ease: [0.22, 1, 0.36, 1] }
  },
  ambientFloat: {
    animate: { 
      y: [0, -20, 0],
      rotate: [0, 2, 0]
    },
    transition: { 
      duration: parseFloat(tokens.animation.timing.ambient), 
      repeat: Infinity, 
      ease: 'easeInOut' 
    }
  },
  elegantScale: {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: parseFloat(tokens.animation.timing.cinematic), ease: [0.22, 1, 0.36, 1] }
  },
  staggerChildren: {
    animate: { transition: { staggerChildren: 0.2 } }
  }
};
