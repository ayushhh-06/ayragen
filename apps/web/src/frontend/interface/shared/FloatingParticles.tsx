'use client';

import { useEffect, useRef } from 'react';

interface Particle { x: number; y: number; vx: number; vy: number; size: number; alpha: number; hue: number; }

export const FloatingParticles = ({ count = 40 }: { count?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.5 ? 270 : 330, // purple or rose
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += (Math.random() - 0.5) * 0.01;
        p.alpha = Math.max(0.05, Math.min(0.6, p.alpha));
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `hsla(${p.hue}, 80%, 75%, 0.5)`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [count]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none" />;
};
