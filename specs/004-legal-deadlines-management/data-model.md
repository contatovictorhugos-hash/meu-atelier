# Data Model: Gestão Completa de Prazos, Fichamentos e Listas Operacionais

**Feature**: [004-legal-deadlines-management](./spec.md)  
**Date**: 2026-09-03  
**Status**: Concluído

---

## 1. Entidades de Dados (TypeScript & PostgreSQL)

### 1.1 StudyDeadline (Prazos Jurídicos)
Representa um prazo processual, simulado OAB, entrega de trabalho prático ou avaliação acadêmica.

```typescript
export type DeadlineStatus = 'Não iniciado' | 'Em rascunho' | 'Finalizado';

export interface StudyDeadline {
  id: string;                                    // Identificador único (temp 'd_...' ou UUID)
  course_id: string;                             // Chave estrangeira referenciando StudyCourse.id
  user_id?: string;                              // UUID do usuário proprietário (RLS)
  title: string;                                 // Título descritivo do prazo/peça (não vazio)
  due_date: string;                              // Data limite no formato 'YYYY-MM-DD'
  status: DeadlineStatus;                        // Status operacional do fluxo
}
```

#### Regras de Validação:
- `title`: Obrigatório, mínimo de 2 caracteres, sem espaços em branco vazios.
- `due_date`: Obrigatório, formato de data válido (`YYYY-MM-DD`).
- `course_id`: Obrigatório, deve corresponder a uma matéria cadastrada ou padrão.
- `status`: Um dos três valores permitidos: `'Não iniciado'`, `'Em rascunho'`, `'Finalizado'`.

#### Transições de Estado:
```text
[ Criado / Não iniciado ] ──▶ [ Em rascunho ] ──▶ [ Finalizado ]
         ▲                          │                     │
         └──────────────────────────┴─────────────────────┘ (Pode transitar livremente)
```

---

### 1.2 StudyNote (Micro-Fichamento Jurídico)
Representa um fichamento conceitual, artigo de lei, súmula ou tese de jurisprudência.

```typescript
export interface StudyNote {
  id: string;                                    // Identificador único ('n_...' ou UUID)
  course_id: string;                             // Chave estrangeira referenciando StudyCourse.id
  user_id?: string;                              // UUID do usuário proprietário (RLS)
  title: string;                                 // Conceito central ou artigo (ex: 'Art. 422 CC')
  summary_text: string;                          // Texto de síntese doutrinária ou notas de aula
  photo_url?: string;                            // URL permanente da foto (Supabase Storage / WebP)
  tags: string[];                                // Lista de tags (ex: ['Contratos', 'Boa-fé'])
  created_at: string;                            // Data de criação (formato 'YYYY-MM-DD')
}
```

#### Regras de Validação:
- `title`: Obrigatório, mínimo de 2 caracteres.
- `summary_text`: Obrigatório, mínimo de 3 caracteres.
- `photo_url`: Opcional, se presente deve ser uma URL válida (HTTP/HTTPS).
- `tags`: Pelo menos 1 tag (se vazio, default: `['Fichamento']`).

---

### 1.3 PrepTask (Tarefa do Guia de Prep de Domingo)
Representa uma etapa semanal de preparação culinária no Módulo Bento.

```typescript
export interface PrepTask {
  id: string;                                    // Identificador único
  task: string;                                  // Descrição da etapa (ex: 'Cozinhar quinoa')
  completed: boolean;                            // Status de execução
}
```

#### Regras de Validação:
- `task`: Obrigatório, mínimo de 2 caracteres.

---

### 1.4 ShoppingItem (Item de Feira e Mercado)
Representa um ingrediente ou suprimento na lista de compras do Módulo Bento.

```typescript
export type GroceryCategory = 'Hortifrúti' | 'Geladeira' | 'Despensa' | 'Outros';

export interface ShoppingItem {
  id: string;                                    // Identificador único
  user_id?: string;                              // UUID do usuário proprietário
  item_name: string;                             // Nome do item/alimento
  category: GroceryCategory;                     // Categoria do corredor de compras
  is_completed: boolean;                         // Presente no carrinho
}
```

#### Regras de Validação:
- `item_name`: Obrigatório, mínimo de 2 caracteres.
- `category`: Um dos quatro valores: `'Hortifrúti'`, `'Geladeira'`, `'Despensa'`, `'Outros'`.

---

## 2. Contratos de Estado Zustand (`useLegalStore.ts` & `useMealStore.ts`)

### 2.1 useLegalStore
```typescript
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

  // Fichamentos
  addStudyNote: (note: Omit<StudyNote, 'id' | 'created_at'>) => void;
  updateStudyNote: (id: string, updates: Partial<Omit<StudyNote, 'id' | 'created_at'>>) => void; // [NOVO]
  deleteStudyNote: (id: string) => void;

  // Prazos
  addDeadline: (deadline: Omit<StudyDeadline, 'id'>) => void;
  updateDeadline: (id: string, updates: Partial<Omit<StudyDeadline, 'id'>>) => void; // [NOVO]
  updateDeadlineStatus: (id: string, status: DeadlineStatus) => void;
  deleteDeadline: (id: string) => void;
}
```

### 2.2 useMealStore
```typescript
interface MealState {
  weeklyMeals: MealPlanItem[];
  sundayPrepTasks: PrepTask[];
  shoppingItems: ShoppingItem[];
  isLoading: boolean;

  fetchMeals: () => Promise<void>;
  saveMeal: (meal: Omit<MealPlanItem, 'id'> & { id?: string }) => void;
  deleteMeal: (id: string) => void;

  // Prep Tasks
  togglePrepTask: (id: string) => void;
  addPrepTask: (task: string) => void;
  updatePrepTask: (id: string, task: string) => void; // [NOVO]
  deletePrepTask: (id: string) => void;

  // Shopping Items
  toggleShoppingItem: (id: string) => void;
  addShoppingItem: (name: string, category: GroceryCategory) => void;
  updateShoppingItem: (id: string, updates: { item_name?: string; category?: GroceryCategory }) => void; // [NOVO]
  deleteShoppingItem: (id: string) => void;
  clearCompletedShoppingItems: () => void;
}
```

---

## 3. Contratos de Sincronização Cloud (`src/lib/supabase/sync.ts`)

Novas funções assíncronas a serem introduzidas:

```typescript
// Prazos
export async function updateUserDeadline(
  id: string,
  updates: Partial<Omit<StudyDeadline, 'id' | 'user_id'>>
): Promise<void>;

// Fichamentos
export async function updateUserNote(
  id: string,
  updates: Partial<Omit<StudyNote, 'id' | 'user_id' | 'created_at'>>
): Promise<void>;

// Prep Tasks
export async function updateUserPrepTask(
  id: string,
  task: string
): Promise<void>;

// Shopping Items
export async function updateUserShoppingItem(
  id: string,
  updates: { item_name?: string; category?: GroceryCategory }
): Promise<void>;
```

