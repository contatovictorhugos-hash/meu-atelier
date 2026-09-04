# Implementation Plan: Gestão Completa (Edição e Exclusão) de Prazos, Fichamentos e Listas Operacionais

**Branch**: `004-legal-deadlines-management` | **Date**: 2026-09-03 | **Spec**: [specs/004-legal-deadlines-management/spec.md](./spec.md)

---

## Summary

Esta feature implementa a capacidade de **edição completa e exclusão segura** de prazos na aba "Prazos" do Caderno Jurídico (`/legal`), corrigindo a limitação onde o usuário não podia editar dados nem remover itens previamente cadastrados.
Além disso, estende o mesmo padrão ergonômico e limpo para outros pontos do Atelier identificados com limitações similares:
1. **Fichamentos Jurídicos (`StudyNotes.tsx`)**: Adição de modo de edição in-place sem perda de fotos ou datas originais.
2. **Guia de Prep de Domingo (`SundayPrepGuide.tsx`)**: Edição rápida de etapas culinárias.
3. **Lista de Feira & Mercado (`ShoppingList.tsx`)**: Edição de nome e transferência entre categorias.

A solução adota modais estéticos padronizados (`DeadlineModal`), alvos de toque acessíveis de no mínimo 44x44 pontos, confirmações preventivas contra exclusões acidentais, persistência local e sincronização otimista com Supabase RLS.

---

## Technical Context

**Language/Version**: TypeScript 5.7.3 estrito (zero `any`)  
**Primary Dependencies**: Next.js 15.2.0 (App Router), React 19, Tailwind CSS 3.4, Lucide React, Zustand 5  
**Storage**: Zustand com persistência local (`atelier-legal-storage`, `atelier-meal-storage`) + Supabase PostgreSQL com RLS (`study_deadlines`, `study_notes`, `sunday_prep_tasks`, `shopping_items`)  
**Testing**: Node.js Test Runner nativo (`node --test`), TypeScript Compiler (`tsc --noEmit`), ESLint  
**Target Platform**: Mobile-first Web / PWA responsivo em iOS e Android (Mobile Safari, Chrome) e Desktop  
**Project Type**: Next.js SPA/PWA com Client & Server Components  
**Performance Goals**: Latência visual < 100ms para exclusão e edição, 60 FPS estáveis nas animações de modal e toque  
**Constraints**: Custo Financeiro Zero contínuo (Princípio VI), operação offline-first (Princípio V), alvos mínimos de 44x44pt (Princípio II)  
**Scale/Scope**: 4 componentes UI atualizados/criados, 2 stores Zustand expandidas, 4 funções de sincronização em `sync.ts`  

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio da Constituição | Descrição da Salvaguarda | Status |
| :--- | :--- | :---: |
| **I. Dopamina Estética Y2K** | Modais e botões nos tokens oficiais (blush `#FDF2F4`, bordeaux `#4A1525`, cantos `rounded-2xl` a `rounded-3xl`), sem interfaces corporativas frias. | ✅ Aprovado |
| **II. Ergonomia Móvel** | Botões com `min-h-[44px] min-w-[44px]`, alinhamento seguro em telas estreitas (320px+), respeito a Safe Areas e thumb-zone. | ✅ Aprovado |
| **III. Config-Driven** | Stores tipadas (`useLegalStore`, `useMealStore`) desacopladas dos componentes visuais. | ✅ Aprovado |
| **IV. Tipagem Estrita** | Interfaces completas sem uso do tipo `any`, checagem rigorosa com `npm run typecheck`. | ✅ Aprovado |
| **V. Resiliência Offline & RLS** | Atualizações otimistas no Zustand com persistência em nuvem em segundo plano via RLS (`auth.uid() = user_id`). | ✅ Aprovado |
| **VI. Custo Zero (R$ 0,00)** | Zero bibliotecas pagas, zero chamadas a APIs pagas, operando 100% no Supabase Free Tier e Vercel Hobby. | ✅ Aprovado |

---

## Project Structure

### Documentation (this feature)

```text
specs/004-legal-deadlines-management/
├── plan.md              # Este plano de arquitetura e implementação
├── research.md          # Pesquisa técnica e decisões de UX/Arquitetura
├── data-model.md        # Modelagem tipada de entidades, stores e sync
├── quickstart.md        # Guia passo a passo de validação ponta a ponta
├── contracts/
│   └── ui-contracts.md  # Contratos visuais de componentes e modais
└── checklists/
    └── requirements.md  # Checklist de conformidade de requisitos da especificação
```

### Source Code Architecture

```text
src/
├── components/modules/
│   ├── legal-binder/
│   │   ├── CourseCards.tsx          # Matérias do semestre (referência de UX)
│   │   ├── CourseModal.tsx          # Modal de matérias
│   │   ├── DeadlineTracker.tsx      # Lista de prazos com botões de Editar/Excluir e confirmação
│   │   ├── DeadlineModal.tsx        # [NOVO] Modal de criação e edição de prazos
│   │   ├── FocusTimer.tsx           # Timer de estudos
│   │   └── StudyNotes.tsx           # Fichamentos com edição in-place de texto/foto/tags
│   └── meal-planner/
│       ├── SundayPrepGuide.tsx      # Prep de Domingo com edição rápida de tarefas
│       └── ShoppingList.tsx         # Lista de Feira com edição de nome e categoria
├── stores/
│   ├── useLegalStore.ts             # Adição de updateDeadline e updateStudyNote
│   └── useMealStore.ts              # Adição de updatePrepTask e updateShoppingItem
├── lib/supabase/
│   └── sync.ts                      # Adição de updateUserDeadline, updateUserNote, updateUserPrepTask, updateUserShoppingItem
└── types/
    └── database.types.ts            # Tipos canônicos consolidados
tests/
├── unit/
│   ├── test-legal-store.ts          # Testes unitários de update/delete de prazos e fichamentos
│   └── test-meal-store.ts           # Testes unitários de update de prep e shopping items
```

**Structure Decision**: A aplicação segue a arquitetura modular estabelecida em Next.js App Router, agrupando módulos por domínio de funcionalidade sob `components/modules/` e centralizando estados reativos sob `stores/`.

---

## Complexity Tracking

*Nenhuma violação ou exceção aos princípios da Constituição foi requerida.*

