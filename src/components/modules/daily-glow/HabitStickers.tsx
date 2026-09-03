'use client';

import React from 'react';
import { useDailyGlowStore, HabitItem } from '@/stores/useDailyGlowStore';
import { cn } from '@/lib/utils/utils';
import { Check } from 'lucide-react';

export const HabitStickers: React.FC = () => {
  const { morningHabits, eveningHabits, toggleMorningHabit, toggleEveningHabit } =
    useDailyGlowStore();

  const renderSection = (
    title: string,
    habits: HabitItem[],
    onToggle: (id: string) => void
  ) => (
    <div className="mb-4">
      <h4 className="text-xs font-semibold text-[#4A1525]/80 uppercase tracking-wider mb-2">
        {title}
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {habits.map((item) => {
          return (
            <button
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={cn(
                'flex items-center justify-between p-2.5 rounded-2xl border transition-all text-left min-h-[44px]',
                item.completed
                  ? 'bg-pink-100/90 border-pink-300 text-[#4A1525] shadow-sm scale-98'
                  : 'bg-white border-pink-100 text-stone-700 hover:border-pink-200'
              )}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-base">{item.icon}</span>
                <span
                  className={cn(
                    'text-xs font-medium truncate',
                    item.completed && 'line-through text-pink-700/60'
                  )}
                >
                  {item.label}
                </span>
              </div>
              <div
                className={cn(
                  'w-5 h-5 rounded-full border flex items-center justify-center transition-colors',
                  item.completed
                    ? 'bg-[#4A1525] border-[#4A1525] text-white'
                    : 'border-pink-200 bg-white'
                )}
              >
                {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 border border-pink-100/80 shadow-sm">
      {renderSection('☀️ Ritual Matinal & Skincare', morningHabits, toggleMorningHabit)}
      {renderSection('🌙 Ritual Noturno & Autocuidado', eveningHabits, toggleEveningHabit)}
    </div>
  );
};
