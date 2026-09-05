# Tasks: Ergonomia e Responsividade Móvel dos Cartões de Prazos Jurídicos

**Branch**: `005-legal-deadlines-responsive-card`  
**Feature Directory**: `specs/005-legal-deadlines-responsive-card`  
**Input**: Feature specification and technical design from `specs/005-legal-deadlines-responsive-card/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verificação do ambiente e alinhamento com os contratos de interface

- [X] T001 Setup feature workspace context and verify design contracts in specs/005-legal-deadlines-responsive-card/contracts/ui-contracts.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Análise da estrutura atual antes das modificações visuais

- [X] T002 Inspect existing component layout and style hooks in src/components/modules/legal-binder/DeadlineTracker.tsx

---

## Phase 3: User Story 1 - Cartão de Prazo com Altura e Respiro Vertical Aprimorados no Mobile (Priority: P1) 🎯 MVP

**Goal**: Permitir que os prazos acadêmicos tenham cartões com maior altura vertical (`min-h-[96px]`), padding acolhedor e títulos multilinha legíveis sem truncamento em telas de 320px a 390px.

**Independent Test**: Renderizar a lista de prazos em viewport móvel de 375px e constatar que o cartão possui altura ampliada, fundo creme `#FCFBF7`, cantos `rounded-2xl` e título completamente legível sem colidir com controles laterais.

### Implementation for User Story 1

- [X] T003 [US1] Refactor card container to generous vertical layout with min-h-[96px] and padding in src/components/modules/legal-binder/DeadlineTracker.tsx
- [X] T004 [US1] Enhance title styling with break-words and multi-line breathing room in src/components/modules/legal-binder/DeadlineTracker.tsx

---

## Phase 4: User Story 2 - Botões de Ação Empilhados no Lado Direito do Cartão (Priority: P2)

**Goal**: Posicionar os botões de ação (Editar e Excluir) em uma coluna vertical empilhada à direita com alvos de toque mínimos de 44x44pt.

**Independent Test**: Tocar individualmente no botão Editar (topo) e Excluir (base) em dispositivo móvel, verificando a precisão ergonômica com uma só mão e abertura dos respectivos fluxos.

### Implementation for User Story 2

- [X] T005 [US2] Reorganize action buttons into right-side vertical column with subtle divider in src/components/modules/legal-binder/DeadlineTracker.tsx
- [X] T006 [US2] Ensure minimum 44x44pt touch targets for Pencil and Trash2 buttons in src/components/modules/legal-binder/DeadlineTracker.tsx

---

## Phase 5: User Story 3 - Distribuição Harmoniosa de Metadados e Seletor de Status (Priority: P3)

**Goal**: Distribuir o badge da matéria, a data e o menu suspenso de status de forma ergonômica no corpo vertical do cartão.

**Independent Test**: Alterar o status do prazo no dropdown e verificar que a seleção é fluida e o layout permanece perfeitamente estável.

### Implementation for User Story 3

- [X] T007 [US3] Structure metadata header (Badge and formatted date) in src/components/modules/legal-binder/DeadlineTracker.tsx
- [X] T008 [US3] Align status select dropdown at the bottom of the main content column in src/components/modules/legal-binder/DeadlineTracker.tsx

---

## Phase 6: Polish & Quality Gates

**Purpose**: Verificação rigorosa de integridade, testes, linting, build e responsividade

- [X] T009 [P] Run and verify strict TypeScript compilation via npm run typecheck
- [X] T010 [P] Run and verify ESLint compliance via npm run lint
- [X] T011 Run complete automated test suite (84+ tests) via npm test
- [X] T012 Run dry-run production build via npm run build
- [X] T013 Execute mobile viewport layout verification per specs/005-legal-deadlines-responsive-card/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies
- **Phase 1 (Setup)**: Sem dependências.
- **Phase 2 (Foundational)**: Bloqueia as fases de implementação.
- **Phase 3 (User Story 1 - P1)**: Depende da Phase 2. Entrega o MVP.
- **Phase 4 (User Story 2 - P2)**: Depende da Phase 3 para montagem da coluna lateral.
- **Phase 5 (User Story 3 - P3)**: Depende da Phase 4 para alinhamento final dos metadados.
- **Phase 6 (Polish)**: Depende de todas as histórias concluídas.

---

## Parallel Execution Opportunities

- T009 (`npm run typecheck`) e T010 (`npm run lint`) podem ser executados em paralelo.
- A verificação dos testes automatizados (T011) garante ausência de regressões em todo o app.
