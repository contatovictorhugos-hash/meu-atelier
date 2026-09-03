'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useLegalStore } from '@/stores/useLegalStore';
import type { StudyCourse } from '@/types/database.types';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseToEdit?: StudyCourse | null;
}

const COLOR_OPTIONS = [
  { label: 'Blush', hex: '#FCE7EC' },
  { label: 'Lavanda', hex: '#EDE9FE' },
  { label: 'Manteiga', hex: '#FEF9C3' },
  { label: 'Menta', hex: '#DCFCE7' },
  { label: 'Céu', hex: '#E0F2FE' },
  { label: 'Pêssego', hex: '#FFEDD5' },
];

const WEEKDAYS = [
  { num: 1, label: 'Segunda', short: 'Seg' },
  { num: 2, label: 'Terça', short: 'Ter' },
  { num: 3, label: 'Quarta', short: 'Qua' },
  { num: 4, label: 'Quinta', short: 'Qui' },
  { num: 5, label: 'Sexta', short: 'Sex' },
  { num: 6, label: 'Sábado', short: 'Sáb' },
];

export const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  courseToEdit,
}) => {
  const { addCourse, updateCourse } = useLegalStore();

  const [name, setName] = useState('');
  const [professor, setProfessor] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState<number | undefined>(1);
  const [colorAccent, setColorAccent] = useState('#FCE7EC');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (courseToEdit) {
      setName(courseToEdit.name);
      setProfessor(courseToEdit.professor || '');
      setDayOfWeek(courseToEdit.day_of_week ?? 1);
      setColorAccent(courseToEdit.color_accent || '#FCE7EC');
      setProgress(courseToEdit.progress_percentage || 0);
    } else {
      setName('');
      setProfessor('');
      setDayOfWeek(1);
      setColorAccent('#FCE7EC');
      setProgress(0);
    }
    setError('');
  }, [courseToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Por favor, informe o nome da matéria.');
      return;
    }

    if (courseToEdit) {
      updateCourse(courseToEdit.id, {
        name: name.trim(),
        professor: professor.trim() || undefined,
        day_of_week: dayOfWeek,
        color_accent: colorAccent,
        progress_percentage: progress,
      });
    } else {
      addCourse({
        name: name.trim(),
        professor: professor.trim() || undefined,
        day_of_week: dayOfWeek,
        color_accent: colorAccent,
        progress_percentage: progress,
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={courseToEdit ? 'Editar Matéria 📚' : 'Nova Matéria Jurídica 🏛️'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
          </div>
        )}

        {/* Nome da Matéria */}
        <div>
          <label className="block text-xs font-semibold text-[#4A1525] mb-1">
            Nome da Disciplina *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Direito Processual Civil II"
            className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#4A1525]/20 bg-white"
          />
        </div>

        {/* Professor(a) */}
        <div>
          <label className="block text-xs font-semibold text-[#4A1525] mb-1">
            Professor(a)
          </label>
          <input
            type="text"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            placeholder="Ex: Prof. Dra. Mariana Souza"
            className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#4A1525]/20 bg-white"
          />
        </div>

        {/* Dia da Semana */}
        <div>
          <label className="block text-xs font-semibold text-[#4A1525] mb-1.5">
            Dia da Semana da Aula
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {WEEKDAYS.map((w) => {
              const isSelected = dayOfWeek === w.num;
              return (
                <button
                  key={w.num}
                  type="button"
                  onClick={() => setDayOfWeek(w.num)}
                  className={`py-2 px-1 rounded-xl text-[11px] font-semibold transition-all min-h-[44px] flex items-center justify-center border ${
                    isSelected
                      ? 'bg-[#4A1525] text-white border-[#4A1525] shadow-xs'
                      : 'bg-white text-stone-600 border-pink-100 hover:border-pink-300'
                  }`}
                >
                  {w.short}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cor de Destaque */}
        <div>
          <label className="block text-xs font-semibold text-[#4A1525] mb-1.5">
            Cor Temática do Card
          </label>
          <div className="flex items-center gap-2.5">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => setColorAccent(c.hex)}
                style={{ backgroundColor: c.hex }}
                className={`w-8 h-8 rounded-full border-2 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  colorAccent === c.hex
                    ? 'border-[#4A1525] scale-110 shadow-sm'
                    : 'border-white/80 hover:scale-105'
                }`}
                title={c.label}
                aria-label={`Cor ${c.label}`}
              >
                {colorAccent === c.hex && (
                  <span className="w-2 h-2 rounded-full bg-[#4A1525]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Progresso de Leituras */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-[#4A1525] mb-1">
            <span>Progresso de Leituras</span>
            <span className="font-mono">{progress}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full accent-[#4A1525] cursor-pointer min-h-[36px]"
          />
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-pink-100">
          <Button type="button" variant="ghost" onClick={onClose} size="sm">
            Cancelar
          </Button>
          <Button type="submit" variant="primary" size="sm">
            {courseToEdit ? 'Salvar Alterações' : 'Cadastrar Matéria'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
