'use client';

import React from 'react';
import { useLegalStore } from '@/stores/useLegalStore';
import { BookOpen } from 'lucide-react';

export const CourseCards: React.FC = () => {
  const { courses, updateCourseProgress } = useLegalStore();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-[#4A1525] flex items-center gap-1.5">
        <BookOpen className="w-4 h-4 text-pink-500" /> Matérias do Semestre
      </h3>

      <div className="grid grid-cols-1 gap-2.5">
        {courses.map((course) => (
          <div
            key={course.id}
            style={{ backgroundColor: course.color_accent }}
            className="p-4 rounded-3xl border border-stone-200/60 shadow-sm transition-transform hover:scale-101"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#1E1B1E]">
                  {course.name}
                </h4>
                {course.professor && (
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    {course.professor}
                  </p>
                )}
              </div>
              <span className="text-xs font-mono font-bold text-[#4A1525] bg-white/70 px-2 py-0.5 rounded-full">
                {course.progress_percentage}%
              </span>
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
                className="w-full accent-[#4A1525] cursor-pointer min-h-[32px]"
                aria-label={`Progresso em ${course.name}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
