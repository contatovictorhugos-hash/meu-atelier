import React from 'react';
import { cn } from '@/lib/utils/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-2xl border border-pink-200 bg-white/90 px-4 py-2 text-sm text-[#1E1B1E] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-pink-300/50 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
