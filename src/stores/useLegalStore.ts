import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  StudyCourse,
  StudyNote,
  StudyDeadline,
  DeadlineStatus,
} from '../types/database.types.ts';

interface LegalState {
  courses: StudyCourse[];
  notes: StudyNote[];
  deadlines: StudyDeadline[];
  activeCourseId: string | 'all';

  setActiveCourseId: (id: string | 'all') => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  addStudyNote: (note: Omit<StudyNote, 'id' | 'created_at'>) => void;
  deleteStudyNote: (id: string) => void;
  addDeadline: (deadline: Omit<StudyDeadline, 'id'>) => void;
  updateDeadlineStatus: (id: string, status: DeadlineStatus) => void;
  deleteDeadline: (id: string) => void;
}

const defaultCourses: StudyCourse[] = [
  {
    id: 'c1',
    name: 'Direito Constitucional',
    professor: 'Dra. Helena Mendes',
    color_accent: '#FCE7EC', // Blush
    progress_percentage: 65,
  },
  {
    id: 'c2',
    name: 'Direito Civil III (Contratos)',
    professor: 'Dr. Lucas Silveira',
    color_accent: '#EDE9FE', // Lavender
    progress_percentage: 40,
  },
  {
    id: 'c3',
    name: 'Direito Penal (Teoria do Crime)',
    professor: 'Dra. Beatriz Prado',
    color_accent: '#FEF9C3', // Butter Yellow
    progress_percentage: 80,
  },
  {
    id: 'c4',
    name: 'Direito do Trabalho',
    professor: 'Dr. Fernando Rocha',
    color_accent: '#E2E8E2', // Sage Green
    progress_percentage: 30,
  },
];

const defaultNotes: StudyNote[] = [
  {
    id: 'n1',
    course_id: 'c1',
    title: 'Controle de Constitucionalidade Difuso',
    summary_text:
      'Qualquer juiz ou tribunal competente pode declarar a inconstitucionalidade no caso concreto (incidental). Efeitos inter partes, salvo modulação ou resolução do Senado (Art. 52, X).',
    photo_url:
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
    tags: ['Art. 102', 'STF', 'Súmula Vinculante'],
    created_at: '2026-09-01',
  },
  {
    id: 'n2',
    course_id: 'c2',
    title: 'Princípio da Boa-fé Objetiva (CC, Art. 422)',
    summary_text:
      'Os contratantes são obrigados a guardar na conclusão e na execução do contrato os princípios de probidade e boa-fé. Funções: interpretativa, integrativa e de controle.',
    photo_url:
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=600&auto=format&fit=crop',
    tags: ['Art. 422', 'Contratos', 'Vício Redibitório'],
    created_at: '2026-09-02',
  },
];

const defaultDeadlines: StudyDeadline[] = [
  {
    id: 'd1',
    course_id: 'c1',
    title: 'Entrega de Peça Prática: Recurso Ordinário',
    due_date: '2026-09-12',
    status: 'Em rascunho',
  },
  {
    id: 'd2',
    course_id: 'c3',
    title: 'Simulado OAB 1ª Fase (Direito Penal)',
    due_date: '2026-09-18',
    status: 'Não iniciado',
  },
  {
    id: 'd3',
    course_id: 'c2',
    title: 'Fichamento Artigos 421 a 480 CC',
    due_date: '2026-09-22',
    status: 'Finalizado',
  },
];

export const useLegalStore = create<LegalState>()(
  persist(
    (set) => ({
      courses: defaultCourses,
      notes: defaultNotes,
      deadlines: defaultDeadlines,
      activeCourseId: 'all',

      setActiveCourseId: (id) => set({ activeCourseId: id }),

      updateCourseProgress: (courseId, progress) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === courseId ? { ...c, progress_percentage: progress } : c
          ),
        })),

      addStudyNote: (note) =>
        set((state) => ({
          notes: [
            {
              ...note,
              id: `n_${Date.now()}`,
              created_at: new Date().toISOString().split('T')[0],
            },
            ...state.notes,
          ],
        })),

      deleteStudyNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),

      addDeadline: (deadline) =>
        set((state) => ({
          deadlines: [
            ...state.deadlines,
            { ...deadline, id: `d_${Date.now()}` },
          ],
        })),

      updateDeadlineStatus: (id, status) =>
        set((state) => ({
          deadlines: state.deadlines.map((d) =>
            d.id === id ? { ...d, status } : d
          ),
        })),

      deleteDeadline: (id) =>
        set((state) => ({
          deadlines: state.deadlines.filter((d) => d.id !== id),
        })),
    }),
    {
      name: 'atelier-legal-storage',
    }
  )
);
