'use client';

import React, { useState, useEffect } from 'react';
import { WeeklyMealGrid } from '@/components/modules/meal-planner/WeeklyMealGrid';
import { SundayPrepGuide } from '@/components/modules/meal-planner/SundayPrepGuide';
import { ShoppingList } from '@/components/modules/meal-planner/ShoppingList';
import { useMealStore } from '@/stores/useMealStore';
import { Sparkles } from 'lucide-react';

export default function BentoPage() {
  const { fetchMeals } = useMealStore();
  const [activeTab, setActiveTab] = useState<'meals' | 'prep' | 'shopping'>('meals');

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="pt-2">
        <span className="text-xs font-semibold text-pink-600/80 uppercase tracking-widest flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Bento & Marmitas
        </span>
        <h1 className="text-2xl font-bold text-[#4A1525]">Planejador de Refeições</h1>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-pink-100/60 rounded-full border border-pink-200/50">
        <button
          onClick={() => setActiveTab('meals')}
          className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all min-h-[44px] ${
            activeTab === 'meals'
              ? 'bg-[#4A1525] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Cardápio da Semana
        </button>
        <button
          onClick={() => setActiveTab('prep')}
          className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all min-h-[44px] ${
            activeTab === 'prep'
              ? 'bg-[#4A1525] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Prep de Domingo
        </button>
        <button
          onClick={() => setActiveTab('shopping')}
          className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all min-h-[44px] ${
            activeTab === 'shopping'
              ? 'bg-[#4A1525] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Lista de Feira
        </button>
      </div>

      {/* Content */}
      {activeTab === 'meals' && <WeeklyMealGrid />}
      {activeTab === 'prep' && <SundayPrepGuide />}
      {activeTab === 'shopping' && <ShoppingList />}
    </div>
  );
}
