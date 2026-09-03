import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MealPlanItem, ShoppingItem, GroceryCategory } from '../types/database.types.ts';
import {
  fetchUserMeals,
  saveUserMeal,
  deleteUserMeal,
  fetchUserPrepTasks,
  insertUserPrepTask,
  toggleUserPrepTask,
  deleteUserPrepTask,
  fetchUserShoppingItems,
  insertUserShoppingItem,
  toggleUserShoppingItem,
  deleteUserShoppingItem,
  clearCompletedUserShoppingItems,
} from '../lib/supabase/sync.ts';

export interface PrepTask {
  id: string;
  task: string;
  completed: boolean;
}

interface MealState {
  weeklyMeals: MealPlanItem[];
  sundayPrepTasks: PrepTask[];
  shoppingItems: ShoppingItem[];
  isLoading: boolean;

  fetchMeals: () => Promise<void>;
  saveMeal: (meal: Omit<MealPlanItem, 'id'> & { id?: string }) => void;
  deleteMeal: (id: string) => void;
  togglePrepTask: (id: string) => void;
  addPrepTask: (task: string) => void;
  deletePrepTask: (id: string) => void;
  toggleShoppingItem: (id: string) => void;
  addShoppingItem: (name: string, category: GroceryCategory) => void;
  deleteShoppingItem: (id: string) => void;
  clearCompletedShoppingItems: () => void;
}

const defaultWeeklyMeals: MealPlanItem[] = [
  {
    id: 'm1',
    day_of_week: 1, // Segunda
    meal_type: 'Almoço',
    title: 'Bowl de Frango Grelhado com Legumes e Quinoa',
    photo_url:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop',
    ingredients: ['Peito de frango', 'Abobrinha', 'Quinoa', 'Cenoura'],
  },
  {
    id: 'm2',
    day_of_week: 2, // Terça
    meal_type: 'Almoço',
    title: 'Salmão Grelhado com Aspargos e Purê de Mandioquinha',
    photo_url:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400&auto=format&fit=crop',
    ingredients: ['Salmão', 'Aspargos', 'Mandioquinha'],
  },
  {
    id: 'm3',
    day_of_week: 3, // Quarta
    meal_type: 'Almoço',
    title: 'Marmita Bento: Arroz Integral, Tofu e Brócolis',
    photo_url:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop',
    ingredients: ['Tofu', 'Brócolis', 'Arroz integral'],
  },
  {
    id: 'm4',
    day_of_week: 4, // Quinta
    meal_type: 'Almoço',
    title: 'Strogonoff Light com Arroz de Couve-Flor',
    photo_url:
      'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=400&auto=format&fit=crop',
    ingredients: ['Carne em tiras', 'Couve-flor', 'Champignon'],
  },
  {
    id: 'm5',
    day_of_week: 5, // Sexta
    meal_type: 'Almoço',
    title: 'Wrap Crocante de Atum com Folhas Verdes',
    photo_url:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=400&auto=format&fit=crop',
    ingredients: ['Atum', 'Pão folha', 'Rúcula', 'Tomatinho cereja'],
  },
  {
    id: 'm6',
    day_of_week: 6, // Sábado
    meal_type: 'Almoço',
    title: 'Bowl Mediterrâneo com Falafel e Homus',
    photo_url:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop',
    ingredients: ['Falafel', 'Homus', 'Pepino', 'Tomate'],
  },
  {
    id: 'm7',
    day_of_week: 7, // Domingo
    meal_type: 'Almoço',
    title: 'Nhoque Artesanal ao Molho Sugo e Manjericão',
    photo_url:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=400&auto=format&fit=crop',
    ingredients: ['Nhoque', 'Molho de tomate caseiro', 'Parmesão', 'Manjericão'],
  },
];

const defaultPrepTasks: PrepTask[] = [
  { id: 'p1', task: 'Assar legumes no forno (cenoura, abobrinha, batata-doce)', completed: false },
  { id: 'p2', task: 'Grelhar e porcionar 5 porções de peito de frango', completed: false },
  { id: 'p3', task: 'Cozinhar arroz integral e quinoa da semana', completed: false },
  { id: 'p4', task: 'Lavar, secar e guardar folhas verdes em potes herméticos', completed: false },
  { id: 'p5', task: 'Picar frutas e porcionar lanches da tarde', completed: false },
];

const defaultShoppingItems: ShoppingItem[] = [
  { id: 's1', item_name: 'Peito de Frango (1kg)', category: 'Geladeira', is_completed: false },
  { id: 's2', item_name: 'Quinoa Real e Arroz Integral', category: 'Despensa', is_completed: false },
  { id: 's3', item_name: 'Abobrinha e Cenoura Orgânica', category: 'Hortifrúti', is_completed: true },
  { id: 's4', item_name: 'Filé de Salmão Fresco', category: 'Geladeira', is_completed: false },
  { id: 's5', item_name: 'Folhas de Rúcula e Espinafre', category: 'Hortifrúti', is_completed: true },
  { id: 's6', item_name: 'Azeite de Oliva Extra Virgem', category: 'Despensa', is_completed: false },
];

