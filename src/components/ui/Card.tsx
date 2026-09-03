import React from 'react';
import { cn } from '@/lib/utils/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'scrapbook' | 'polaroid' | 'digicam';
}

export const Card = ({
  className,
  variant = 'default',
  children,
  ...props
}: CardProps) => {
  const variants = {
    default: 'bg-white rounded-3xl p-4 shadow-sm border border-pink-100/70',
    scrapbook: 'bg-[#FCFBF7] rounded-3xl p-5 shadow-scrapbook border border-pink-200/50 relative',
    polaroid: 'polaroid-card',
    digicam: 'digicam-screen p-4',
  };

  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
};
