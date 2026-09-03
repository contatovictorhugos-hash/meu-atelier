import React from 'react';
import { cn } from '@/lib/utils/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blush' | 'silver' | 'bordeaux' | 'cream' | 'sage';
}

export const Badge = ({
  className,
  variant = 'blush',
  children,
  ...props
}: BadgeProps) => {
  const variants = {
    blush: 'bg-pink-100/80 text-[#4A1525] border-pink-200',
    silver: 'bg-slate-100 text-slate-700 border-slate-200',
    bordeaux: 'bg-[#4A1525] text-white border-transparent',
    cream: 'bg-[#FCFBF7] text-[#1E1B1E] border-stone-200',
    sage: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
