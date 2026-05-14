import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'glass' | 'premium' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    
    const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-95';
    
    const variants = {
      default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
      premium: 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_20px_rgba(229,9,20,0.3)] hover:shadow-[0_0_30px_rgba(229,9,20,0.5)]',
      outline: 'border border-input bg-background shadow-sm hover:bg-white/10 hover:text-white',
      ghost: 'hover:bg-white/10 hover:text-white',
    };

    const sizes = {
      default: 'h-11 px-6 py-2',
      sm: 'h-9 rounded-full px-3 text-xs',
      lg: 'h-14 rounded-full px-10 text-base',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
