'use client';

import React, { useState, useEffect } from 'react';
import { CourseCards } from '@/components/modules/legal-binder/CourseCards';
import { StudyNotes } from '@/components/modules/legal-binder/StudyNotes';
import { DeadlineTracker } from '@/components/modules/legal-binder/DeadlineTracker';
import { FocusTimer } from '@/components/modules/legal-binder/FocusTimer';
import { useLegalStore } from '@/stores/useLegalStore';
import { Scale } from 'lucide-react';

export default function LegalPage() {
  const { fetchLegal } = useLegalStore();
  const [activeTab, setActiveTab] = useState<'courses' | 'notes' | 'deadlines' | 'pomodoro'>('courses');

  useEffect(() => {
    fetchLegal();
  }, [fetchLegal]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="pt-2">
        <span className="text-xs font-semibold text-pink-600/80 uppercase tracking-widest flex items-center gap-1">
          <Scale className="w-3.5 h-3.5" /> Caderno Jurídico & Estudos
        </span>
        <h1 className="text-2xl font-bold text-[#4A1525]">Direito & Foco</h1>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-pink-100/60 rounded-full border border-pink-200/50">
        <button
          onClick={() => setActiveTab('courses')}
          className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all min-h-[44px] ${
            activeTab === 'courses'
              ? 'bg-[#4A1525] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Matérias
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all min-h-[44px] ${
            activeTab === 'notes'
              ? 'bg-[#4A1525] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Fichamentos
        </button>
        <button
          onClick={() => setActiveTab('deadlines')}
          className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all min-h-[44px] ${
            activeTab === 'deadlines'
              ? 'bg-[#4A1525] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Prazos
        </button>
        <button
          onClick={() => setActiveTab('pomodoro')}
          className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all min-h-[44px] ${
            activeTab === 'pomodoro'
              ? 'bg-[#4A1525] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Focus
        </button>
      </div>

      {/* Content */}
      {activeTab === 'courses' && <CourseCards />}
      {activeTab === 'notes' && <StudyNotes />}
      {activeTab === 'deadlines' && <DeadlineTracker />}
      {activeTab === 'pomodoro' && <FocusTimer />}
    </div>
  );
}
