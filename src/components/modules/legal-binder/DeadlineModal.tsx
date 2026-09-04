'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useLegalStore } from '@/stores/useLegalStore';
import type { StudyCourse, StudyDeadline, DeadlineStatus } from '@/types/database.types';
import { Sparkles } from 'lucide-react';

interface DeadlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  deadlineToEdit?: StudyDeadline | null;
  courses: StudyCourse[];
}

const STATUS_OPTIONS: DeadlineStatus[] = ['Não iniciado', 'Em rascunho', 'Finalizado'];

export const DeadlineModal: React.FC<DeadlineModalProps> = ({
  isOpen,
  onClose,
  deadlineToEdit,
  courses,
}) => {
  const { addDeadline, updateDeadline } = useLegalStore();

  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<DeadlineStatus>('Não iniciado');
  const [error, setError] = useState('');

  useEffect(() => {
    if (deadlineToEdit) {
      setCourseId(deadlineToEdit.course_id || courses[0]?.id || '');
      setTitle(deadlineToEdit.title || '');
      setDueDate(deadlineToEdit.due_date || '');
      setStatus(deadlineToEdit.status || 'Não iniciado');
    } else {
      setCourseId(courses[0]?.id || '');
      setTitle('');
      setDueDate('');
      setStatus('Não iniciado');
    }
    setError('');
  }, [deadlineToEdit, courses, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Por favor, informe o título do prazo ou tarefa.');
      return;
    }

    if (!dueDate) {
      setError('Por favor, selecione a data de entrega.');
      return;
    }

    const selectedCourseId = courseId || courses[0]?.id || '';

    if (deadlineToEdit) {
      updateDeadline(deadlineToEdit.id, {
        course_id: selectedCourseId,
        title: title.trim(),
        due_date: dueDate,
        status,
      });
    } else {
      addDeadline({
        course_id: selectedCourseId,
        title: title.trim(),
        due_date: dueDate,
        status,
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={deadlineToEdit ? 'Editar Prazo / Tarefa ✏️' : 'Novo Prazo / Tarefa 📅'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-600">
            {error}
          </div>
        )}

        {/* Disciplina */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
            Disciplina Associada
          </label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full h-11 px-3.5 bg-white rounded-2xl border border-pink-200 text-xs text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#4A1525]/20 min-h-[44px]"
            aria-label="Selecionar disciplina"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Título */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
            Título do Prazo / Peça
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Entrega de Apelação Cível"
            className="min-h-[44px]"
            aria-label="Título do prazo"
          />
        </div>

        {/* Data de Entrega */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
            Data Limite
          </label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="min-h-[44px]"
            aria-label="Data limite de entrega"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
            Status Operacional
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as DeadlineStatus)}
            className="w-full h-11 px-3.5 bg-white rounded-2xl border border-pink-200 text-xs text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#4A1525]/20 min-h-[44px]"
            aria-label="Status do prazo"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Botão de Ação */}
        <div className="pt-2">
          <Button type="submit" className="w-full min-h-[44px] flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            {deadlineToEdit ? 'Atualizar Prazo' : 'Salvar Prazo'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
