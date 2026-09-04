# Tasks: Gestão Completa (Edição e Exclusão) de Prazos, Fichamentos e Listas Operacionais

**Feature**: `004-legal-deadlines-management`  
**Plan**: [specs/004-legal-deadlines-management/plan.md](./plan.md)  
**Spec**: [specs/004-legal-deadlines-management/spec.md](./spec.md)  
**Status**: Ready for Implementation

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verificação e garantia de tipagens de domínio e contratos de dados compartilhados

- [X] T001 Verify and consolidate TypeScript definitions for `StudyDeadline`, `StudyNote`, `PrepTask`, and `ShoppingItem` in `src/types/database.types.ts`

---

## Phase 2: Foundational (State & Store Enhancements)

**Purpose**: Infraestrutura de estado com persistência local e sincronização Supabase que bloqueia as histórias de usuário

**⚠️ CRITICAL**: Nenhuma implementação de tela pode iniciar antes que estas ações de store e sync estejam tipadas e testadas

- [X] T002 [P] Implement `updateDeadline` action in `src/stores/useLegalStore.ts`
- [X] T003 [P] Implement `updateStudyNote` action in `src/stores/useLegalStore.ts`
- [X] T004 [P] Implement `updatePrepTask` and `updateShoppingItem` actions in `src/stores/useMealStore.ts`
- [X] T005 [P] Implement `updateUserDeadline`, `updateUserNote`, `updateUserPrepTask`, and `updateUserShoppingItem` in `src/lib/supabase/sync.ts`
- [X] T006 [P] Add unit tests for `updateDeadline` and `updateStudyNote` in `tests/unit/test-legal-store.ts`
- [X] T007 [P] Add unit tests for `updatePrepTask` and `updateShoppingItem` in `tests/unit/test-meal-store.ts`

**Checkpoint**: Estado reativo, tipado e com testes unitários pronto. A implementação de UI pode iniciar.

---

## Phase 3: User Story 1 - Gestão Completa de Prazos Acadêmicos e Práticos: Edição e Exclusão Segura (Priority: P1) 🎯 MVP

**Goal**: Permitir que a usuária edite e exclua prazos já criados na aba "Prazos" do Caderno Jurídico (`/legal`), com alvos de toque de 44x44pt, modal delicado e confirmação preventiva.

**Independent Test**: Acessar `/legal`, navegar até a aba "Prazos", editar título, data e matéria de um prazo existente, verificar a atualização imediata no cartão, e excluir um prazo confirmando o alerta com atualização do estado da lista.

- [X] T008 [P] [US1] Create `DeadlineModal.tsx` in `src/components/modules/legal-binder/DeadlineModal.tsx` for creating and editing deadlines with pre-filled inputs, course selector, date input, status select, and min 44x44pt touch targets
- [X] T009 [US1] Refactor `DeadlineTracker.tsx` in `src/components/modules/legal-binder/DeadlineTracker.tsx` to add Edit (`Pencil`) and Delete (`Trash2`) buttons, integrate `DeadlineModal`, wire `deleteDeadline` with soft confirmation, and display a welcoming empty state

**Checkpoint**: User Story 1 (P1 - MVP) 100% funcional e testável de forma autônoma.

---

## Phase 4: User Story 2 - Edição Completa de Micro-Fichamentos e Resumos Jurídicos (Priority: P2)

**Goal**: Permitir que a usuária edite resumos, matérias, tags e fotos de micro-fichamentos existentes em `StudyNotes.tsx` sem perda de dados ou necessidade de recriação.

**Independent Test**: Na aba "Fichamentos", clicar em editar em um fichamento existente, alterar a síntese e adicionar uma tag, salvar e confirmar a atualização no cartão preservando a foto permanente e data original.

- [X] T010 [US2] Update `StudyNotes.tsx` in `src/components/modules/legal-binder/StudyNotes.tsx` to add Edit (`Pencil`) button, handle `noteToEdit` state in the existing modal, and wire `updateStudyNote` without re-uploading existing images

**Checkpoint**: User Story 1 e 2 funcionando com independência total no Módulo Jurídico.

---

## Phase 5: User Story 3 - Edição e Gestão Fluida no Guia de Prep de Domingo (Priority: P3)

