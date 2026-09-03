'use client';

import React from 'react';
import { useDailyGlowStore } from '@/stores/useDailyGlowStore';
import { cn } from '@/lib/utils/utils';
import { Droplet, Plus, Minus } from 'lucide-react';

export const HydrationTracker: React.FC = () => {
  const { waterCups, waterGoal, incrementWater, decrementWater } =
    useDailyGlowStore();

  const drops = Array.from({ length: waterGoal }, (_, index) => index < waterCups);

  return (
    <div className="bg-[#FCFBF7] rounded-3xl p-4 border border-pink-200/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-[#4A1525] flex items-center gap-1.5">
            <Droplet className="w-4 h-4 text-sky-400 fill-sky-400" />
            Hidratação Diária
          </h3>
          <p className="text-[11px] text-stone-500">
            {waterCups} de {waterGoal} copos (~{(waterCups * 250) / 1000}L)
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={decrementWater}
            disabled={waterCups <= 0}
            className="w-8 h-8 rounded-full border border-pink-200 flex items-center justify-center text-stone-600 disabled:opacity-30 active:scale-90 transition-transform min-h-[44px] min-w-[44px]"
            aria-label="Diminuir água"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={incrementWater}
            disabled={waterCups >= waterGoal}
            className="w-8 h-8 rounded-full bg-[#4A1525] text-white flex items-center justify-center disabled:opacity-30 active:scale-90 transition-transform min-h-[44px] min-w-[44px]"
            aria-label="Aumentar água"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-1.5 py-1">
        {drops.map((isFilled, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx < waterCups) {
                decrementWater();
              } else {
                incrementWater();
              }
            }}
            className="flex flex-col items-center justify-center p-1 rounded-xl transition-all active:scale-95"
            aria-label={`Copo ${idx + 1}`}
          >
            <Droplet
              className={cn(
                'w-6 h-6 transition-all duration-300',
                isFilled
                  ? 'text-sky-500 fill-sky-400 scale-110 drop-shadow-sm'
                  : 'text-stone-300 fill-transparent hover:text-sky-200'
              )}
            />
            <span className="text-[9px] font-mono text-stone-400 mt-1">
              {idx + 1}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
