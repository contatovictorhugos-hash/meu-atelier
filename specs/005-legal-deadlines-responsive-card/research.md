# Research & Technical Decisions: Ergonomia e Responsividade Móvel dos Cartões de Prazos

**Feature**: `005-legal-deadlines-responsive-card`  
**Phase**: Phase 0 (Outline & Research)

---

## 1. Disposição Espacial do Cartão: Layout de Coluna de Ações vs. Barra Horizontal Inferior

### Contexto
Atualmente, no componente `DeadlineTracker.tsx`, o cartão de prazo utiliza uma linha horizontal única (`flex items-center justify-between gap-2`). Em telas móveis de largura comum (360px a 390px), essa disposição espreme horizontalmente o badge da matéria, a data, o título do prazo, o menu suspenso de status e os botões de ação (editar e excluir). O título sofre truncamento excessivo e os botões disputam espaço com o menu suspenso.

### Decisão
Adotar uma estrutura de duas colunas principais no cartão:
1. **Coluna Esquerda/Central (Corpo de Conteúdo - `flex-1 min-w-0 flex flex-col justify-between py-1`)**:
   - Topo: Linha com Badge da matéria acadêmica e data de vencimento formatada com tipografia mono delicada.
   - Centro: Título do prazo acadêmico com tipografia `text-sm font-semibold text-[#1E1B1E]`, permitindo quebra de linha suave (`break-words line-clamp-2` ou altura livre com respiro) para legibilidade de títulos médios a longos.
   - Base: Seletor de status (`select`) integrado e espaçoso, com cantos arredondados `rounded-xl`, borda suave e altura mínima acessível (`min-h-[36px]`).
2. **Coluna Direita (Coluna de Ações Empilhadas - `flex flex-col items-center justify-center gap-1 shrink-0 pl-2 border-l border-pink-100/60`)**:
   - Botão Superior: **Editar** (`Pencil`), com `min-h-[44px] min-w-[44px]`, hover suave em tom blush e feedback tátil.
   - Botão Inferior: **Excluir** (`Trash2`), com `min-h-[44px] min-w-[44px]`, hover suave em tom avermelhado delicado e feedback tátil.

### Racional
- Aumenta a altura vertical do cartão (`p-3.5` a `p-4`, altura mínima $\ge 90\text{px}$), conferindo elegância e sensação de fichário físico de scrapbook.
- Elimina completamente o truncamento agressivo de títulos.
- Cumpre rigorosamente a regra de acessibilidade móvel (alvos de toque de no mínimo 44x44 pontos por botão) sem risco de o polegar esbarrar na ação errada.
- Uma sutil divisória vertical (`border-l border-pink-100/60`) delimita de forma limpa o conteúdo editorial das ferramentas operacionais.

### Alternativas Consideradas
- *Botões no rodapé do cartão (full-width footer)*: Rejeitado porque aumentaria excessivamente a altura individual do cartão, permitindo visualizar menos prazos simultaneamente na rolagem.
- *Menu suspenso com 3 pontinhos (`...` / kebab menu)*: Rejeitado porque oculta as ações e exige 2 toques para qualquer operação, piorando a ergonomia e contrariando o pedido explícito do usuário de botões visíveis de editar e deletar empilhados.

---

## 2. Acessibilidade de Toque & Ergonomia do Polegar (Princípio II)

### Decisão
- Cada botão da coluna lateral mantém `min-h-[44px] min-w-[44px]` com `flex items-center justify-center`.
- O espaçamento vertical entre os botões de editar e excluir será de `gap-1` (4px a 8px), garantindo separação visual clara entre o ato de editar (construtivo) e o ato de excluir (destrutivo).
- O botão de excluir mantém a confirmação protetiva antes de invocar `deleteDeadline(id)`.

---

## 3. Preservação da Dopamina Estética & Identidade Visual (Princípio I)

### Decisão
- Fundo do cartão: `#FCFBF7` (creme aconchegante do santuário pessoal).
- Bordas: `border border-pink-200/60` com cantos `rounded-2xl`.
- Sombra: `shadow-sm` suave para sensação de adesivo colado no fichário.
- Cores de destaque:
  - Badge de matéria: variante `blush` com cor de acento da matéria quando disponível.
  - Ícone de Editar: `text-stone-500 hover:text-[#4A1525] hover:bg-pink-100/50`.
  - Ícone de Excluir: `text-stone-400 hover:text-red-600 hover:bg-red-50`.
