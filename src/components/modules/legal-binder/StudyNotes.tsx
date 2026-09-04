'use client';

import React, { useState } from 'react';
import { useLegalStore } from '@/stores/useLegalStore';
import { StudyNote } from '@/types/database.types';
import { PolaroidFrame } from '@/components/layout/PolaroidFrame';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { ImageUploadField } from '@/components/ui/ImageUploadField';
import { Plus, Sparkles, Trash2, Pencil } from 'lucide-react';
import { formatDate } from '@/lib/utils/utils';

export const StudyNotes: React.FC = () => {
  const { notes, courses, addStudyNote, updateStudyNote, deleteStudyNote } = useLegalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<StudyNote | null>(null);

  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [tagInput, setTagInput] = useState('');

  const handleOpenAdd = () => {
    setSelectedNote(null);
    setCourseId(courses[0]?.id || '');
    setTitle('');
    setSummary('');
    setPhotoUrl('');
    setTagInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (note: StudyNote) => {
    setSelectedNote(note);
    setCourseId(note.course_id);
    setTitle(note.title);
    setSummary(note.summary_text);
    setPhotoUrl(note.photo_url || '');
    setTagInput(note.tags.join(', '));
    setIsModalOpen(true);
  };

  const handleDelete = (note: StudyNote) => {
    if (window.confirm(`Deseja realmente excluir o fichamento "${note.title}"?`)) {
      deleteStudyNote(note.id);
    }
  };

  const handleSave = () => {
    if (!title.trim() || !summary.trim()) return;

    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const resolvedCourseId = courseId || courses[0]?.id || '';

    if (selectedNote) {
      updateStudyNote(selectedNote.id, {
        course_id: resolvedCourseId,
        title: title.trim(),
        summary_text: summary.trim(),
        photo_url: photoUrl.trim() || undefined,
        tags: tags.length > 0 ? tags : ['Fichamento'],
      });
    } else {
      addStudyNote({
        course_id: resolvedCourseId,
        title: title.trim(),
        summary_text: summary.trim(),
        photo_url: photoUrl.trim() || undefined,
        tags: tags.length > 0 ? tags : ['Fichamento'],
      });
    }

    setTitle('');
    setSummary('');
    setPhotoUrl('');
    setTagInput('');
    setSelectedNote(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#4A1525]">
          Micro-Fichamentos & Resumos 📑
        </h3>
        <Button
          onClick={handleOpenAdd}
          size="sm"
          className="flex items-center gap-1 min-h-[44px]"
        >
          <Plus className="w-3.5 h-3.5" /> Novo Fichamento
        </Button>
      </div>

      {notes.length === 0 && (
        <div className="p-8 text-center bg-[#FCFBF7] rounded-3xl border border-dashed border-pink-200 text-stone-500 text-xs">
          Nenhum fichamento registrado ainda. Toque em &ldquo;Novo Fichamento&rdquo; para catalogar suas anotações com fotos do Vade Mecum!
        </div>
      )}

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
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-stone-400 font-mono">
                    {formatDate(note.created_at)}
                  </span>
                  {/* Botão Editar Fichamento */}
                  <button
                    onClick={() => handleOpenEdit(note)}
                    className="p-2 text-stone-400 hover:text-[#4A1525] hover:bg-white/60 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={`Editar fichamento ${note.title}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  {/* Botão Excluir Fichamento */}
                  <button
                    onClick={() => handleDelete(note)}
                    className="p-2 text-stone-300 hover:text-red-500 hover:bg-white/60 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={`Excluir fichamento ${note.title}`}
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

      {/* Modal de Criação / Edição */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNote(null);
        }}
        title={selectedNote ? 'Editar Micro-Fichamento ✏️' : 'Novo Micro-Fichamento ⚖️'}
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
              aria-label="Selecionar disciplina"
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
              className="min-h-[44px]"
              aria-label="Conceito ou Artigo Central"
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
              aria-label="Resumo ou Síntese Rápida"
            />
          </div>

          <ImageUploadField
            label="Foto do Vade Mecum / Slide (Opcional)"
            value={photoUrl}
            onChange={setPhotoUrl}
            placeholderLink="https://exemplo.com/foto-pagina.jpg"
            description="Foto permanente no Supabase Storage"
            folder="study"
          />

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Tags (separadas por vírgula)
            </label>
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="STF, Súmula Vinculante, Art. 102"
              className="min-h-[44px]"
              aria-label="Tags do fichamento"
            />
          </div>

          <Button onClick={handleSave} className="w-full min-h-[44px]">
            <Sparkles className="w-4 h-4 mr-1.5" />
            {selectedNote ? 'Atualizar Fichamento' : 'Salvar Fichamento'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
