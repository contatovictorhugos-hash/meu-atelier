# Research: Gestão Ergonômica de Prazos, Fichamentos e Listas Operacionais

**Feature**: [004-legal-deadlines-management](./spec.md)  
**Date**: 2026-09-03  
**Status**: Concluído (All unknowns resolved)

---

## 1. Padrão de UX para Edição e Exclusão de Prazos no Mobile

### Decisão
Utilizar botões de ação discretos de toque (`Pencil` e `Trash2`) em cada cartão de prazo, associados a um modal unificado (`DeadlineModal`) para criação e edição, e confirmação preventiva antes da exclusão (`window.confirm` ou diálogo suave de confirmação).

### Racional
1. **Ergonomia Móvel (Thumb-Zone & Safe Area)**: O Atelier é prioritariamente móvel. A inclusão de campos de edição in-line aumentaria desproporcionalmente a altura do cartão, quebrando o ritmo visual da listagem. O uso de um modal padronizado (`Modal` com cantos `rounded-3xl` e paleta blush/cream) mantém o cartão leve e a edição focada e livre de distrações.
2. **Alvos de Toque Acessíveis (Regra dos 44x44pt)**: Cada botão de ação terá `min-h-[44px] min-w-[44px]` com padding e hover suave (`hover:bg-white/80`), facilitando o acionamento preciso com o polegar.
3. **Consistência Interna**: O componente de matérias (`CourseCards.tsx` e `CourseModal.tsx`) já utiliza exatamente essa abordagem com sucesso comprovado na Spec 002.

### Alternativas Consideradas
- **Edição Inline Expansível (Accordion)**: Rejeitada porque quebra o alinhamento da lista, empurra os itens vizinhos bruscamente no mobile e dificulta a seleção de datas e matérias em telas estreitas (<360px).
- **Menu Dropdown de Contexto (Três Pontinhos / Popover)**: Rejeitado porque introduz um toque a mais (abrir menu -> selecionar editar), aumentando a fricção para uma ação simples em tela touch.
- **Gesto de Swipe (Deslizar para excluir)**: Rejeitado para esta fase pois depende de bibliotecas de gestos nativos ou complexidade extra de eventos de toque que podem conflitar com o scroll vertical nativo em navegadores móveis.

---

## 2. Padrão de Atualização de Micro-Fichamentos (`StudyNotes.tsx`)

### Decisão
Reaproveitar o modal existente de fichamentos (`StudyNotes.tsx`), adicionando estado `noteToEdit: StudyNote | null` e o botão de edição `Pencil` ao lado da lixeira existente.

### Racional
1. **Zero Duplicação de Código**: O modal já possui todos os campos necessários (disciplina, título/artigo, síntese, tags e componente `ImageUploadField`).
2. **Preservação de Mídia Permanente**: Se a usuária editar apenas o texto ou as tags, a URL existente no Supabase Storage (`photo_url`) é mantida sem disparar novo upload ou consumo de banda (Princípio VI: Custo Zero).
3. **Estabilidade de Interface**: A lixeira já existe no cabeçalho de cada cartão; a adição do botão de lápis adjacente cria um cluster de ações limpo e simétrico com `CourseCards`.

### Alternativas Consideradas
- **Criar um componente `EditNoteModal.tsx` separado**: Rejeitado pois duplicaria 95% do JSX e validações já testadas em `StudyNotes.tsx`.
- **Edição Direta do Texto (ContentEditable)**: Rejeitado por fragilidade de acessibilidade e ausência de suporte a tags e troca de disciplina.

---

## 3. Arquitetura de Store (Zustand) e Sincronização Supabase (PostgreSQL)

### Decisão
Expandir `useLegalStore` com métodos tipados `updateDeadline` e `updateStudyNote`, e `src/lib/supabase/sync.ts` com `updateUserDeadline` e `updateUserNote`. Atualizações no store são otimistas (UI atualiza instantaneamente com latência zero) seguidas por atualização assíncrona no PostgreSQL via RLS (`auth.uid() = user_id`).

### Racional
1. **Resiliência Offline & Latência Zero (Princípio V)**: A usuária nunca deve aguardar resposta do servidor para ver a data do prazo ou texto do resumo atualizado. O estado local atualiza em <10ms e a persistência em nuvem roda em background.
2. **Segurança e Isolamento RLS**: As políticas de `UPDATE` e `DELETE` em `study_deadlines` e `study_notes` já estão ativas no PostgreSQL (`auth.uid() = user_id`). Nenhuma migration de schema de banco é necessária.

### Alternativas Consideradas
- **Atualização Bloqueante (Aguardar Promise do Supabase)**: Rejeitada porque causaria engasgos na interface em conexões móveis 3G/4G instáveis.
- **Recarregar a lista inteira após edição (`fetchLegal`)**: Rejeitada por gerar consumo desnecessário de dados e re-renderização completa da árvore de componentes.

---

## 4. Edição Rápida nos Módulos de Apoio (Bento Prep e Feira)

### Decisão
Adicionar métodos de atualização em `useMealStore` (`updatePrepTask` e `updateShoppingItem`) com mecanismos de edição limpos e diretos:
- **Prep de Domingo**: Modo de edição rápido inline ao tocar em um botão de lápis ou texto, substituindo temporariamente o texto por um input focado com confirmação em tecla Enter/botão salvar.
- **Lista de Feira**: Diálogo ou modal rápido para alterar nome do item e alternar categoria entre Hortifrúti, Geladeira, Despensa e Outros.

### Racional
1. Completa a simetria de usabilidade em todo o Atelier, atendendo ao pedido do usuário de verificar outros pontos com limitações similares.
2. Garante que nenhuma lista de dados do Atelier seja um "beco sem saída" onde itens errados só possam ser consertados por deleção.

### Alternativas Consideradas
- **Ignorar outros módulos e focar apenas no Jurídico**: Rejeitada pois a solicitação explícita do usuário foi: *"Verifique outros pontos que pode ter problema similar"*.

