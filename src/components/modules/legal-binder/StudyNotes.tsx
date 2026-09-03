'use client';

import React, { useState } from 'react';
import { useLegalStore } from '@/stores/useLegalStore';
import { PolaroidFrame } from '@/components/layout/PolaroidFrame';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { ImageUploadField } from '@/components/ui/ImageUploadField';
import { Plus, Sparkles, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils/utils';

export const StudyNotes: React.FC = () => {
  const { notes, courses, addStudyNote, deleteStudyNote } = useLegalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [tagInput, setTagInput] = useState('');

  const handleSave = () => {
    if (!title.trim() || !summary.trim()) return;

    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addStudyNote({
      course_id: courseId,
      title: title.trim(),
      summary_text: summary.trim(),
      photo_url: photoUrl.trim() || undefined,
      tags: tags.length > 0 ? tags : ['Fichamento'],
    });

    setTitle('');
    setSummary('');
    setPhotoUrl('');
    setTagInput('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#4A1525]">
          Micro-Fichamentos & Resumos 📑
        </h3>
        <Button
          onClick={() => setIsModalOpen(true)}
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Novo Fichamento
        </Button>
      </div>

      <div className="space-y-3">
        {notes.map((note) => {
          const course = courses.find((c) => c.id === note.course_id);

          return (
            <div
              key={note.id}
              className="bg-[#FCFBF7] rounded-3xl p-4 border border-pink-200/60 shadow-sm space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <Badge variant="bordeaux">
                  {course?.name || 'Direito'}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-stone-400 font-mono">
                    {formatDate(note.created_at)}
                  </span>
                  <button
                    onClick={() => deleteStudyNote(note.id)}
                    className="p-1 text-stone-300 hover:text-red-500 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                    aria-label="Excluir nota"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-bold text-[#4A1525]">{note.title}</h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                {note.summary_text}
              </p>

              {note.photo_url && (
                <div className="pt-1">
                  <PolaroidFrame
                    imageUrl={note.photo_url}
                    caption="Página Grifada / Slide"
                    rotate="rotate-0"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-1 pt-1">
                {note.tags.map((tag, idx) => (
                  <Badge key={idx} variant="blush">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Micro-Fichamento ⚖️"
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
              Conceito ou Artigo Central
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Controle Difuso de Constitucionalidade"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Resumo / Síntese Rápida
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Síntese da súmula, artigo ou tese..."
              rows={3}
              className="w-full p-3 bg-white rounded-2xl border border-pink-200 text-xs text-stone-700 focus:outline-none min-h-[80px]"
            />
          </div>

          <ImageUploadField
            label="Foto do Vade Mecum / Slide (Opcional)"
            value={photoUrl}
            onChange={setPhotoUrl}
            placeholderLink="https://exemplo.com/foto-pagina.jpg"
            description="Foto da página de lei ou anotação"
          />

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Tags (separadas por vírgula)
            </label>
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="STF, Súmula Vinculante, Art. 102"
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            <Sparkles className="w-4 h-4 mr-1.5" /> Salvar Fichamento
          </Button>
        </div>
      </Modal>
    </div>
  );
};
