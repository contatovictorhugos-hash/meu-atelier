# UI Contracts & Component Interfaces: Gestão Ergonômica de Prazos e Itens

**Feature**: [004-legal-deadlines-management](../spec.md)  
**Date**: 2026-09-03  
**Status**: Concluído

---

## 1. Componente: `DeadlineModal.tsx`

Modal reutilizável para criação e edição de prazos no Caderno Jurídico.

### Assinatura de Propriedades (Props)
```typescript
export interface DeadlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  deadlineToEdit?: StudyDeadline | null;
  courses: StudyCourse[];
}
```

### Comportamento Visual & Estados
- **Modo Criação (`deadlineToEdit === null`)**:
  - Título do modal: `"Novo Prazo / Tarefa 📅"`
  - Botão de submissão: `"Salvar Prazo"`
  - Campos resetados: `title: ''`, `due_date: ''`, `status: 'Não iniciado'`, `course_id: courses[0]?.id`.
- **Modo Edição (`deadlineToEdit !== null`)**:
  - Título do modal: `"Editar Prazo ✏️"`
  - Botão de submissão: `"Atualizar Prazo"`
  - Campos pré-carregados com os valores do prazo selecionado.
- **Ergonomia e Acessibilidade**:
  - Inputs e selects com altura mínima `min-h-[44px]`.
  - Fechamento suave via botão de fechar, clique fora do modal ou tecla Escape.

---

## 2. Componente: `DeadlineTracker.tsx`

Cartão de item de prazo com cluster de ações ergonômicas.

### Contrato de Layout de Cada Cartão
```html
<div className="p-3 bg-[#FCFBF7] rounded-2xl border border-pink-200/60 shadow-sm flex items-center justify-between gap-2">
  <!-- Informações do Prazo -->
  <div className="min-w-0 flex-1">
    <div className="flex items-center gap-1.5 mb-1">
      <Badge variant="blush">{courseName}</Badge>
      <span className="text-[10px] font-mono text-stone-500">{formatDate(due_date)}</span>
    </div>
    <h4 className="text-xs font-semibold text-[#1E1B1E] truncate">{title}</h4>
  </div>

  <!-- Ações e Status -->
  <div className="flex items-center gap-1 shrink-0">
    <select
      value={status}
      onChange={(e) => updateDeadlineStatus(id, e.target.value)}
      className="text-[11px] font-semibold bg-white border border-pink-200 rounded-xl px-2 py-1 text-stone-700 min-h-[36px]"
      aria-label="Status do prazo"
    >...</select>

    <!-- Botão Editar -->
    <button
      onClick={() => handleOpenEdit(deadline)}
      className="p-2 text-stone-500 hover:text-[#4A1525] hover:bg-white/80 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
      aria-label="Editar prazo"
    >
      <Pencil className="w-3.5 h-3.5" />
    </button>

    <!-- Botão Excluir -->
    <button
      onClick={() => handleDelete(deadline)}
      className="p-2 text-stone-400 hover:text-red-600 hover:bg-white/80 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
      aria-label="Excluir prazo"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  </div>
</div>
```

---

## 3. Componente: `StudyNotes.tsx` (Cluster de Ações do Fichamento)

### Contrato de Cabeçalho do Cartão
```html
<div className="flex items-center justify-between">
  <Badge variant="bordeaux">{course?.name || 'Direito'}</Badge>
  <div className="flex items-center gap-1">
    <span className="text-[10px] text-stone-400 font-mono">
      {formatDate(note.created_at)}
    </span>
    <!-- Botão Editar Fichamento -->
    <button
      onClick={() => handleOpenEdit(note)}
      className="p-2 text-stone-400 hover:text-[#4A1525] hover:bg-white/60 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
      aria-label="Editar fichamento"
    >
      <Pencil className="w-3.5 h-3.5" />
    </button>
    <!-- Botão Excluir Fichamento -->
    <button
      onClick={() => handleDelete(note)}
      className="p-2 text-stone-300 hover:text-red-500 hover:bg-white/60 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
      aria-label="Excluir nota"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  </div>
</div>
```

---

## 4. Componente: `SundayPrepGuide.tsx` (Edição Inline Rápida)

- Permite alternar entre visualização de texto e input de edição direta ao clicar no botão de lápis.
- Ações: Cancelar (`X`) e Confirmar (`Check`) com alvos mínimos de 44x44pt.

---

## 5. Componente: `ShoppingList.tsx` (Edição com Modal Rápido ou Inline)

- Modal ou barra de edição rápida para renomear ingrediente e selecionar nova categoria (`Hortifrúti`, `Geladeira`, `Despensa`, `Outros`).

