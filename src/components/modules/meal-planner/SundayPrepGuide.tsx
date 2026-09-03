'use client';

import React, { useState } from 'react';
import { useMealStore } from '@/stores/useMealStore';
import { Check, Sparkles, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils/utils';

export const SundayPrepGuide: React.FC = () => {
  const { sundayPrepTasks, togglePrepTask, addPrepTask, deletePrepTask } = useMealStore();
  const [newTaskText, setNewTaskText] = useState('');

  const completedCount = sundayPrepTasks.filter((t) => t.completed).length;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    addPrepTask(newTaskText.trim());
    setNewTaskText('');
  };

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
          {sundayPrepTasks.length === 0
            ? '0%'
            : `${Math.round((completedCount / sundayPrepTasks.length) * 100)}%`}
        </div>
      </div>

      {/* Input para Nova Tarefa */}
      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Adicionar tarefa de prep (ex: assar legumes)..."
          className="flex-1 px-3.5 py-2 text-xs rounded-2xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#4A1525]/20 bg-white min-h-[44px]"
        />
        <button
          type="submit"
          className="px-3.5 py-2 bg-[#4A1525] text-white rounded-2xl text-xs font-semibold hover:bg-[#38101C] transition-all min-h-[44px] flex items-center gap-1 shrink-0 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Adicionar
        </button>
      </form>

      {/* Lista de Tarefas */}
      <div className="space-y-2 pt-1">
        {sundayPrepTasks.length === 0 ? (
          <p className="text-xs text-stone-400 text-center py-4">
            Nenhuma tarefa cadastrada. Adicione sua primeira etapa acima!
          </p>
        ) : (
          sundayPrepTasks.map((t) => (
            <div
              key={t.id}
              className={cn(
                'w-full flex items-center justify-between p-2.5 rounded-2xl border text-left transition-all min-h-[44px]',
                t.completed
                  ? 'bg-pink-100/60 border-pink-300 text-pink-800'
                  : 'bg-white border-pink-100 text-stone-700 hover:border-pink-200'
              )}
            >
              <button
                type="button"
                onClick={() => togglePrepTask(t.id)}
                className="flex-1 flex items-center gap-2.5 text-left min-h-[36px]"
              >
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
                <span
                  className={cn(
                    'text-xs font-medium pr-2',
                    t.completed && 'line-through text-stone-400'
                  )}
                >
                  {t.task}
                </span>
              </button>

              <button
                type="button"
                onClick={() => deletePrepTask(t.id)}
                className="p-2 text-stone-400 hover:text-red-600 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`Excluir tarefa ${t.task}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