**Goal**: Permitir edição ágil do texto de tarefas de pré-cozimento no Guia de Prep de Domingo no Módulo Bento (`/bento`).

**Independent Test**: Acessar `/bento`, selecionar uma tarefa do Sunday Prep Guide, editar sua descrição inline, confirmar e validar a persistência sem alteração no percentual de conclusão.

- [X] T011 [US3] Update `SundayPrepGuide.tsx` in `src/components/modules/meal-planner/SundayPrepGuide.tsx` with inline task editing (`Pencil`, edit input, save, cancel) and 44x44pt touch targets

**Checkpoint**: User Stories 1, 2 e 3 entregues e testáveis.

---

## Phase 6: User Story 4 - Edição Rápida de Itens na Lista de Feira & Mercado (Priority: P4)

**Goal**: Permitir edição do nome e reclassificação de categoria de ingredientes na Lista de Feira do Módulo Bento.

**Independent Test**: Na Lista de Feira, selecionar um item, alterar seu nome e mudar sua categoria (ex: de Despensa para Geladeira), verificando a migração imediata para a seção correta.

- [X] T012 [US4] Update `ShoppingList.tsx` in `src/components/modules/meal-planner/ShoppingList.tsx` with quick-edit capability for item name and category transfer

**Checkpoint**: Todas as 4 User Stories entregues e testáveis com consistência total em todo o Atelier.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Verificação de acessibilidade, ergonomia móvel, qualidade e testes globais

- [X] T013 [P] Verify 44x44pt touch targets, safe areas, and mobile responsiveness at 320px in `src/components/modules/`
- [X] T014 Run full test suite (`npm test`), strict typecheck (`npm run typecheck`), and linter (`npm run lint`)
- [X] T015 Run quickstart end-to-end validation scenarios per `specs/004-legal-deadlines-management/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Sem dependências — inicia imediatamente.
- **Foundational (Phase 2)**: Depende da Phase 1 — BLOQUEIA a implementação das histórias de usuário.
- **User Stories (Phase 3+)**: Dependem da Phase 2 (Foundational) completa.
  - Phase 3 (US1 - Prazos MVP) pode ser validada de forma independente.
  - Phase 4 (US2 - Fichamentos) pode ser desenvolvida logo após US1.
  - Phase 5 (US3 - Prep) e Phase 6 (US4 - Feira) podem ser desenvolvidas em sequência ou em paralelo.
- **Polish (Phase 7)**: Depende de todas as User Stories finalizadas.

### User Story Dependencies
- **User Story 1 (P1)**: Inicia após Phase 2 — Nenhuma dependência com as outras histórias.
- **User Story 2 (P2)**: Inicia após Phase 2 — Independente de US1.
- **User Story 3 (P3)**: Inicia após Phase 2 — Independente de US1/US2.
- **User Story 4 (P4)**: Inicia após Phase 2 — Independente de US1/US2/US3.

### Parallel Opportunities
- T002, T003, T004, T005, T006 e T007 podem ser implementados e testados em paralelo dentro da Phase 2.
- T008 (`DeadlineModal.tsx`) pode ser construído em paralelo com tarefas de preparação.
- T011 (`SundayPrepGuide.tsx`) e T012 (`ShoppingList.tsx`) podem ser executados simultaneamente.
- T013 (Acessibilidade/Touch Targets) pode ser inspecionado em paralelo com os testes finais de T014.

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Concluir Phase 1 (Setup) e Phase 2 (Foundational: Store actions & tests).
2. Concluir Phase 3 (User Story 1: `DeadlineModal.tsx` e `DeadlineTracker.tsx`).
3. **VALIDAÇÃO MVP**: Testar a aba de Prazos de forma autônoma na web e mobile simulado.

### Incremental Delivery
1. Setup + Foundational prontos.
2. US1 entregue (Prazos 100% editáveis e com exclusão segura).
3. US2 entregue (Fichamentos com edição in-place sem perda de fotos).
4. US3 entregue (Prep de Domingo com edição inline).
5. US4 entregue (Lista de Feira com edição de nome e categoria).
6. Polish & Quality Gates (100% testes verdes, typecheck zero `any`, lint aprovado).

