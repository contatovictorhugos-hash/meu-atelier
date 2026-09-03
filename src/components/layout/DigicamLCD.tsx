import React from 'react';
import { cn } from '@/lib/utils/utils';

interface DigicamLCDProps {
  battery?: string;
  mode?: string;
  children: React.ReactNode;
  className?: string;
}

export const DigicamLCD: React.FC<DigicamLCDProps> = ({
  battery = '100%',
  mode = 'REC [Y2K]',
  children,
  className,
}) => {
  return (
    <div className={cn('digicam-screen p-3 rounded-2xl relative', className)}>
      <div className="flex justify-between items-center text-[10px] text-sky-400/80 mb-2 border-b border-sky-900/40 pb-1 font-mono tracking-wider">
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
          {mode}
        </span>
        <span>BATT {battery}</span>
      </div>
      <div className="py-1">{children}</div>
    </div>
  );
};
