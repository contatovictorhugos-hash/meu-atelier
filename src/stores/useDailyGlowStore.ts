import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchUserDailyGlow, saveUserDailyGlow } from '../lib/supabase/sync.ts';

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
  isLoading: boolean;

  incrementWater: () => void;
  decrementWater: () => void;
  toggleMorningHabit: (id: string) => void;
  toggleEveningHabit: (id: string) => void;
  setDailyPhotoUrl: (url: string) => void;
  setDailyQuote: (quote: string) => void;
  resetDailyIfNewDay: () => void;
  fetchDailyGlow: () => Promise<void>;
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

function persistToCloud(state: DailyGlowState) {
  saveUserDailyGlow({
    log_date: state.todayDate,
    water_cups: state.waterCups,
    morning_habits_completed: state.morningHabits
      .filter((h) => h.completed)
      .map((h) => h.id),
    evening_habits_completed: state.eveningHabits
      .filter((h) => h.completed)
      .map((h) => h.id),
    daily_photo_url: state.dailyPhotoUrl,
    daily_mood_quote: state.dailyQuote,
  }).catch(() => {
    // Ignore offline errors in background
  });
}

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
      isLoading: false,

      fetchDailyGlow: async () => {
        set({ isLoading: true });
        try {
          const today = get().todayDate;
          const cloudData = await fetchUserDailyGlow(today);
          if (cloudData) {
            set({
              waterCups: cloudData.water_cups,
              dailyPhotoUrl: cloudData.daily_photo_url || get().dailyPhotoUrl,
              dailyQuote: cloudData.daily_mood_quote || get().dailyQuote,
              morningHabits: get().morningHabits.map((h) => ({
                ...h,
                completed: cloudData.morning_habits_completed.includes(h.id),
              })),
              eveningHabits: get().eveningHabits.map((h) => ({
                ...h,
                completed: cloudData.evening_habits_completed.includes(h.id),
              })),
            });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      incrementWater: () => {
        set((state) => {
          const nextState = {
            ...state,
            waterCups: Math.min(state.waterCups + 1, state.waterGoal),
          };
          persistToCloud(nextState);
          return { waterCups: nextState.waterCups };
        });
      },

      decrementWater: () => {
        set((state) => {
          const nextState = {
            ...state,
            waterCups: Math.max(state.waterCups - 1, 0),
          };
          persistToCloud(nextState);
          return { waterCups: nextState.waterCups };
        });
      },

      toggleMorningHabit: (id) => {
        set((state) => {
          const nextHabits = state.morningHabits.map((h) =>
            h.id === id ? { ...h, completed: !h.completed } : h
          );
          const nextState = { ...state, morningHabits: nextHabits };
          persistToCloud(nextState);
          return { morningHabits: nextHabits };
        });
      },

      toggleEveningHabit: (id) => {
        set((state) => {
          const nextHabits = state.eveningHabits.map((h) =>
            h.id === id ? { ...h, completed: !h.completed } : h
          );
          const nextState = { ...state, eveningHabits: nextHabits };
          persistToCloud(nextState);
          return { eveningHabits: nextHabits };
        });
      },

      setDailyPhotoUrl: (url) => {
        set((state) => {
          const nextState = { ...state, dailyPhotoUrl: url };
          persistToCloud(nextState);
          return { dailyPhotoUrl: url };
        });
      },

      setDailyQuote: (quote) => {
        set((state) => {
          const nextState = { ...state, dailyQuote: quote };
          persistToCloud(nextState);
          return { dailyQuote: quote };
        });
      },

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
