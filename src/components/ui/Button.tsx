import React from 'react';
import { cn } from '@/lib/utils/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'sticker';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-full min-h-[44px] min-w-[44px] focus:outline-none';

    const variants = {
      primary:
        'bg-[#4A1525] text-white hover:bg-[#380E1C] shadow-sm active:bg-[#250912]',
      secondary:
        'bg-[#FCE7EC] text-[#4A1525] hover:bg-[#FBCFE8] border border-pink-200/60',
      outline:
        'border border-pink-300/80 text-[#4A1525] bg-white/80 hover:bg-pink-50/60',
      ghost:
        'text-[#4A1525] hover:bg-pink-100/50',
      sticker:
        'bg-white text-[#4A1525] border border-pink-200 shadow-sticker hover:border-pink-300 font-semibold',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-6 py-3',
      icon: 'p-2',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
