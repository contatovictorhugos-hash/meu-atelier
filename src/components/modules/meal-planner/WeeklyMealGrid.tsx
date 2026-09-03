'use client';

import React, { useState, useMemo } from 'react';
import { useMealStore } from '@/stores/useMealStore';
import { Badge } from '@/components/ui/Badge';
import { Plus, Pencil, Sparkles } from 'lucide-react';
import { MealModal } from './MealModal';
import type { MealPlanItem } from '@/types/database.types';

const DAYS = [
  { num: 1, name: 'Segunda-feira', short: 'Seg' },
  { num: 2, name: 'Terça-feira', short: 'Ter' },
  { num: 3, name: 'Quarta-feira', short: 'Qua' },
  { num: 4, name: 'Quinta-feira', short: 'Qui' },
  { num: 5, name: 'Sexta-feira', short: 'Sex' },
  { num: 6, name: 'Sábado', short: 'Sáb' },
  { num: 7, name: 'Domingo', short: 'Dom' },
];

export const WeeklyMealGrid: React.FC = () => {
  const { weeklyMeals } = useMealStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealPlanItem | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const currentDayNum = useMemo(() => {
    const jsDay = new Date().getDay();
    return jsDay === 0 ? 7 : jsDay;
  }, []);

  const handleOpenAdd = (dayNum?: number) => {
    setSelectedMeal(null);
    setSelectedDay(dayNum || currentDayNum);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (meal: MealPlanItem) => {
    setSelectedMeal(meal);
    setSelectedDay(meal.day_of_week);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Header com Ação */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#4A1525] flex items-center gap-1.5">
            Cardápio Semanal Completo 🥗
          </h3>
          <p className="text-[11px] text-stone-500 mt-0.5">
            Segunda a Domingo com fotos e receitas
          </p>
        </div>
        <button
          onClick={() => handleOpenAdd()}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#4A1525] text-white hover:bg-[#38101C] transition-all min-h-[44px] shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Adicionar Refeição
        </button>
      </div>

      {/* Grid de 7 Dias */}
      <div className="space-y-3">
        {DAYS.map((day) => {
          const meal = weeklyMeals.find((m) => m.day_of_week === day.num);
          const isToday = currentDayNum === day.num;

          return (
            <div
              key={day.num}
              className={`bg-[#FCFBF7] rounded-3xl p-3.5 border transition-all ${
                isToday
                  ? 'border-pink-400 ring-2 ring-pink-300/40 shadow-sm bg-linear-to-r from-[#FCFBF7] to-pink-50/40'
                  : 'border-pink-200/60 shadow-xs hover:border-pink-300'
              }`}
            >
              {meal ? (
                <div className="flex items-center gap-3.5">
                  {/* Foto da Marmita */}
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-pink-100 relative group">
                    {meal.photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={meal.photo_url}
                        alt={meal.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-300 text-xl">
                        🍱
                      </div>
                    )}
                  </div>

                  {/* Informações da Refeição */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-pink-600 uppercase tracking-wide">
                          {day.name}
                        </span>
                        {isToday && (
                          <span className="text-[9px] font-bold text-pink-700 bg-pink-100 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> Hoje
                          </span>
                        )}
                      </div>
                      <Badge variant="blush">{meal.meal_type || 'Almoço'}</Badge>
                    </div>

                    <h4 className="text-xs font-semibold text-[#4A1525] truncate">
                      {meal.title}
                    </h4>

                    {meal.ingredients && meal.ingredients.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {meal.ingredients.slice(0, 3).map((ing, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] text-stone-500 bg-white px-2 py-0.5 rounded-md border border-stone-200/60"
                          >
                            {ing}
                          </span>
                        ))}
                        {meal.ingredients.length > 3 && (
                          <span className="text-[9px] text-stone-400 self-center">
                            +{meal.ingredients.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Botão de Edição */}
                  <button
                    onClick={() => handleOpenEdit(meal)}
                    className="p-2 text-stone-400 hover:text-[#4A1525] hover:bg-pink-100/50 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
                    aria-label={`Editar refeição de ${day.name}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between py-1 px-1">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-stone-500">
                        {day.name}
                      </span>
                      {isToday && (
                        <span className="text-[9px] font-bold text-pink-700 bg-pink-100 px-1.5 py-0.5 rounded-full">
                          Hoje ✨
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      Nenhuma refeição planejada
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenAdd(day.num)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200/60 transition-colors min-h-[44px]"
                  >
                    <Plus className="w-3 h-3" /> Planejar
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal de Gestão da Refeição */}
      <MealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mealToEdit={selectedMeal}
        defaultDayOfWeek={selectedDay}
      />
    </div>
  );
};

