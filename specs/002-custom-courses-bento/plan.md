# Implementation Plan: Personalização Total de Matérias Jurídicas e Cardápio Bento

**Branch**: `feat/universal-image-import` | **Date**: 2026-09-02 | **Spec**: [specs/002-custom-courses-bento/spec.md](./spec.md)

---

## Summary

Esta feature elimina todos os dados estáticos/mockados remanescentes no Atelier, entregando total controle à usuária sobre:
1. **Caderno Jurídico (`/legal`)**: CRUD completo de matérias (adicionar, editar, apagar), incluindo nome do docente, dia da semana da aula e cor pastel temática.
2. **Planejador Bento (`/bento`)**: Cardápio semanal interativo cobrindo de Segunda a Domingo com suporte a multimídia (`ImageUploadField`), gerenciamento customizável do "Sunday Prep Guide" e limpeza em lote da "Lista de Feira".

---

## Technical Context

**Language/Version**: TypeScript 5.7.3 estrito (zero `any`)  
**Primary Dependencies**: Next.js 15.2.0 (App Router), React 19, Tailwind CSS 3.4, Lucide React, Zustand 5  
**Storage**: `localStorage` (via middleware `persist` do Zustand com chaves isoladas `atelier-legal-storage` e `atelier-meal-storage`)  
**Testing**: Node.js Test Runner nativo (`node --test`), TypeScript Compiler (`tsc --noEmit`), ESLint  
**Target Platform**: Mobile-first Web / PWA responsivo em iOS e Android (Mobile Safari, Chrome) e Desktop  
**Project Type**: Next.js SPA/PWA com Server-Side Rendering e geração estática (SSG)  
**Performance Goals**: 60 FPS em transições de modal e toque, carregamento em < 1s, bundle leve  
**Constraints**: 100% Custo Zero contínuo (Princípio VI), operação autônoma offline-first (Princípio V)  
**Scale/Scope**: 2 módulos principais refatorados (`/legal` e `/bento`), 2 novos modais de gestão, 4 novas ações em stores Zustand  

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Descrição da Salvaguarda | Status |
| :--- | :--- | :---: |
| **I. Dopamina Estética Y2K** | Paleta blush/cream/bordeaux, chips arredondados (`rounded-2xl` e `rounded-3xl`), polaroids de marmitas e ícones delicados | ✅ Aprovado |
| **II. Ergonomia Móvel** | Alvos de toque com área mínima de 44x44 pontos (`min-h-[44px]`), sem espaçamentos fixos arbitrários e thumb-zone ergonômica | ✅ Aprovado |
| **III. Config-Driven** | Stores tipadas e desacopladas (`useLegalStore`, `useMealStore`) mantendo dados independentes de layout | ✅ Aprovado |
| **IV. Tipagem Estrita** | Interfaces completas sem `any`, validação rigorosa com `tsc --noEmit` | ✅ Aprovado |
| **V. Resiliência Offline** | Persistência local imediata com fallback elegante e zero dependência de rede para CRUD básico | ✅ Aprovado |
| **VI. Custo Zero (R$ 0,00)** | Zero chamadas a APIs pagas; processamento e compressão 100% no dispositivo do usuário | ✅ Aprovado |

---

## Project Structure

### Documentation (this feature)

```text
specs/002-custom-courses-bento/
├── plan.md              # Este plano de implementação
├── research.md          # Pesquisa técnica e decisões de arquitetura
├── data-model.md        # Modelagem tipada de entidades e stores
├── quickstart.md        # Guia passo a passo de validação ponta a ponta
├── contracts/
│   └── ui-contracts.md  # Contratos visuais de componentes e modais
└── checklists/
    └── requirements.md  # Checklist de conformidade de requisitos
```

### Source Code Architecture

```text
src/
├── app/(dashboard)/
│   ├── bento/page.tsx               # Orquestração das abas do Bento
│   └── legal/page.tsx               # Orquestração do Caderno Jurídico
├── components/modules/
│   ├── legal-binder/
│   │   ├── CourseCards.tsx          # Card list de matérias com tags e ações
│   │   ├── CourseModal.tsx          # [NOVO] Modal de criação/edição de matérias
│   │   ├── FocusTimer.tsx           # Timer de foco (Pomodoro)
│   │   ├── StudyNotes.tsx           # Micro-fichamentos com ImageUploadField
│   │   └── DeadlineTracker.tsx      # Rastreador de prazos acadêmicos
│   └── meal-planner/
│       ├── WeeklyMealGrid.tsx       # Grade interativa 7 dias com slots editáveis
│       ├── MealModal.tsx            # [NOVO] Modal para planejar/editar refeição
│       ├── SundayPrepGuide.tsx      # Checklist do domingo com adição/remoção
│       └── ShoppingList.tsx         # Lista de feira com limpeza em lote
├── stores/
│   ├── useLegalStore.ts             # CRUD de matérias, fichamentos e prazos
│   └── useMealStore.ts              # CRUD de refeições, Sunday prep e feira
└── types/
    └── database.types.ts            # Interfaces TypeScript canônicas
tests/
├── unit/
│   ├── test-legal-store.ts          # Testes unitários para CRUD de matérias
│   └── test-meal-store.ts           # Testes unitários para CRUD de refeições e prep
```

---

## Complexity Tracking

*Nenhuma violação ou exceção aos princípios da Constituição foi requerida.*
