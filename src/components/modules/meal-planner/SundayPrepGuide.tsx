'use client';

import React from 'react';
import { useMealStore } from '@/stores/useMealStore';
import { Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils/utils';

export const SundayPrepGuide: React.FC = () => {
  const { sundayPrepTasks, togglePrepTask } = useMealStore();

  const completedCount = sundayPrepTasks.filter((t) => t.completed).length;

  return (
    <div className="bg-[#FCFBF7] rounded-3xl p-4 border border-pink-200/70 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#4A1525] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-pink-500" /> Guia de Prep de Domingo
          </h3>
          <p className="text-[11px] text-stone-500 mt-0.5">
            {completedCount} de {sundayPrepTasks.length} tarefas de pré-cozimento feitas
          </p>
        </div>
        <div className="text-xs font-bold font-mono text-[#4A1525] bg-pink-100 px-2 py-1 rounded-full">
          {Math.round((completedCount / (sundayPrepTasks.length || 1)) * 100)}%
        </div>
      </div>

      <div className="space-y-2 pt-1">
        {sundayPrepTasks.map((t) => (
          <button
            key={t.id}
            onClick={() => togglePrepTask(t.id)}
            className={cn(
              'w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all min-h-[44px]',
              t.completed
                ? 'bg-pink-100/60 border-pink-300 text-pink-800'
                : 'bg-white border-pink-100 text-stone-700 hover:border-pink-200'
            )}
          >
            <span
              className={cn(
                'text-xs font-medium pr-2',
                t.completed && 'line-through text-stone-400'
              )}
            >
              {t.task}
            </span>
            <div
              className={cn(
                'w-5 h-5 rounded-full border shrink-0 flex items-center justify-center transition-colors',
                t.completed
                  ? 'bg-[#4A1525] border-[#4A1525] text-white'
                  : 'border-pink-200 bg-white'
              )}
            >
              {t.completed && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
