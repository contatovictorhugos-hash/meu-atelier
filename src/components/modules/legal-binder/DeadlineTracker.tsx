'use client';

import React, { useState } from 'react';
import { useLegalStore } from '@/stores/useLegalStore';
import { DeadlineStatus } from '@/types/database.types';
import { Plus, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/utils';

export const DeadlineTracker: React.FC = () => {
  const { deadlines, courses, addDeadline, updateDeadlineStatus } = useLegalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const statuses: DeadlineStatus[] = ['Não iniciado', 'Em rascunho', 'Finalizado'];

  const handleAdd = () => {
    if (!title.trim() || !dueDate) return;

    addDeadline({
      course_id: courseId,
      title: title.trim(),
      due_date: dueDate,
      status: 'Não iniciado',
    });

    setTitle('');
    setDueDate('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#4A1525] flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-pink-500" /> Prazos & Casos Práticos
        </h3>
        <Button
          onClick={() => setIsModalOpen(true)}
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Novo Prazo
        </Button>
      </div>

      <div className="space-y-2">
        {deadlines.map((d) => {
          const course = courses.find((c) => c.id === d.course_id);

          return (
            <div
              key={d.id}
              className="p-3 bg-[#FCFBF7] rounded-2xl border border-pink-200/60 shadow-sm flex items-center justify-between gap-2"
            >
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

              <select
                value={d.status}
                onChange={(e) =>
                  updateDeadlineStatus(d.id, e.target.value as DeadlineStatus)
                }
                className="text-[11px] font-semibold bg-white border border-pink-200 rounded-xl px-2 py-1 text-stone-700 min-h-[36px]"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Prazo / Tarefa 📅"
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Disciplina
            </label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full h-11 px-3 bg-white rounded-2xl border border-pink-200 text-xs text-stone-700 min-h-[44px]"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Título do Prazo / Peça
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Entrega de Apelação Cível"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Data de Entrega
            </label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <Button onClick={handleAdd} className="w-full">
            Salvar Prazo
          </Button>
        </div>
      </Modal>
    </div>
  );
};
