# 🏛️ Atelier Autonomous Agentic Squad

Este diretório estabelece a estrutura operacional da **Squad de Agentes Autônomos** do projeto Atelier (Next.js 15, Tailwind CSS, Supabase, Vercel). Cada agente possui especialização funcional, limites de atuação e critérios de passagem entre portões de qualidade.

---

## 👥 Agentes da Squad

| Agente | Arquivo de Definição | Papel Principal | Foco & Especialidade |
| :--- | :--- | :--- | :--- |
| **PO** | [`po.agent.md`](./po.agent.md) | Product Owner & Requisitos | User Stories, Jornadas P1–P4, UX Y2K, Spec-Kit |
| **DEV** | [`dev.agent.md`](./dev.agent.md) | Engenheiro Fullstack / Mobile | Next.js 15, TypeScript estrito, Zustand, Tailwind |
| **QA** | [`qa.agent.md`](./qa.agent.md) | Especialista em Testes & QA | Testes unitários, integração, caixa-preta/branca |
| **SI** | [`si.agent.md`](./si.agent.md) | Segurança da Informação & AppSec | 100% RLS, Storage Hardening, Segredos, Security Gate |

---

## 🔄 Fluxo de Trabalho Entre Portões (`Quality Gates`)

Toda nova feature, refatoração ou correção no Atelier deve seguir o fluxo linear entre os 4 portões:

```text
 ┌─────────────┐       ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
 │   GATE 1    │ ────▶ │   GATE 2    │ ────▶ │   GATE 3    │ ────▶ │   GATE 4    │
 │  Agente PO  │       │ Agente DEV  │       │  Agente QA  │       │  Agente SI  │
 └─────────────┘       └─────────────┘       └─────────────┘       └─────────────┘
   Spec & Regras         Código & Build        Testes 100%           Security Pass
```

### 1. Gate 1 — Homologação de Requisitos (PO)
- O PO gera ou atualiza a especificação em `specs/` utilizando a metodologia Spec-Kit.
- Cria a checklist de aceitação funcional com foco em ergonomia móvel e estética Y2K.
- **Critério de Saída:** Spec aprovada sem ambiguidades com checklist preenchida.

### 2. Gate 2 — Implementação Funcional (DEV)
- O DEV implementa as telas, componentes, hooks e integrações com o Supabase.
- Garante tipagem estrita sem `any` e alvos de toque mínimos de 44x44pt.
- **Critério de Saída:** Código compilando sem erros no TypeScript (`npm run typecheck`) e build limpo.

### 3. Gate 3 — Validação de Estabilidade (QA)
- O QA adiciona novos testes cobrindo os caminhos felizes e de exceção da feature.
- Executa toda a esteira: unitários, integração e caixas-pretas (`npm test`).
- **Critério de Saída:** 100% de testes aprovados (zero falhas ou testes cancelados).

### 4. Gate 4 — Liberação de Segurança & Compliance (SI)
- O SI audita a proteção de rotas no `middleware.ts`, as políticas de RLS e o storage.
- Executa o script obrigatório `bash scripts/security-check.sh`.
- Garante que nenhum segredo (chaves privadas, chaves administrativas de serviço) esteja presente no código.
- **Critério de Saída:** Security Gate aprovado com Exit Code 0, liberando o commit e o push.

---

## ⚡ Como Acionar a Squad no Antigravity

Você pode orquestrar a squad de três maneiras:
1. **Linear:** Pedir para o PO iniciar a especificação de uma nova ideia.
2. **Paralela / Subagentes:** Acionar QA e SI simultaneamente via `invoke_subagent` antes de cada entrega.
3. **Equipe Autônoma:** Ativando o comando `/teamwork-preview` no chat para coordenar tarefas complexas.
