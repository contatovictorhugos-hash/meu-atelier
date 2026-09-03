# UI Component & Module Contracts

## 1. `DailyGlow` Component Contract

```typescript
export interface DailyGlowProps {
  initialDate?: string; // ISO date string (YYYY-MM-DD)
  waterGoal?: number;   // Default: 8
}

export interface DailyGlowState {
  date: string;
  waterCount: number;
  morningHabits: {
    id: string;
    label: string;
    completed: boolean;
  }[];
  eveningHabits: {
    id: string;
    label: string;
    completed: boolean;
  }[];
  highlightPhotoUrl?: string;
  dailyQuote: string;
}

export interface DailyGlowActions {
  incrementWater: () => void;
  decrementWater: () => void;
  toggleMorningHabit: (habitId: string) => void;
  toggleEveningHabit: (habitId: string) => void;
  updateHighlightPhoto: (url: string) => Promise<void>;
}
```

---

## 2. `OotdStudio` Component Contract

```typescript
export type WardrobeCategory = 'top' | 'bottom' | 'shoes' | 'bag' | 'accessory';
export type OccasionTag = 'Trabalho' | 'Casual' | 'Noite' | 'Frio' | 'Calor';

export interface WardrobeItemDTO {
  id: string;
  category: WardrobeCategory;
  imageUrl: string;
  tags: string[];
}

export interface OutfitDTO {
  id: string;
  title?: string;
  occasion: OccasionTag;
  items: WardrobeItemDTO[];
  selfieUrl?: string;
  createdAt: string;
}

export interface OotdStudioActions {
  addWardrobeItem: (item: Omit<WardrobeItemDTO, 'id'>) => Promise<WardrobeItemDTO>;
  deleteWardrobeItem: (id: string) => Promise<void>;
  createOutfit: (occasion: OccasionTag, itemIds: string[], title?: string) => Promise<OutfitDTO>;
  attachSelfieToOutfit: (outfitId: string, selfieUrl: string) => Promise<void>;
}
```

---

## 3. `MealPlanner` Component Contract

```typescript
export type DayOfWeek = 1 | 2 | 3 | 4 | 5; // Monday to Friday
export type MealType = 'Café' | 'Almoço' | 'Lanche' | 'Jantar';
export type GroceryCategory = 'Hortifrúti' | 'Geladeira' | 'Despensa' | 'Outros';

export interface MealPlanDTO {
  id: string;
  dayOfWeek: DayOfWeek;
  mealType: MealType;
  title: string;
  photoUrl?: string;
  ingredients: string[];
}

export interface ShoppingItemDTO {
  id: string;
  itemName: string;
  category: GroceryCategory;
  isCompleted: boolean;
}

export interface MealPlannerActions {
  setMealPlan: (plan: Omit<MealPlanDTO, 'id'>) => Promise<MealPlanDTO>;
  addShoppingItem: (name: string, category: GroceryCategory) => Promise<ShoppingItemDTO>;
  toggleShoppingItem: (id: string, isCompleted: boolean) => Promise<void>;
}
```

---

## 4. `LegalBinder` Component Contract

```typescript
export interface StudyCourseDTO {
  id: string;
  name: string;
  professor?: string;
  colorAccent: string;
  progressPercentage: number;
}

export interface StudyNoteDTO {
  id: string;
  courseId: string;
  title: string;
  summaryText: string;
  photoUrl?: string;
  tags: string[];
  createdAt: string;
}

export interface StudyDeadlineDTO {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  status: 'Não iniciado' | 'Em rascunho' | 'Finalizado';
}

export interface LegalBinderActions {
  updateCourseProgress: (courseId: string, progress: number) => Promise<void>;
  addStudyNote: (note: Omit<StudyNoteDTO, 'id' | 'createdAt'>) => Promise<StudyNoteDTO>;
  addDeadline: (deadline: Omit<StudyDeadlineDTO, 'id'>) => Promise<StudyDeadlineDTO>;
  updateDeadlineStatus: (deadlineId: string, status: StudyDeadlineDTO['status']) => Promise<void>;
}
```
