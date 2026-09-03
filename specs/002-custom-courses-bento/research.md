# Research & Technical Decisions: Personalização Total de Matérias Jurídicas e Cardápio Bento

**Feature**: `002-custom-courses-bento`  
**Date**: 2026-09-02  
**Status**: Completed

---

## 1. Pesquisa & Decisões Arquiteturais

### Decisão 1: Modelo de Estado e Operações CRUD para Matérias (`useLegalStore`)
- **Decisão**: Expandir `useLegalStore` com as ações `addCourse`, `updateCourse` e `deleteCourse`, estendendo a interface `StudyCourse` para incluir `day_of_week` (dias úteis de 1 a 6: Seg-Sáb).
- **Racional**: O Zustand com middleware `persist` já gerencia o armazenamento local (`atelier-legal-storage`). Adicionar essas ações confere autonomia total à usuária sem dependência de rede, mantendo 100% de disponibilidade offline.
- **Alternativas consideradas**:
  - *Hardcoded com flag de visibilidade*: Rejeitada por não permitir novos cadastros reais solicitados pela usuária.
  - *Sincronização imediata no Supabase*: Rejeitada no momento para respeitar o princípio Offline-First e Custo Zero da Constituição, mantendo o Supabase como camada opcional de nuvem.

### Decisão 2: Reformulação do Bento e Desmistificação dos Dados Mockados (`useMealStore`)
- **Decisão**: Substituir a lista estática de 5 dias fixos por um modelo dinâmico com operações completas de CRUD:
  - `saveMeal(meal: Omit<MealPlanItem, 'id'> & { id?: string })`: cria ou atualiza uma refeição para qualquer dia da semana (1 a 7: Seg a Dom).
  - `deleteMeal(id: string)`: remove a refeição de um slot específico.
  - `addPrepTask(task: string)` e `deletePrepTask(id: string)`: permite personalizar o checklist do "Sunday Prep Guide".
  - `clearCompletedShoppingItems()`: limpeza em lote dos itens já marcados como comprados na feira.
- **Racional**: Elimina totalmente o aspecto de "mock" apontado pela usuária. A tela passa a permitir planejar café, almoço, lanche ou jantar de Segunda a Domingo com fotos reais e ingredientes.
- **Alternativas consideradas**:
  - *Manter apenas Segunda a Sexta*: Rejeitada porque a usuária deseja planejar a alimentação com flexibilidade, incluindo marmitas de final de semana e pré-preparo de domingo.

### Decisão 3: Reuso Universal do `ImageUploadField` para Fotos de Marmitas
- **Decisão**: Integrar o componente reutilizável `ImageUploadField` no modal de cadastro/edição de refeições do Bento (`AddEditMealModal.tsx`).
- **Racional**: Garante paridade estética e funcional com o Closet e o Daily Glow. A foto da marmita pode ser capturada na hora com a câmera do smartphone, escolhida da galeria ou informada via link, passando por compressão WebP leve (< 300KB) e persistência em DataURL.
- **Alternativas consideradas**:
  - *Upload direto para S3/R2 sem fallback local*: Rejeitada porque falharia offline e consumiria requisições desnecessárias.

### Decisão 4: Ergonomia Móvel e Design Y2K nos Modais de Gestão
- **Decisão**: Utilizar o componente `Modal.tsx` existente, adaptando o layout com seletores visuais de chips para dias da semana (`Seg`, `Ter`, `Qua`, `Qui`, `Sex`, `Sáb`, `Dom`) e paletas pastéis para os cards de matéria.
- **Racional**: Cumpre a diretriz constitucional de botões com área de toque mínima de 44x44 pontos, cantos arredondados (`rounded-2xl` a `rounded-3xl`) e paleta blush/cream/bordeaux.
- **Alternativas consideradas**:
  - *Tabelas inline de edição rápida*: Rejeitada por violar o Princípio I da Constituição (proibição de tabelas corporativas frias e desprovidas de estética).

---

## 2. Conformidade com a Constituição do Atelier

| Princípio Constitucional | Avaliação nesta Feature | Status |
| :--- | :--- | :---: |
| **I. Dopamina Estética Y2K** | Cards de matérias com cores pastéis personalizáveis, badges delicadas de dias da semana e fotos de marmitas em molduras suaves | ✅ Em conformidade |
| **II. Ergonomia Móvel (Thumb-Zone)** | Modais com inputs táteis, seletores de chips de 44px e sliders deslizantes de progresso | ✅ Em conformidade |
| **III. Arquitetura Modular (Config-Driven)** | Tipos estritos em `database.types.ts` e stores independentes `useLegalStore` e `useMealStore` | ✅ Em conformidade |
| **IV. Tipagem Estrita Sem `any`** | Interfaces TypeScript completas para todas as novas ações e propriedades | ✅ Em conformidade |
| **V. Privacidade & Resiliência Offline** | Persistência instantânea em `localStorage` via Zustand; funciona sem internet | ✅ Em conformidade |
| **VI. Custo Zero (R$ 0,00)** | Zero chamadas a APIs pagas; processamento e compressão 100% no cliente | ✅ Em conformidade |
