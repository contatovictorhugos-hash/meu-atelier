# Tasks: Personalização Total de Matérias Jurídicas e Cardápio Bento

**Feature**: `002-custom-courses-bento`  
**Plan**: [specs/002-custom-courses-bento/plan.md](./plan.md)  
**Spec**: [specs/002-custom-courses-bento/spec.md](./spec.md)  
**Status**: Ready for Implementation

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Definição canônica de tipos e esquemas de dados compartilhados

- [ ] T001 Extend TypeScript definitions for `StudyCourse` (`day_of_week`, `professor`) and `MealPlanItem` (7-day support) in `src/types/database.types.ts`

---

## Phase 2: Foundational (State & Store Enhancements)

**Purpose**: Infraestrutura de estado com persistência local no Zustand que bloqueia as histórias de usuário

- [ ] T002 [P] Implement `addCourse`, `updateCourse`, and `deleteCourse` in `src/stores/useLegalStore.ts`
- [ ] T003 [P] Implement `saveMeal` and `deleteMeal` in `src/stores/useMealStore.ts`
- [ ] T004 [P] Implement `addPrepTask` and `deletePrepTask` in `src/stores/useMealStore.ts`
- [ ] T005 [P] Implement `clearCompletedShoppingItems` in `src/stores/useMealStore.ts`
- [ ] T006 [P] Add unit tests for LegalStore course CRUD in `tests/unit/test-legal-store.ts`
- [ ] T007 [P] Add unit tests for MealStore meal, prep and shopping CRUD in `tests/unit/test-meal-store.ts`

**Checkpoint**: Estado reativo, tipado e com testes unitários pronto. A implementação de UI pode iniciar.

---

## Phase 3: User Story 1 - Gestão Completa de Matérias Acadêmicas no Caderno Jurídico (Priority: P1) 🎯 MVP

**Goal**: Permitir que a estudante adicione, edite, exclua e visualize disciplinas com nome do professor, dia da semana e cor temática em `/legal`.

**Independent Test**: Acessar `/legal`, criar a matéria "Direito Civil — Contratos" para Terças-feiras com a Profª Juliana, ajustar o progresso de leitura, editar os dados e excluir uma matéria de teste com persistência após F5.

- [ ] T008 [P] [US1] Create `CourseModal.tsx` in `src/components/modules/legal-binder/CourseModal.tsx` with weekday selector chips, pastel color picker, and validation
- [ ] T009 [US1] Update `CourseCards.tsx` in `src/components/modules/legal-binder/CourseCards.tsx` with "+ Nova Matéria" trigger, weekday tags, professor name, and edit/delete actions
- [ ] T010 [US1] Integrate `CourseModal` into `/legal` page orchestration in `src/app/(dashboard)/legal/page.tsx`

**Checkpoint**: User Story 1 100% funcional e testável de forma autônoma.

---

## Phase 4: User Story 2 - Cardápio Semanal Totalmente Personalizável no Bento (Priority: P1)

**Goal**: Substituir a grade fixa por um cardápio interativo cobrindo de Segunda a Domingo com suporte a multimídia (`ImageUploadField`).

**Independent Test**: Acessar `/bento`, clicar em qualquer dia para planejar almoço ou lanche com foto e ingredientes, salvar e verificar a renderização dinâmica.

- [ ] T011 [P] [US2] Create `MealModal.tsx` in `src/components/modules/meal-planner/MealModal.tsx` with weekday selector, meal type selector, dish title, ingredients input, and `ImageUploadField`
- [ ] T012 [US2] Refactor `WeeklyMealGrid.tsx` in `src/components/modules/meal-planner/WeeklyMealGrid.tsx` to support 7 days (Seg-Dom), clickable edit/add slots, and visual highlight for today's meal

**Checkpoint**: User Story 1 e 2 funcionando com independência total.

---

## Phase 5: User Story 3 - Personalização do Prep de Domingo & Lista de Feira (Priority: P2)

**Goal**: Customização do checklist do Sunday Prep e descarte em lote de itens comprados na lista de compras.

**Independent Test**: Adicionar e excluir tarefas de pré-cozimento no "Guia de Prep de Domingo", e acionar "Limpar Concluídos" na "Lista de Feira".

- [ ] T013 [P] [US3] Update `SundayPrepGuide.tsx` in `src/components/modules/meal-planner/SundayPrepGuide.tsx` with inline task input, add button, and individual task deletion
- [ ] T014 [P] [US3] Update `ShoppingList.tsx` in `src/components/modules/meal-planner/ShoppingList.tsx` with "Limpar Concluídos" batch action button

**Checkpoint**: Todas as 3 User Stories entregues e testáveis.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verificação de acessibilidade, ergonomia móvel, qualidade e testes globais

- [ ] T015 [P] Verify 44x44pt touch targets, safe areas, and mobile ergonomics across new modals in `src/components/modules/`
- [ ] T016 Run full test suite `./test-app`, strict typecheck (`npm run typecheck`), and linter (`npm run lint`)
- [ ] T017 Run quickstart end-to-end validation scenarios per `specs/002-custom-courses-bento/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Sem dependências — inicia imediatamente.
- **Foundational (Phase 2)**: Depende da Phase 1 — BLOQUEIA a implementação das histórias de usuário.
- **User Stories (Phase 3+)**: Dependem da Phase 2 (Foundational) completa.
  - Phase 3 (US1 - Legal) e Phase 4 (US2 - Bento) podem ser desenvolvidas em paralelo ou sequencialmente.
  - Phase 5 (US3 - Prep & Feira) pode ser executada após ou em paralelo com US2.
- **Polish (Phase 6)**: Depende de todas as User Stories finalizadas.

### Parallel Opportunities
- T002, T003, T004, T005, T006 e T007 podem ser implementados e testados em paralelo.
- T008 (`CourseModal.tsx`) e T011 (`MealModal.tsx`) operam em arquivos isolados e podem ser construídos simultaneamente.
- T013 (`SundayPrepGuide.tsx`) e T014 (`ShoppingList.tsx`) são paralelizáveis.

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Concluir Phase 1 (Tipos) e Phase 2 (Stores & Testes).
2. Concluir Phase 3 (User Story 1 - Gestão de Matérias em `/legal`).
3. Validar de forma independente e apresentar o MVP.

### Incremental Delivery
1. Entregar MVP (Matérias Jurídicas em `/legal`).
2. Entregar Cardápio Semanal Customizável em `/bento` (US2).
3. Entregar Sunday Prep e Lista de Feira (US3).
4. Rodar testes globais e homologação com os subagentes.
