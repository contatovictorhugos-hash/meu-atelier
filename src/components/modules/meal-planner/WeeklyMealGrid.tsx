'use client';

import React from 'react';
import { useMealStore } from '@/stores/useMealStore';
import { Badge } from '@/components/ui/Badge';

export const WeeklyMealGrid: React.FC = () => {
  const { weeklyMeals } = useMealStore();

  const days = [
    { num: 1, name: 'Segunda-feira' },
    { num: 2, name: 'Terça-feira' },
    { num: 3, name: 'Quarta-feira' },
    { num: 4, name: 'Quinta-feira' },
    { num: 5, name: 'Sexta-feira' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#4A1525]">
          Cardápio da Semana de Trabalho 🥗
        </h3>
        <span className="text-[11px] text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full font-medium">
          Seg a Sex
        </span>
      </div>

      <div className="space-y-3">
        {days.map((day) => {
          const meal = weeklyMeals.find((m) => m.day_of_week === day.num);

          return (
            <div
              key={day.num}
              className="bg-[#FCFBF7] rounded-3xl p-3.5 border border-pink-200/60 shadow-sm flex items-center gap-3.5"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-pink-100">
                {meal?.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={meal.photo_url}
                    alt={meal.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300">
                    🍱
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-pink-600 uppercase tracking-wide">
                    {day.name}
                  </span>
                  <Badge variant="blush">{meal?.meal_type || 'Almoço'}</Badge>
                </div>
                <h4 className="text-xs font-semibold text-[#4A1525] truncate">
                  {meal?.title || 'Sem refeição cadastrada'}
                </h4>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {meal?.ingredients.slice(0, 3).map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] text-stone-500 bg-white px-2 py-0.5 rounded-md border border-stone-200/60"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
