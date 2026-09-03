'use client';

import React, { useState } from 'react';
import { useLegalStore } from '@/stores/useLegalStore';
import { BookOpen, Plus, Pencil, Trash2 } from 'lucide-react';
import { CourseModal } from './CourseModal';
import type { StudyCourse } from '@/types/database.types';

const WEEKDAY_NAMES: Record<number, string> = {
  1: 'Segundas-feiras',
  2: 'Terças-feiras',
  3: 'Quartas-feiras',
  4: 'Quintas-feiras',
  5: 'Sextas-feiras',
  6: 'Sábados',
};

export const CourseCards: React.FC = () => {
  const { courses, updateCourseProgress, deleteCourse } = useLegalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<StudyCourse | null>(null);

  const handleOpenAdd = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course: StudyCourse) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (course: StudyCourse) => {
    if (window.confirm(`Deseja excluir a matéria "${course.name}"?`)) {
      deleteCourse(course.id);
    }
  };

  return (
    <div className="space-y-3">
      {/* Header com Ação */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#4A1525] flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-pink-500" /> Matérias do Semestre
        </h3>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#4A1525] text-white hover:bg-[#38101C] transition-all min-h-[44px] shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Nova Matéria
        </button>
      </div>

      {/* Grid de Matérias */}
      {courses.length === 0 ? (
        <div className="p-8 text-center bg-[#FCFBF7] rounded-3xl border border-dashed border-pink-200 text-stone-500 text-xs">
          Nenhuma matéria cadastrada ainda. Toque no botão acima para adicionar suas disciplinas!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5">
          {courses.map((course) => (
            <div
              key={course.id}
              style={{ backgroundColor: course.color_accent }}
              className="p-4 rounded-3xl border border-stone-200/60 shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#1E1B1E] truncate">
                    {course.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {course.professor && (
                      <span className="text-[11px] text-stone-600 font-medium">
                        {course.professor}
                      </span>
                    )}
                    {course.day_of_week && (
                      <span className="text-[10px] font-semibold text-[#4A1525] bg-white/80 px-2 py-0.5 rounded-md border border-pink-200/50">
                        📅 {WEEKDAY_NAMES[course.day_of_week] || 'Dia a definir'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-xs font-mono font-bold text-[#4A1525] bg-white/80 px-2 py-1 rounded-full border border-pink-100">
                    {course.progress_percentage}%
                  </span>
                  <button
                    onClick={() => handleOpenEdit(course)}
                    className="p-2 text-stone-500 hover:text-[#4A1525] hover:bg-white/60 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={`Editar ${course.name}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(course)}
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-white/60 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={`Excluir ${course.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Reading progress slider */}
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-stone-600 font-medium mb-1">
                  <span>Progresso de Leituras</span>
                  <span>{course.progress_percentage}% lido</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={course.progress_percentage}
                  onChange={(e) =>
                    updateCourseProgress(course.id, Number(e.target.value))
                  }
                  className="w-full accent-[#4A1525] cursor-pointer min-h-[36px]"
                  aria-label={`Progresso em ${course.name}`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Gestão */}
      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseToEdit={selectedCourse}
      />
    </div>
  );
};

