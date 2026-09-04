import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  StudyCourse,
  StudyNote,
  StudyDeadline,
  DeadlineStatus,
} from '../types/database.types.ts';
import {
  fetchUserCourses,
  insertUserCourse,
  updateUserCourse,
  deleteUserCourse,
  fetchUserNotes,
  insertUserNote,
  updateUserNote,
  deleteUserNote,
  fetchUserDeadlines,
  insertUserDeadline,
  updateUserDeadlineStatus,
  updateUserDeadline,
  deleteUserDeadline,
} from '../lib/supabase/sync.ts';

interface LegalState {
  courses: StudyCourse[];
  notes: StudyNote[];
  deadlines: StudyDeadline[];
  activeCourseId: string | 'all';
  isLoading: boolean;

  fetchLegal: () => Promise<void>;
  setActiveCourseId: (id: string | 'all') => void;
  addCourse: (course: Omit<StudyCourse, 'id'>) => void;
  updateCourse: (id: string, updates: Partial<Omit<StudyCourse, 'id'>>) => void;
  deleteCourse: (id: string) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  addStudyNote: (note: Omit<StudyNote, 'id' | 'created_at'>) => void;
  updateStudyNote: (id: string, updates: Partial<Omit<StudyNote, 'id' | 'created_at'>>) => void;
  deleteStudyNote: (id: string) => void;
  addDeadline: (deadline: Omit<StudyDeadline, 'id'>) => void;
  updateDeadline: (id: string, updates: Partial<Omit<StudyDeadline, 'id'>>) => void;
  updateDeadlineStatus: (id: string, status: DeadlineStatus) => void;
  deleteDeadline: (id: string) => void;
}

const defaultCourses: StudyCourse[] = [
  {
    id: 'c1',
    name: 'Direito Constitucional',
    professor: 'Dra. Helena Mendes',
    day_of_week: 1, // Segunda
    color_accent: '#FCE7EC', // Blush
    progress_percentage: 65,
  },
  {
    id: 'c2',
    name: 'Direito Civil III (Contratos)',
    professor: 'Dr. Lucas Silveira',
    day_of_week: 2, // Terça
    color_accent: '#EDE9FE', // Lavender
    progress_percentage: 40,
  },
  {
    id: 'c3',
    name: 'Direito Penal (Teoria do Crime)',
    professor: 'Dra. Beatriz Prado',
    day_of_week: 3, // Quarta
    color_accent: '#FEF9C3', // Butter Yellow
    progress_percentage: 80,
  },
  {
    id: 'c4',
    name: 'Direito do Trabalho',
    professor: 'Dr. Fernando Rocha',
    day_of_week: 5, // Sexta
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
      isLoading: false,

      fetchLegal: async () => {
        set({ isLoading: true });
        try {
          const [cloudCourses, cloudNotes, cloudDeadlines] = await Promise.all([
            fetchUserCourses(),
            fetchUserNotes(),
            fetchUserDeadlines(),
          ]);

          if (cloudCourses !== null) {
            set({ courses: cloudCourses });
          }
          if (cloudNotes !== null) {
            set({ notes: cloudNotes });
          }
          if (cloudDeadlines !== null) {
            set({ deadlines: cloudDeadlines });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      setActiveCourseId: (id) => set({ activeCourseId: id }),

      addCourse: (course) => {
        const tempId = `c_${Date.now()}`;
        set((state) => ({
          courses: [
            ...state.courses,
            {
              ...course,
              id: tempId,
              progress_percentage: course.progress_percentage ?? 0,
            },
          ],
        }));

        insertUserCourse(course).then((realId) => {
          if (realId) {
            set((state) => ({
              courses: state.courses.map((c) =>
                c.id === tempId ? { ...c, id: realId } : c
              ),
            }));
          }
        }).catch(() => {});
      },

      updateCourse: (id, updates) => {
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
        updateUserCourse(id, updates).catch(() => {});
      },

      deleteCourse: (id) => {
        set((state) => ({
          courses: state.courses.filter((c) => c.id !== id),
          activeCourseId: state.activeCourseId === id ? 'all' : state.activeCourseId,
        }));
        deleteUserCourse(id).catch(() => {});
      },

      updateCourseProgress: (courseId, progress) => {
        const boundedProgress = Math.min(Math.max(progress, 0), 100);
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === courseId ? { ...c, progress_percentage: boundedProgress } : c
          ),
        }));
        updateUserCourse(courseId, { progress_percentage: boundedProgress }).catch(() => {});
      },

      addStudyNote: (note) => {
        const tempId = `n_${Date.now()}`;
        const createdAt = new Date().toISOString().split('T')[0];
        set((state) => ({
          notes: [
            {
              ...note,
              id: tempId,
              created_at: createdAt,
            },
            ...state.notes,
          ],
        }));

        insertUserNote(note).then((realId) => {
          if (realId) {
            set((state) => ({
              notes: state.notes.map((n) =>
                n.id === tempId ? { ...n, id: realId } : n
              ),
            }));
          }
        }).catch(() => {});
      },

      updateStudyNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...updates } : n
          ),
        }));
        updateUserNote(id, updates).catch(() => {});
      },

      deleteStudyNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        }));
        deleteUserNote(id).catch(() => {});
      },

      addDeadline: (deadline) => {
        const tempId = `d_${Date.now()}`;
        set((state) => ({
          deadlines: [
            ...state.deadlines,
            { ...deadline, id: tempId },
          ],
        }));

        insertUserDeadline(deadline).then((realId) => {
          if (realId) {
            set((state) => ({
              deadlines: state.deadlines.map((d) =>
                d.id === tempId ? { ...d, id: realId } : d
              ),
            }));
          }
        }).catch(() => {});
      },

      updateDeadline: (id, updates) => {
        set((state) => ({
          deadlines: state.deadlines.map((d) =>
            d.id === id ? { ...d, ...updates } : d
          ),
        }));
        updateUserDeadline(id, updates).catch(() => {});
      },

      updateDeadlineStatus: (id, status) => {
        set((state) => ({
          deadlines: state.deadlines.map((d) =>
            d.id === id ? { ...d, status } : d
          ),
        }));
        updateUserDeadlineStatus(id, status).catch(() => {});
      },

      deleteDeadline: (id) => {
        set((state) => ({
          deadlines: state.deadlines.filter((d) => d.id !== id),
        }));
        deleteUserDeadline(id).catch(() => {});
      },
    }),
    {
      name: 'atelier-legal-storage',
    }
  )
);