export const useMealStore = create<MealState>()(
  persist(
    (set) => ({
      weeklyMeals: defaultWeeklyMeals,
      sundayPrepTasks: defaultPrepTasks,
      shoppingItems: defaultShoppingItems,
      isLoading: false,

      fetchMeals: async () => {
        set({ isLoading: true });
        try {
          const [cloudMeals, cloudPrep, cloudShopping] = await Promise.all([
            fetchUserMeals(),
            fetchUserPrepTasks(),
            fetchUserShoppingItems(),
          ]);

          if (cloudMeals !== null) {
            set({ weeklyMeals: cloudMeals });
          }
          if (cloudPrep !== null) {
            set({ sundayPrepTasks: cloudPrep });
          }
          if (cloudShopping !== null) {
            set({ shoppingItems: cloudShopping });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      saveMeal: (mealData) => {
        const tempId = mealData.id || `m_${Date.now()}`;
        set((state) => {
          const existingIdx = state.weeklyMeals.findIndex(
            (m) =>
              (mealData.id && m.id === mealData.id) ||
              (m.day_of_week === mealData.day_of_week && m.meal_type === mealData.meal_type)
          );
          if (existingIdx >= 0) {
            const updated = [...state.weeklyMeals];
            updated[existingIdx] = {
              ...updated[existingIdx],
              ...mealData,
              id: updated[existingIdx].id,
            };
            return { weeklyMeals: updated };
          }
          return {
            weeklyMeals: [
              ...state.weeklyMeals,
              {
                ...mealData,
                id: tempId,
              },
            ],
          };
        });

        saveUserMeal({ ...mealData, id: tempId }).then((realId) => {
          if (realId) {
            set((state) => ({
              weeklyMeals: state.weeklyMeals.map((m) =>
                m.id === tempId ? { ...m, id: realId } : m
              ),
            }));
          }
        }).catch(() => {});
      },

      deleteMeal: (id) => {
        set((state) => ({
          weeklyMeals: state.weeklyMeals.filter((m) => m.id !== id),
        }));
        deleteUserMeal(id).catch(() => {});
      },

      togglePrepTask: (id) => {
        set((state) => {
          let updatedCompleted = false;
          const nextTasks = state.sundayPrepTasks.map((t) => {
            if (t.id === id) {
              updatedCompleted = !t.completed;
              return { ...t, completed: updatedCompleted };
            }
            return t;
          });
          toggleUserPrepTask(id, updatedCompleted).catch(() => {});
          return { sundayPrepTasks: nextTasks };
        });
      },

      addPrepTask: (task) => {
        const tempId = `pt_${Date.now()}`;
        set((state) => ({
          sundayPrepTasks: [
            ...state.sundayPrepTasks,
            { id: tempId, task: task.trim(), completed: false },
          ],
        }));
        insertUserPrepTask(task.trim()).then((realId) => {
          if (realId) {
            set((state) => ({
              sundayPrepTasks: state.sundayPrepTasks.map((t) =>
                t.id === tempId ? { ...t, id: realId } : t
              ),
            }));
          }
        }).catch(() => {});
      },

      deletePrepTask: (id) => {
        set((state) => ({
          sundayPrepTasks: state.sundayPrepTasks.filter((t) => t.id !== id),
        }));
        deleteUserPrepTask(id).catch(() => {});
      },

      toggleShoppingItem: (id) => {
        set((state) => {
          let updatedCompleted = false;
          const nextItems = state.shoppingItems.map((item) => {
            if (item.id === id) {
              updatedCompleted = !item.is_completed;
              return { ...item, is_completed: updatedCompleted };
            }
            return item;
          });
          toggleUserShoppingItem(id, updatedCompleted).catch(() => {});
          return { shoppingItems: nextItems };
        });
      },

      addShoppingItem: (name, category) => {
        const tempId = `s_${Date.now()}`;
        set((state) => ({
          shoppingItems: [
            ...state.shoppingItems,
            { id: tempId, item_name: name, category, is_completed: false },
          ],
        }));
        insertUserShoppingItem(name, category).then((realId) => {
          if (realId) {
            set((state) => ({
              shoppingItems: state.shoppingItems.map((item) =>
                item.id === tempId ? { ...item, id: realId } : item
              ),
            }));
          }
        }).catch(() => {});
      },

      deleteShoppingItem: (id) => {
        set((state) => ({
          shoppingItems: state.shoppingItems.filter((item) => item.id !== id),
        }));
        deleteUserShoppingItem(id).catch(() => {});
      },

      clearCompletedShoppingItems: () => {
        set((state) => ({
          shoppingItems: state.shoppingItems.filter((item) => !item.is_completed),
        }));
        clearCompletedUserShoppingItems().catch(() => {});
      },
    }),
    {
      name: 'atelier-meal-storage',
    }
  )
);
