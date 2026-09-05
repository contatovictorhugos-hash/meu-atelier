# Implementation Plan: Ergonomia e Responsividade Móvel dos Cartões de Prazos Jurídicos

**Branch**: `005-legal-deadlines-responsive-card` | **Date**: 2026-09-04 | **Spec**: [specs/005-legal-deadlines-responsive-card/spec.md](spec.md)

---

## Summary

Otimizar a arquitetura visual e a ergonomia de toque do componente `DeadlineTracker.tsx` no Módulo Jurídico (`/legal`), expandindo verticalmente os cartões de prazos acadêmicos para eliminar o truncamento horizontal em dispositivos móveis, e reorganizando os botões de ação (Editar e Excluir) em uma coluna vertical empilhada à direita com alvos de toque acessíveis ($\ge 44 \times 44\text{pt}$), preservando integralmente o santuário estético *Y2K Coquette Clean*.

---

## Technical Context

**Language/Version**: TypeScript 5.7+ (Strict mode, zero `any`)  
**Primary Dependencies**: Next.js 15 (App Router), React 19, Tailwind CSS 3.4, Lucide React (Calendar, Plus, Pencil, Trash2), Zustand 5.0  
**Storage**: Zustand persistido localmente (`atelier-legal-storage`) com sincronização em nuvem via Supabase  
**Testing**: Node.js Native Test Runner v22 (`node --experimental-strip-types --test`)  
**Target Platform**: Mobile Web / PWA (viewport-fit=cover, 320px-430px mobile first)  
**Project Type**: Next.js Web App / Mobile Dashboard  
**Performance Goals**: 60 FPS fluido em scroll e interações, <100ms resposta ao toque  
**Constraints**: Alvos de toque $\ge 44 \times 44\text{pt}$, zero custo financeiro, zero quebra de layout em mobile  
**Scale/Scope**: Refatoração visual do componente `src/components/modules/legal-binder/DeadlineTracker.tsx`

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Princípio I (Dopamina Estética & Santuário Visual)**: ✅ Aprovado. O cartão mantém a paleta blush `#FDF2F4`, fundo creme `#FCFBF7`, cantos `rounded-2xl`, borda delicada `border-pink-200/60` e divisória suave `border-l border-pink-100/70`.
- **Princípio II (Ergonomia Móvel & Thumb-Zone)**: ✅ Aprovado. Os botões de Editar e Excluir mantêm `min-h-[44px] min-w-[44px]` dispostos em coluna vertical no lado direito, facilitando o alcance do polegar sem toques acidentais.
- **Princípio III (Arquitetura Modular & Config-Driven)**: ✅ Aprovado. A lógica é encapsulada em `DeadlineTracker.tsx`, consumindo `useLegalStore` e integrando com o `DeadlineModal.tsx`.
- **Princípio IV (Tipagem Estrita & Otimização de Mídia)**: ✅ Aprovado. TypeScript 100% tipado sem `any`.
- **Princípio V (Privacidade & Resiliência Offline)**: ✅ Aprovado. Preserva a persistência local Zustand e background sync do Supabase.
- **Princípio VI (Custo Financeiro Zero)**: ✅ Aprovado. Não introduz novas dependências ou serviços externos. Custo operacional R$ 0,00.

---

## Project Structure

### Documentation (this feature)

```text
specs/005-legal-deadlines-responsive-card/
├── spec.md                  # Especificação funcional com jornadas e critérios
├── checklists/
│   └── requirements.md      # Checklist de qualidade (16/16 aprovados)
├── plan.md                  # Este plano de implementação técnica
├── research.md              # Decisões de layout e ergonomia
├── data-model.md            # Entidades e modelo visual do card
├── contracts/
│   └── ui-contracts.md      # Especificação de classes Tailwind e acessibilidade
├── quickstart.md            # Roteiro de verificação manual e automatizada
└── tasks.md                 # Decomposição ordenada de tarefas (gerado pelo /speckit-tasks)
```

### Source Code Impacted

```text
src/
└── components/
    └── modules/
        └── legal-binder/
            └── DeadlineTracker.tsx    # [MODIFY] Refatoração do layout vertical e ações empilhadas

tests/
├── unit/
│   └── test-legal-store.ts            # Verificação de integridade
└── whitebox/
    └── test-whitebox-branches.ts      # Verificação de cobertura de branches
```

**Structure Decision**: Componente existente `DeadlineTracker.tsx` é aprimorado para atender à responsividade móvel sem necessidade de criar novos arquivos ou alterar contratos de store.

---

## Complexity Tracking

*Nenhuma violação aos princípios ou complexidade injustificada identificada. Todas as verificações de governança passaram.*
