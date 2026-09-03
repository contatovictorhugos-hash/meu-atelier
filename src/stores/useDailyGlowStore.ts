import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HabitItem {
  id: string;
  label: string;
  icon: string;
  completed: boolean;
}

interface DailyGlowState {
  waterCups: number;
  waterGoal: number;
  morningHabits: HabitItem[];
  eveningHabits: HabitItem[];
  dailyPhotoUrl: string;
  dailyQuote: string;
  todayDate: string;

  incrementWater: () => void;
  decrementWater: () => void;
  toggleMorningHabit: (id: string) => void;
  toggleEveningHabit: (id: string) => void;
  setDailyPhotoUrl: (url: string) => void;
  setDailyQuote: (quote: string) => void;
  resetDailyIfNewDay: () => void;
}

const defaultMorningHabits: HabitItem[] = [
  { id: 'cleanser', label: 'Limpeza Facial', icon: '✨', completed: false },
  { id: 'vitc', label: 'Vitamina C', icon: '🍊', completed: false },
  { id: 'moisturizer', label: 'Hidratante', icon: '🌸', completed: false },
  { id: 'sunscreen', label: 'Protetor Solar', icon: '☀️', completed: false },
];

const defaultEveningHabits: HabitItem[] = [
  { id: 'double_cleanse', label: 'Demaquilar', icon: '🫧', completed: false },
  { id: 'night_serum', label: 'Sérum Noturno', icon: '🌙', completed: false },
  { id: 'lip_balm', label: 'Lip Balm', icon: '💋', completed: false },
  { id: 'reading', label: 'Leitura Leve', icon: '📖', completed: false },
];

export const useDailyGlowStore = create<DailyGlowState>()(
  persist(
    (set, get) => ({
      waterCups: 3,
      waterGoal: 8,
      morningHabits: defaultMorningHabits,
      eveningHabits: defaultEveningHabits,
      dailyPhotoUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
      dailyQuote: 'Cultive a sua própria luz; os dias mais bonitos começam em você. 🌸',
      todayDate: new Date().toISOString().split('T')[0],

      incrementWater: () =>
        set((state) => ({
          waterCups: Math.min(state.waterCups + 1, state.waterGoal),
        })),

      decrementWater: () =>
        set((state) => ({
          waterCups: Math.max(state.waterCups - 1, 0),
        })),

      toggleMorningHabit: (id) =>
        set((state) => ({
          morningHabits: state.morningHabits.map((h) =>
            h.id === id ? { ...h, completed: !h.completed } : h
          ),
        })),

      toggleEveningHabit: (id) =>
        set((state) => ({
          eveningHabits: state.eveningHabits.map((h) =>
            h.id === id ? { ...h, completed: !h.completed } : h
          ),
        })),

      setDailyPhotoUrl: (url) => set({ dailyPhotoUrl: url }),

      setDailyQuote: (quote) => set({ dailyQuote: quote }),

      resetDailyIfNewDay: () => {
        const today = new Date().toISOString().split('T')[0];
        if (get().todayDate !== today) {
          set({
            todayDate: today,
            waterCups: 0,
            morningHabits: defaultMorningHabits,
            eveningHabits: defaultEveningHabits,
          });
        }
      },
    }),
    {
      name: 'atelier-daily-glow-storage',
    }
  )
);
