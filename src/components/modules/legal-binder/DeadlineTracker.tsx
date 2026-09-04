'use client';

import React, { useState } from 'react';
import { useLegalStore } from '@/stores/useLegalStore';
import { StudyDeadline, DeadlineStatus } from '@/types/database.types';
import { Plus, Calendar, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/utils';
import { DeadlineModal } from './DeadlineModal';

export const DeadlineTracker: React.FC = () => {
  const { deadlines, courses, updateDeadlineStatus, deleteDeadline } = useLegalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeadline, setSelectedDeadline] = useState<StudyDeadline | null>(null);

  const statuses: DeadlineStatus[] = ['Não iniciado', 'Em rascunho', 'Finalizado'];

  const handleOpenAdd = () => {
    setSelectedDeadline(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (deadline: StudyDeadline) => {
    setSelectedDeadline(deadline);
    setIsModalOpen(true);
  };

  const handleDelete = (deadline: StudyDeadline) => {
    if (window.confirm(`Deseja realmente excluir o prazo "${deadline.title}"?`)) {
      deleteDeadline(deadline.id);
    }
  };

  return (
    <div className="space-y-3">
      {/* Header com Ação */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#4A1525] flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-pink-500" /> Prazos & Casos Práticos
        </h3>
        <Button
          onClick={handleOpenAdd}
          size="sm"
          className="flex items-center gap-1 min-h-[44px]"
        >
          <Plus className="w-3.5 h-3.5" /> Novo Prazo
        </Button>
      </div>

      {/* Empty State */}
      {deadlines.length === 0 ? (
        <div className="p-8 text-center bg-[#FCFBF7] rounded-3xl border border-dashed border-pink-200 text-stone-500 text-xs space-y-1">
          <p className="font-semibold text-[#4A1525]">Nenhum prazo cadastrado ainda 📅</p>
          <p>
            Toque em &ldquo;Novo Prazo&rdquo; para registrar entregas de peças, recursos e simulados!
          </p>
        </div>
      ) : (
        /* Lista de Prazos */
        <div className="space-y-2">
          {deadlines.map((d) => {
            const course = courses.find((c) => c.id === d.course_id);

            return (
              <div
                key={d.id}
                className="p-3 bg-[#FCFBF7] rounded-2xl border border-pink-200/60 shadow-sm flex items-center justify-between gap-2"
              >
                {/* Informações do Prazo */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Badge variant="blush">{course?.name || 'Direito'}</Badge>
                    <span className="text-[10px] font-mono text-stone-500">
                      {formatDate(d.due_date)}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#1E1B1E] truncate">
                    {d.title}
                  </h4>
                </div>

                {/* Status e Ações */}
                <div className="flex items-center gap-1 shrink-0">
                  <select
                    value={d.status}
                    onChange={(e) =>
                      updateDeadlineStatus(d.id, e.target.value as DeadlineStatus)
                    }
                    className="text-[11px] font-semibold bg-white border border-pink-200 rounded-xl px-2 py-1 text-stone-700 min-h-[36px]"
                    aria-label={`Status do prazo ${d.title}`}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  {/* Botão Editar */}
                  <button
                    onClick={() => handleOpenEdit(d)}
                    className="p-2 text-stone-500 hover:text-[#4A1525] hover:bg-white/80 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={`Editar ${d.title}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>

                  {/* Botão Excluir */}
                  <button
                    onClick={() => handleDelete(d)}
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-white/80 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={`Excluir ${d.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Criação e Edição */}
      <DeadlineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        deadlineToEdit={selectedDeadline}
        courses={courses}
      />
    </div>
  );
};
