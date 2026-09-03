# Data Model: Personalização Total de Matérias Jurídicas e Cardápio Bento

**Feature**: `002-custom-courses-bento`  
**Date**: 2026-09-02  
**Status**: Completed

---

## 1. Entidades Principais

### A. `StudyCourse` (Matéria / Disciplina Acadêmica)
Representa uma disciplina cursada na faculdade de Direito.

```typescript
export interface StudyCourse {
  id: string;                          // Identificador único (ex: 'c_1725330000000')
  user_id?: string;                    // Opcional para sync futuro
  name: string;                        // Nome da matéria (ex: "Direito Civil — Contratos")
  professor?: string;                  // Nome do docente (ex: "Prof. Dra. Juliana Paes")
  day_of_week?: number;                // Dia da aula (1 = Seg, 2 = Ter, ..., 6 = Sáb)
  color_accent: string;                // Cor pastel de fundo do card (ex: "#FDF2F4")
  progress_percentage: number;         // Percentual de leituras do semestre (0 a 100)
}
```

#### Regras de Validação:
- `name`: String obrigatória, não vazia, limite de 80 caracteres.
- `professor`: String opcional, limite de 60 caracteres.
- `day_of_week`: Inteiro entre 1 e 6 (1 = Segunda, 2 = Terça, 3 = Quarta, 4 = Quinta, 5 = Sexta, 6 = Sábado).
- `color_accent`: Código de cor válido (hexadecimal) ou classe de cor pastel pré-aprovada.
- `progress_percentage`: Número inteiro entre 0 e 100 (`Math.min(Math.max(val, 0), 100)`).

---

### B. `MealPlanItem` (Refeição / Marmita da Semana)
Representa um slot de refeição no planejador alimentar.

```typescript
export type MealType = 'Café' | 'Almoço' | 'Lanche' | 'Jantar';

export interface MealPlanItem {
  id: string;                          // Identificador único (ex: 'm_1725330000000')
  user_id?: string;                    // Opcional para sync futuro
  day_of_week: number;                 // 1 = Seg, 2 = Ter, ..., 7 = Dom
  meal_type: MealType;                 // 'Café' | 'Almoço' | 'Lanche' | 'Jantar'
  title: string;                       // Título do prato (ex: "Bowl de Frango com Quinoa")
  photo_url?: string;                  // DataURL permanente WebP ou URL web
  ingredients: string[];               // Lista de ingredientes principais
}
```

#### Regras de Validação:
- `day_of_week`: Inteiro entre 1 e 7 (1 = Segunda ... 7 = Domingo).
- `meal_type`: Um dos valores do enum `MealType`.
- `title`: String obrigatória, não vazia, limite de 80 caracteres.
- `ingredients`: Array de strings (sanitizadas com `trim()` e sem strings vazias).
- `photo_url`: DataURL base64 ou URL HTTP/HTTPS segura.

---

### C. `PrepTask` (Tarefa de Pré-Preparo do Domingo)
Representa um passo de adiantamento culinário semanal.

```typescript
export interface PrepTask {
  id: string;                          // Identificador único (ex: 'pt_1725330000000')
  task: string;                        // Descrição da tarefa (ex: "Cozinhar ovos para a semana")
  completed: boolean;                  // Status de conclusão
}
```

---

### D. `ShoppingItem` (Item da Lista de Feira)
Representa um mantimento ou ingrediente a comprar.

```typescript
export type GroceryCategory = 'Hortifrúti' | 'Geladeira' | 'Despensa' | 'Outros';

export interface ShoppingItem {
  id: string;                          // Identificador único
  user_id?: string;
  item_name: string;                   // Nome do produto
  category: GroceryCategory;           // Categoria na feira/mercado
  is_completed: boolean;               // Marcado como comprado no carrinho
}
```

---

## 2. Contratos de Estado Zustand (Stores)

### `LegalState` (`src/stores/useLegalStore.ts`)
```typescript
interface LegalState {
  courses: StudyCourse[];
  notes: StudyNote[];
  deadlines: StudyDeadline[];

  // Operações de Matérias
  addCourse: (course: Omit<StudyCourse, 'id'>) => void;
  updateCourse: (id: string, updates: Partial<Omit<StudyCourse, 'id'>>) => void;
  deleteCourse: (id: string) => void;
  updateCourseProgress: (id: string, progress: number) => void;

  // Operações de Fichamentos e Prazos (já existentes)
  addStudyNote: (note: Omit<StudyNote, 'id' | 'created_at'>) => void;
  deleteStudyNote: (id: string) => void;
  addDeadline: (deadline: Omit<StudyDeadline, 'id'>) => void;
  updateDeadlineStatus: (id: string, status: DeadlineStatus) => void;
  deleteDeadline: (id: string) => void;
}
```

### `MealState` (`src/stores/useMealStore.ts`)
```typescript
interface MealState {
  weeklyMeals: MealPlanItem[];
  sundayPrepTasks: PrepTask[];
  shoppingItems: ShoppingItem[];

  // Operações de Cardápio
  saveMeal: (meal: Omit<MealPlanItem, 'id'> & { id?: string }) => void;
  deleteMeal: (id: string) => void;

  // Operações de Sunday Prep
  togglePrepTask: (id: string) => void;
  addPrepTask: (task: string) => void;
  deletePrepTask: (id: string) => void;

  // Operações de Lista de Feira
  toggleShoppingItem: (id: string) => void;
  addShoppingItem: (name: string, category: GroceryCategory) => void;
  deleteShoppingItem: (id: string) => void;
  clearCompletedShoppingItems: () => void;
}
```
