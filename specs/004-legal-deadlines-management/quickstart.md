# Quickstart Guide: Validação Ponta a Ponta de Edição e Exclusão

**Feature**: [004-legal-deadlines-management](./spec.md)  
**Date**: 2026-09-03  
**Status**: Concluído

---

## 1. Pré-Requisitos

- Node.js 20+ instalado.
- Dependências do projeto instaladas (`npm install`).
- Variáveis de ambiente configuradas no `.env.local` (ou operação com fallback offline-first).

---

## 2. Cenários de Validação Automatizada (Testes de Unidade e Integração)

### Execução dos Testes Automatizados
```bash
# Validação de Tipos TypeScript (Zero any)
npm run typecheck

# Validação de Linting
npm run lint

# Execução dos Testes Unitários de Stores
node --test tests/unit/test-legal-store.ts
node --test tests/unit/test-meal-store.ts

# Execução da Bateria Completa de Testes
npm test
```

### Resultados Esperados
- `test-legal-store.ts`: 100% dos testes verdes, incluindo:
  - Adição de prazos.
  - Atualização de status e atualização completa de título/data/matéria (`updateDeadline`).
  - Exclusão de prazo (`deleteDeadline`).
  - Adição, atualização (`updateStudyNote`) e exclusão de fichamento (`deleteStudyNote`).
- `test-meal-store.ts`: 100% dos testes verdes, cobrindo edição de tarefas de prep e itens de feira.

---

## 3. Cenários de Validação Manual da Interface (Mobile & PWA)

### Cenário 1: Edição e Exclusão de Prazo Jurídico (`/legal` -> Aba "Prazos")
1. Inicie o servidor local: `npm run dev`.
2. Acesse `http://localhost:3000/legal` (ou simule visualização mobile no Chrome DevTools com largura de 360px).
3. Toque na aba **"Prazos"**.
4. Toque no botão de **Lápis (Editar)** em qualquer prazo existente.
5. **Verificação**: O modal de edição abre com o título atual, data e disciplina pré-carregados.
6. Altere o título para `"Recurso Ordinário Constitucional - Revisado"` e a data para uma nova data.
7. Toque em **"Atualizar Prazo"**.
8. **Verificação**: O cartão do prazo reflete imediatamente as novas informações sem recarregar a página.
9. Toque no botão de **Lixeira (Excluir)** do mesmo prazo.
10. Confirme a exclusão no alerta preventivo.
11. **Verificação**: O prazo desaparece imediatamente da listagem. Se for o último, o estado vazio acolhedor é apresentado.

### Cenário 2: Edição de Micro-Fichamento Jurídico (`/legal` -> Aba "Fichamentos")
1. Na aba **"Fichamentos"**, localize um fichamento com tags e resumo.
2. Toque no botão de **Lápis (Editar)** no topo do cartão.
3. **Verificação**: O modal abre preenchido com a matéria, conceito, síntese, foto (se houver) e tags.
4. Adicione uma nova tag (ex: `Revisão OAB`) e modifique a síntese.
5. Toque em **"Salvar Fichamento"**.
6. **Verificação**: O cartão atualiza in-place mantendo a foto e a data original sem erros no console.

### Cenário 3: Responsividade Mobile Estrita (Largura 320px)
1. No DevTools, ajuste a largura de tela para `320px` (iPhone SE compacto).
2. Verifique os cartões da aba "Prazos".
3. **Verificação**: O seletor de status, botão de editar e botão de excluir mantêm-se confortavelmente alinhados, sem scroll horizontal e com alvos de toque maiores ou iguais a 44x44 pontos.

