import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MealPlanItem, ShoppingItem, GroceryCategory } from '../types/database.types.ts';

export interface PrepTask {
  id: string;
  task: string;
  completed: boolean;
}

interface MealState {
  weeklyMeals: MealPlanItem[];
  sundayPrepTasks: PrepTask[];
  shoppingItems: ShoppingItem[];

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

      saveMeal: (mealData) =>
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
                id: mealData.id || `m_${Date.now()}`,
              },
            ],
          };
        }),

      deleteMeal: (id) =>
        set((state) => ({
          weeklyMeals: state.weeklyMeals.filter((m) => m.id !== id),
        })),

      togglePrepTask: (id) =>
        set((state) => ({
          sundayPrepTasks: state.sundayPrepTasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),

      addPrepTask: (task) =>
        set((state) => ({
          sundayPrepTasks: [
            ...state.sundayPrepTasks,
            { id: `pt_${Date.now()}`, task: task.trim(), completed: false },
          ],
        })),

      deletePrepTask: (id) =>
        set((state) => ({
          sundayPrepTasks: state.sundayPrepTasks.filter((t) => t.id !== id),
        })),

      toggleShoppingItem: (id) =>
        set((state) => ({
          shoppingItems: state.shoppingItems.map((item) =>
            item.id === id ? { ...item, is_completed: !item.is_completed } : item
          ),
        })),

      addShoppingItem: (name, category) =>
        set((state) => ({
          shoppingItems: [
            ...state.shoppingItems,
            { id: `s_${Date.now()}`, item_name: name, category, is_completed: false },
          ],
        })),

      deleteShoppingItem: (id) =>
        set((state) => ({
          shoppingItems: state.shoppingItems.filter((item) => item.id !== id),
        })),

      clearCompletedShoppingItems: () =>
        set((state) => ({
          shoppingItems: state.shoppingItems.filter((item) => !item.is_completed),
        })),
    }),
    {
      name: 'atelier-meal-storage',
    }
  )
);
